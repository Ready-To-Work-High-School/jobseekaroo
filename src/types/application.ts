
export type ApplicationStatus = 'applied' | 'interview' | 'offer' | 'rejected' | 'accepted' | 'withdrawn';

export interface JobApplication {
  id: string;
  user_id: string;
  job_id: string;
  job_title: string;
  company: string;
  status: ApplicationStatus;
  applied_date: string;
  next_step_date?: string;
  next_step?: string;
  contact_name?: string;
  contact_email?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}
