
export type ProhibitedJobType = 
  | "commission_only" 
  | "door_to_door_sales" 
  | "hazardous_materials" 
  | "heavy_machinery" 
  | "construction" 
  | "driving";

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: string;
  requirements: string;
  description: string;
  hours_per_week: number;
  pay_rate_min: number;
  pay_rate_max: number;
  contactEmail: string;
  isPremium: boolean;
  prohibited_types: ProhibitedJobType[];
}

export interface JobSubmitData {
  title: string;
  company_name: string;
  location_city: string;
  location_state: string;
  location_zip: string;
  job_type: string;
  pay_rate_min: number;
  pay_rate_max: number;
  pay_rate_period: string;
  description: string;
  requirements: string[];
  experience_level: string;
  hours_per_week: number;
  is_featured: boolean;
  is_premium: boolean;
  prohibited_types: ProhibitedJobType[];
}
