
import { Employer } from '../hooks/types';
import { INDUSTRY_MAP, LOGO_MAP } from '../constants/employerMappings';

/**
 * Enhances raw employer data with industry and logo information
 */
export const enhanceEmployerData = (data: any[]): Employer[] => {
  if (!data || !Array.isArray(data)) {
    return [];
  }
  
  return data.map((employer) => ({
    ...employer,
    industry: INDUSTRY_MAP[employer.company_name] || 'Other',
    logoUrl: LOGO_MAP[employer.company_name]
  }));
};
