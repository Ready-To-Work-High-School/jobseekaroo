
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
        if (!statusCounts[item.status]) {
          statusCounts[item.status] = 0;
        }
        statusCounts[item.status] += 1;
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
