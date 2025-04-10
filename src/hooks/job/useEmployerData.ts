
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
  'Bank of America': 'Finance',
  'Baptist Health': 'Healthcare',
  'American Express': 'Finance',
  'UnitedHealthcare': 'Healthcare',
  'Web.com': 'Technology'
};

const LOGO_MAP: Record<string, string> = {
  'Mayo Clinic': '/lovable-uploads/da43ec61-9d66-4927-bf47-e3e785ac69a3.png',
  'Amazon': '/lovable-uploads/b6ae4161-0869-4314-a485-c8275b17883e.png',
  'Publix': '/lovable-uploads/35d631dd-0044-4f2e-823c-4dc45510994f.png',
  'Bank of America': '/lovable-uploads/54acecfe-3f54-4241-8982-478d64bba06e.png',
  'CSX Transportation': '/lovable-uploads/2d9d0a51-ca49-41ed-b782-afca86fd6cc0.png',
  'Florida Blue': '/lovable-uploads/db565abc-8fe9-4ed1-833f-8ca8233a2e1c.png',
  'Johnson & Johnson': '/lovable-uploads/d2b16034-eb1e-4b1f-a1e0-fb9e75e2318b.png',
  'Fidelity National Financial': '/lovable-uploads/b0e0a756-2e03-4cb7-a548-107746b37666.png',
  'Knight': '/lovable-uploads/500d4fef-f22b-43d5-84c4-3cdd2b22ddcf.png',
  'Baptist Health': '/lovable-uploads/fa5d62af-3190-44aa-b88c-55ebbc363b88.png',
  'American Express': '/lovable-uploads/b9f50947-0157-4677-9394-07c6b589cf6e.png',
  'UnitedHealthcare': '/lovable-uploads/84397b4a-da78-47d9-9ed4-daa193847fd7.png',
  'Web.com': '/lovable-uploads/611a1a85-1d8c-4650-a5f2-aafb8e3b2cb1.png'
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
            logoUrl: '/lovable-uploads/da43ec61-9d66-4927-bf47-e3e785ac69a3.png'
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
            company_name: 'CSX Transportation', 
            industry: 'Transportation', 
            avg_min_wage: 20.50, 
            job_count: 15,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/2d9d0a51-ca49-41ed-b782-afca86fd6cc0.png'
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
            company_name: 'Fidelity National Financial', 
            industry: 'Financial Services', 
            avg_min_wage: 18.00, 
            job_count: 9,
            last_updated: new Date().toISOString(),
            logoUrl: '/lovable-uploads/b0e0a756-2e03-4cb7-a548-107746b37666.png'
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
