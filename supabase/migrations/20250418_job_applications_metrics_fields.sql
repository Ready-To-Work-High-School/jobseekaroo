
-- Add necessary columns to job_applications table for metrics
ALTER TABLE IF EXISTS public.job_applications
  ADD COLUMN IF NOT EXISTS employer_id UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS skill_match_score DECIMAL(5,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS hiring_cost DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS diversity_factors JSONB DEFAULT '{}'::jsonb;

-- Update existing job applications to have employer_id based on job's employer
UPDATE public.job_applications 
SET employer_id = jobs.employer_id
FROM public.jobs
WHERE job_applications.job_id = jobs.id::text
AND job_applications.employer_id IS NULL;

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_job_applications_employer_id
  ON public.job_applications (employer_id);

-- Create function to add sample skill match scores (for demonstration purposes)
CREATE OR REPLACE FUNCTION public.add_sample_metrics_to_applications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Add random skill match scores between 60 and 95
  UPDATE public.job_applications
  SET 
    skill_match_score = 60 + floor(random() * 36)::numeric,
    hiring_cost = 1500 + floor(random() * 2000)::numeric
  WHERE skill_match_score = 0;
END;
$$;

-- Execute the function to add sample data
SELECT public.add_sample_metrics_to_applications();
