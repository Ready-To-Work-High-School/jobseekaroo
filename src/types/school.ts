
export interface School {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  featured_jobs?: string[];
  created_at: string;
  updated_at: string;
}

// Type for data returned from the schools table
export interface SchoolData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  featured_jobs?: string[];
  created_at: string;
  updated_at: string;
  [key: string]: any; // Allow additional properties
}
