
-- Create a view that aggregates job counts and average wages by employer
CREATE OR REPLACE VIEW employer_job_counts AS
SELECT 
  company_name,
  COUNT(*) as job_count,
  AVG(pay_rate_min) as avg_min_wage,
  MAX(updated_at) as last_updated
FROM 
  jobs
GROUP BY 
  company_name
ORDER BY 
  job_count DESC;
