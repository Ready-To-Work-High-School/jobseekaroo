
-- Create security audit logs table
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  metadata JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS security_audit_logs_user_id_idx ON public.security_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS security_audit_logs_action_idx ON public.security_audit_logs(action);
CREATE INDEX IF NOT EXISTS security_audit_logs_created_at_idx ON public.security_audit_logs(created_at);

-- Add RLS policies to protect audit logs
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only allow admin users to read audit logs
CREATE POLICY "Admins can read audit logs" 
  ON public.security_audit_logs
  FOR SELECT 
  USING ((SELECT user_type FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- No updates allowed to audit logs (immutable records)
CREATE POLICY "No updates allowed to audit logs" 
  ON public.security_audit_logs
  FOR UPDATE
  USING (false);

-- No deletes allowed to audit logs (immutable records)
CREATE POLICY "No deletes allowed to audit logs" 
  ON public.security_audit_logs
  FOR DELETE
  USING (false);

-- Only the function can insert audit logs
CREATE POLICY "Only the function can insert audit logs" 
  ON public.security_audit_logs
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'supabase_admin');

-- Add column to profiles table for encrypted signup metadata
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS signup_metadata_encrypted TEXT;
