
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
      logoUrl: '/lovable-uploads/2d9d0a51-ca49-41ed-b782-afca86fd6cc0.png'
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
      logoUrl: '/lovable-uploads/611a1a85-1d8c-4650-a5f2-aafb8e3b2cb1.png'
    },
    { 
      company_name: 'Bank of America', 
      industry: 'Finance', 
      avg_min_wage: 17.25, 
      job_count: 7,
      last_updated: new Date().toISOString(),
      logoUrl: '/lovable-uploads/7518f1a5-62ad-490c-9c24-0bbc649ab7ff.png'
    },
  ];
};
