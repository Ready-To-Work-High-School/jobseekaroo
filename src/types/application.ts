
export type ApplicationStatus = 'applied' | 'interviewing' | 'rejected' | 'accepted' | 'pending' | 'hired' | 'withdrawn';

export interface JobApplication {
  id: string;
  user_id: string;
  job_id: string;
  job_title: string;
  company: string;
  status: ApplicationStatus;
  applied_date: string;
  notes?: string;
  next_step?: string;
  next_step_date?: string;
  contact_name?: string;
  contact_email?: string;
  created_at: string;
  updated_at: string;
}

export interface StatusCount {
  status: ApplicationStatus;
  count: number;
}
