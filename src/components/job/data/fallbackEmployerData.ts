
import { Employer } from '../hooks/types';

/**
 * Get fallback employer data for when API calls fail
 */
export const getFallbackEmployerData = (): Employer[] => [
  { 
    company_name: 'Mayo Clinic', 
    industry: 'Healthcare', 
    avg_min_wage: 22.50, 
    job_count: 12,
    last_updated: new Date().toISOString(),
    logoUrl: '/lovable-uploads/da43ec61-9d66-4927-bf47-e3e785ac69a3.png'
  },
  { 
    company_name: 'Baptist Health', 
    industry: 'Healthcare', 
    avg_min_wage: 21.75, 
    job_count: 8,
    last_updated: new Date().toISOString(),
    logoUrl: '/lovable-uploads/fa5d62af-3190-44aa-b88c-55ebbc363b88.png'
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
    company_name: 'Johnson & Johnson Vision', 
    industry: 'Healthcare', 
    avg_min_wage: 18.25, 
    job_count: 6,
    last_updated: new Date().toISOString(),
    logoUrl: '/lovable-uploads/d2b16034-eb1e-4b1f-a1e0-fb9e75e2318b.png'
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
    company_name: 'Vystar Credit Union', 
    industry: 'Financial Services', 
    avg_min_wage: 19.25, 
    job_count: 8,
    last_updated: new Date().toISOString(),
    logoUrl: '/lovable-uploads/d84f89c0-eba4-4ea0-a757-0f58a4e079ff.png'
  },
  { 
    company_name: 'Bank of America', 
    industry: 'Finance', 
    avg_min_wage: 17.25, 
    job_count: 7,
    last_updated: new Date().toISOString(),
    logoUrl: '/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png'
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
    company_name: 'Fidelity National Financial', 
    industry: 'Financial Services', 
    avg_min_wage: 17.00, 
    job_count: 5,
    last_updated: new Date().toISOString(),
    logoUrl: '/lovable-uploads/b0e0a756-2e03-4cb7-a548-107746b37666.png'
  }
];
