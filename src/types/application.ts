
export type ApplicationStatus = 'applied' | 'interviewing' | 'offered' | 'accepted' | 'rejected' | 'withdrawn';

export interface JobApplication {
  id: string;
  user_id: string;
  job_id: string;
  job_title: string;
  company: string;
  status: ApplicationStatus;
  applied_date: string;
  interview_date?: string;
  offer_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  contact_name?: string;
  contact_email?: string;
  next_step?: string;
  next_step_date?: string;
}

export interface StatusCount {
  status: ApplicationStatus;
  count: number;
}
