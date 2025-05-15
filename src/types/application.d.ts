
export type ApplicationStatus = 
  | "applied" 
  | "interviewing" 
  | "rejected" 
  | "accepted" 
  | "pending" 
  | "hired" 
  | "withdrawn" 
  | "offered";

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  job_title: string;
  company: string;
  status: ApplicationStatus;
  applied_date: string;
  contact_name?: string;
  contact_email?: string;
  next_step?: string;
  next_step_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
