
export interface Employer {
  company_name: string;
  job_count: number;
  avg_min_wage: number;
  industry?: string;
  logoUrl?: string;
  last_updated?: string;
}

export interface EmployerDataResult {
  employers: Employer[];
  loading: boolean;
}
