
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Employer } from '@/components/job/hooks/types';
import { INDUSTRY_MAP, LOGO_MAP } from '@/components/job/constants/employerMappings';

export const useEmployerData = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopEmployers = async () => {
    setLoading(true);
    
    try {
      console.log('Fetching top employers data...');
      const response = await supabase.functions.invoke('get-employer-stats');
      
      if (response.error) {
        console.error("Error from function:", response.error);
        throw new Error(response.error.message || 'Error fetching data');
      }
      
      if (!response.data) {
        console.error("No data returned from function");
        throw new Error('No data returned from function');
      }
      
      const data = response.data.employers;
      console.log('Received employer data:', data);
      
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid response format');
      }
      
      const enhancedData = data.map((employer: Employer) => ({
        ...employer,
        industry: INDUSTRY_MAP[employer.company_name] || 'Other',
        logoUrl: LOGO_MAP[employer.company_name]
      }));
      
      setEmployers(enhancedData);
    } catch (error) {
      console.error("Error fetching top employers:", error);
      toast.error("Couldn't load employer data. Using fallback data.", {
        duration: 5000
      });
      
      // Use fallback data after a short delay
      setTimeout(() => {
        const fallbackData: Employer[] = [
          { 
            company_name: 'Mayo Clinic', 
            industry: 'Healthcare', 
            avg_min_wage: 22.50, 
            job_count: 12,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/da43ec61-9d66-4927-bf47-e3e785ac69a3.png'
          },
          { 
            company_name: 'Advent Health', 
            industry: 'Healthcare', 
            avg_min_wage: 21.75, 
            job_count: 8,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/63532fbf-0320-4113-ae09-e054b4f4b3bf.png'
          },
          { 
            company_name: 'Baptist Medical Center', 
            industry: 'Healthcare', 
            avg_min_wage: 21.25, 
            job_count: 7,
            last_updated: new Date().toISOString()
          },
          { 
            company_name: 'CSX Transportation', 
            industry: 'Transportation', 
            avg_min_wage: 20.50, 
            job_count: 15,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/2f5babe6-5aa1-4d84-936a-f459a5c19b6b.png'
          },
          { 
            company_name: 'Florida Blue', 
            industry: 'Healthcare & Insurance', 
            avg_min_wage: 19.75, 
            job_count: 5,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/db565abc-8fe9-4ed1-833f-8ca8233a2e1c.png'
          },
          { 
            company_name: 'Publix', 
            industry: 'Retail', 
            avg_min_wage: 18.50, 
            job_count: 18,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/35d631dd-0044-4f2e-823c-4dc45510994f.png' 
          },
          { 
            company_name: 'Johnson & Johnson Vision', 
            industry: 'Healthcare', 
            avg_min_wage: 18.25, 
            job_count: 6,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/d2b16034-eb1e-4b1f-a1e0-fb9e75e2318b.png'
          },
          { 
            company_name: 'Vystar Credit Union', 
            industry: 'Financial Services', 
            avg_min_wage: 19.25, 
            job_count: 8,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/d84f89c0-eba4-4ea0-a757-0f58a4e079ff.png'
          },
          { 
            company_name: 'Web.com', 
            industry: 'Technology', 
            avg_min_wage: 17.50, 
            job_count: 4,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/b6ae4161-0869-4314-a485-c8275b17883e.png'
          },
          { 
            company_name: 'Bank of America', 
            industry: 'Finance', 
            avg_min_wage: 17.25, 
            job_count: 7,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png'
          },
        ];
        setEmployers(fallbackData);
      }, 300);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set up realtime listener for job changes
    const channel = supabase
      .channel('employer-job-counts-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'jobs' },
        () => {
          console.log('Job data changed, refreshing employer stats');
          fetchTopEmployers();
        }
      )
      .subscribe();

    // Initial data fetch
    fetchTopEmployers();

    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { employers, loading };
};
