
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Employer {
  company_name: string;
  job_count: number;
  avg_min_wage: number;
  last_updated: string;
  industry?: string;
  logoUrl?: string;
}

const INDUSTRY_MAP: Record<string, string> = {
  'Mayo Clinic': 'Healthcare',
  'Advent Health': 'Healthcare',
  'Baptist Medical Center': 'Healthcare',
  'Amazon': 'Technology & Retail',
  'CSX Transportation': 'Transportation',
  'Publix': 'Retail',
  'Nemours Children\'s Health': 'Healthcare',
  'Florida Blue': 'Healthcare & Insurance',
  'Johnson & Johnson': 'Healthcare',
  'Bank of America': 'Finance'
};

const LOGO_MAP: Record<string, string> = {
  'Mayo Clinic': '/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png',
  'Amazon': '/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png',
  'Publix': '/lovable-uploads/a585f4d8-beac-4716-bafc-20991924d911.png',
  'Bank of America': '/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png'
};

export const useEmployerData = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopEmployers = async () => {
    setLoading(true);
    
    try {
      const response = await supabase.functions.invoke('get-employer-stats');
      
      if (response.error) throw new Error(response.error.message);
      
      const data = response.data.employers;
      
      const enhancedData = data.map((employer: Employer) => ({
        ...employer,
        industry: INDUSTRY_MAP[employer.company_name] || 'Other',
        logoUrl: LOGO_MAP[employer.company_name]
      }));
      
      setEmployers(enhancedData);
    } catch (error) {
      console.error("Error fetching top employers:", error);
      toast.error("Couldn't load employer data. Using fallback data.");
      
      setTimeout(() => {
        // Define fallback data with the correct interface structure
        const fallbackData: Employer[] = [
          { 
            company_name: 'Mayo Clinic', 
            industry: 'Healthcare', 
            avg_min_wage: 22.50, 
            job_count: 12,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png'
          },
          { 
            company_name: 'Advent Health', 
            industry: 'Healthcare', 
            avg_min_wage: 21.75, 
            job_count: 8,
            last_updated: new Date().toISOString()
          },
          { 
            company_name: 'Baptist Medical Center', 
            industry: 'Healthcare', 
            avg_min_wage: 21.25, 
            job_count: 7,
            last_updated: new Date().toISOString()
          },
          { 
            company_name: 'Amazon', 
            industry: 'Technology & Retail', 
            avg_min_wage: 20.50, 
            job_count: 15,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png'
          },
          { 
            company_name: 'CSX Transportation', 
            industry: 'Transportation', 
            avg_min_wage: 19.75, 
            job_count: 5,
            last_updated: new Date().toISOString()
          },
          { 
            company_name: 'Publix', 
            industry: 'Retail', 
            avg_min_wage: 18.50, 
            job_count: 18,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/a585f4d8-beac-4716-bafc-20991924d911.png' 
          },
          { 
            company_name: 'Nemours Children\'s Health', 
            industry: 'Healthcare', 
            avg_min_wage: 18.25, 
            job_count: 6,
            last_updated: new Date().toISOString()
          },
          { 
            company_name: 'Florida Blue', 
            industry: 'Healthcare & Insurance', 
            avg_min_wage: 18.00, 
            job_count: 9,
            last_updated: new Date().toISOString()
          },
          { 
            company_name: 'Johnson & Johnson', 
            industry: 'Healthcare', 
            avg_min_wage: 17.50, 
            job_count: 4,
            last_updated: new Date().toISOString()
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
    const channel = supabase
      .channel('employer-job-counts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'jobs' },
        () => {
          fetchTopEmployers();
        }
      )
      .subscribe();

    fetchTopEmployers();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { employers, loading };
};
