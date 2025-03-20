
// This file provides instructions for setting up the necessary tables in Supabase

/*
To set up your job applications tracking system, create the following table in your Supabase database:

Table name: job_applications

Columns:
- id: uuid, primary key, default: uuid_generate_v4()
- user_id: uuid, references auth.users.id, not null
- job_id: text, not null
- job_title: text, not null
- company: text, not null
- status: text, not null, default: 'applied'
- applied_date: date, not null
- notes: text
- contact_name: text
- contact_email: text
- next_step: text
- next_step_date: date
- created_at: timestamp with time zone, not null, default: now()
- updated_at: timestamp with time zone, not null, default: now()

Row-level security policies:
1. Enable RLS on the table
2. Create a policy that allows users to select, insert, update, delete only their own rows:
   - Policy name: "Users can manage their own applications"
   - Using expression: (auth.uid() = user_id)
   - For operations: SELECT, INSERT, UPDATE, DELETE

To set this up via SQL in the Supabase SQL editor:

CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  job_id TEXT NOT NULL,
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'applied',
  applied_date DATE NOT NULL,
  notes TEXT,
  contact_name TEXT,
  contact_email TEXT,
  next_step TEXT,
  next_step_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to manage their own applications
CREATE POLICY "Users can manage their own applications" 
ON job_applications
USING (auth.uid() = user_id);

-- Create an index for faster queries by user_id
CREATE INDEX job_applications_user_id_idx ON job_applications(user_id);

-- Create an index for status filtering
CREATE INDEX job_applications_status_idx ON job_applications(status);
*/
