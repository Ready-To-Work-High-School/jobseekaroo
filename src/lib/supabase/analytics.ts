import { supabase } from './index';

interface AnalyticsFilters {
  jobId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}

// Fetch application status counts 
export async function getApplicationStatusCounts(
  employerId: string,
  filters: AnalyticsFilters = {}
): Promise<any[]> {
  try {
    // Create the initial query
    let query = supabase
      .from('job_applications')
      .select('*');
    
    // Add filters
    if (filters.jobId) {
      query = query.eq('job_id', filters.jobId);
    }
    
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    
    if (filters.startDate) {
      query = query.gte('applied_date', filters.startDate.toISOString());
    }
    
    if (filters.endDate) {
      query = query.lte('applied_date', filters.endDate.toISOString());
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching application status counts:', error);
      return [];
    }
    
    // Process the data to group by status
    const statusCounts: Record<string, number> = {};
    
    // Manual grouping of the results
    if (data) {
      data.forEach(item => {
        const status = item.status || 'unknown';
        if (!statusCounts[status]) {
          statusCounts[status] = 0;
        }
        statusCounts[status] += 1;
      });
    }
    
    // Convert the object to an array format
    const result = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));
    
    return result;
  } catch (error) {
    console.error('Exception fetching application status counts:', error);
    return [];
  }
}

// Fetch application timeline data (applications over time)
export async function getApplicationTimeline(
  employerId: string,
  filters: AnalyticsFilters = {}
): Promise<any[]> {
  try {
    // For this function, we'd typically use date_trunc to group by month
    // This is a simplified version for demonstration
    let query = supabase
      .from('job_applications')
      .select('applied_date, status');
    
    // Add filters
    if (filters.jobId) {
      query = query.eq('job_id', filters.jobId);
    }
    
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    
    if (filters.startDate) {
      query = query.gte('applied_date', filters.startDate.toISOString());
    }
    
    if (filters.endDate) {
      query = query.lte('applied_date', filters.endDate.toISOString());
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching application timeline data:', error);
      return [];
    }
    
    // Process the data to group by month
    // This would be better handled with SQL directly but shown here for illustration
    const processedData = processTimelineData(data || []);
    
    return processedData;
  } catch (error) {
    console.error('Exception fetching application timeline data:', error);
    return [];
  }
}

// Helper function to process timeline data
function processTimelineData(applications: any[]): any[] {
  const monthlyData: { [key: string]: any } = {};
  
  // Group applications by month
  applications.forEach(app => {
    if (!app.applied_date) return;
    
    const date = new Date(app.applied_date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    const monthName = date.toLocaleString('default', { month: 'short' });
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthName,
        applications: 0,
        interviews: 0,
        offers: 0
      };
    }
    
    // Increment counters based on status
    monthlyData[monthKey].applications++;
    
    if (app.status === 'interview') {
      monthlyData[monthKey].interviews++;
    }
    
    if (app.status === 'offer') {
      monthlyData[monthKey].offers++;
    }
  });
  
  // Convert object to array and sort by date
  return Object.values(monthlyData).sort((a: any, b: any) => {
    const monthA = new Date(Date.parse(`${a.month} 1, 2023`));
    const monthB = new Date(Date.parse(`${b.month} 1, 2023`));
    return monthA.getTime() - monthB.getTime();
  });
}

// Get employer's detailed metrics
export async function getEmployerMetrics(employerId: string): Promise<any> {
  try {
    // First try to get data from the application_metrics table
    let { data: metricsData, error: metricsError } = await supabase
      .from('application_metrics')
      .select('*')
      .eq('employer_id', employerId)
      .single();
    
    // If no metrics exist yet or there was an error, trigger a calculation
    if (!metricsData || metricsError) {
      console.log('No metrics found or error occurred, triggering calculation...');
      
      // Trigger the calculation function using RPC
      const { error: rpcError } = await supabase
        .rpc('update_employer_metrics', { employer_id_param: employerId });
      
      if (rpcError) {
        console.error('Error calculating metrics:', rpcError);
        return null;
      }
      
      // Try fetching metrics again after calculation
      const { data: recalculatedData, error: recalculatedError } = await supabase
        .from('application_metrics')
        .select('*')
        .eq('employer_id', employerId)
        .single();
      
      if (recalculatedError) {
        console.error('Error fetching recalculated metrics:', recalculatedError);
        return null;
      }
      
      metricsData = recalculatedData;
    }
    
    return metricsData;
  } catch (error) {
    console.error('Exception fetching employer metrics:', error);
    return null;
  }
}
