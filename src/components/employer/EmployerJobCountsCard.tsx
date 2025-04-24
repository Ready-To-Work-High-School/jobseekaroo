
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface EmployerJobCount {
  company_name: string;
  job_count: number;
  avg_min_wage: number;
  last_updated: string;
}

const fetchEmployerJobCounts = async () => {
  const { data, error } = await supabase
    .from('employer_job_counts')
    .select('*')
    .order('job_count', { ascending: false });

  if (error) {
    console.error('Error fetching employer job counts:', error);
    throw error;
  }

  return data || [];
};

export const EmployerJobCountsCard: React.FC = () => {
  const { data: employerJobCounts, isLoading, error } = useQuery<EmployerJobCount[]>({
    queryKey: ['employer-job-counts'],
    queryFn: fetchEmployerJobCounts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching job counts</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Employer Job Counts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {employerJobCounts?.map((employer) => (
            <div 
              key={employer.company_name} 
              className="flex justify-between border-b py-2"
            >
              <span>{employer.company_name}</span>
              <div className="flex space-x-4">
                <span>Jobs: {employer.job_count}</span>
                <span>Avg Min Wage: ${employer.avg_min_wage.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
