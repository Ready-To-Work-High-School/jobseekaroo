
export type ApplicationStatus = 'applied' | 'interviewing' | 'offered' | 'accepted' | 'rejected' | 'withdrawn';

export interface JobApplication {
  id: string;
  user_id: string;
  job_id: string;
  job_title: string;
  company: string;
  applied_date: string;
  status: ApplicationStatus;
  notes?: string;
  contact_name?: string;
  contact_email?: string;
  next_step?: string;
  next_step_date?: string;
  created_at: string;
  updated_at: string;
  resume_url?: string;
}
