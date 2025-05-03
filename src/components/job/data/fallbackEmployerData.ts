
import { Employer } from '../hooks/types';

/**
 * Fallback data to use when API calls fail
 */
export const getFallbackEmployerData = (): Employer[] => {
  return [
    { 
      company_name: 'Mayo Clinic', 
      industry: 'Healthcare', 
      avg_min_wage: 22.50, 
      job_count: 12,
      last_updated: new Date().toISOString(),
      logoUrl: '/lovable-uploads/e55c32f3-210d-417c-944a-dbdc67106fa5.png'
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
      logoUrl: '/lovable-uploads/73c2c288-a239-474f-bf32-fe55902e3cbd.png'
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
      company_name: 'Acosta', 
      industry: 'Sales & Marketing', 
      avg_min_wage: 18.75, 
      job_count: 10,
      last_updated: new Date().toISOString(),
      logoUrl: '/lovable-uploads/f233431e-c20a-4a9d-b278-c43c97d3c645.png'
    },
    { 
      company_name: 'Web.com', 
      industry: 'Technology', 
      avg_min_wage: 17.50, 
      job_count: 4,
      last_updated: new Date().toISOString(),
      logoUrl: '/lovable-uploads/611a1a85-1d8c-4650-a5f2-aafb8e3b2cb1.png'
    },
    { 
      company_name: 'Southeastern Grocers', 
      industry: 'Retail', 
      avg_min_wage: 17.00, 
      job_count: 14,
      last_updated: new Date().toISOString(),
      logoUrl: '/lovable-uploads/37f7380b-7738-4513-b280-4ceaa5f043fb.png'
    },
  ];
};
