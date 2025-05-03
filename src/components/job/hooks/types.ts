
export interface Employer {
  company_name: string;
  job_count: number;
  avg_min_wage: number;
  last_updated: string;
  industry?: string;
  logoUrl?: string;
}

export interface EmployerDataResult {
  employers: Employer[];
  loading: boolean;
}
