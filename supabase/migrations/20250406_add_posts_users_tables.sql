
-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add Row Level Security to posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting posts - everyone can read posts
CREATE POLICY IF NOT EXISTS "Anyone can read posts" 
  ON public.posts FOR SELECT 
  USING (true);

-- Create policy for inserting posts - user can only insert their own posts
CREATE POLICY IF NOT EXISTS "Users can create their own posts" 
  ON public.posts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating posts - user can only update their own posts
CREATE POLICY IF NOT EXISTS "Users can update their own posts" 
  ON public.posts FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy for deleting posts - user can only delete their own posts
CREATE POLICY IF NOT EXISTS "Users can delete their own posts" 
  ON public.posts FOR DELETE 
  USING (auth.uid() = user_id);

-- Add Row Level Security to users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting users - everyone can read users (just public profile info)
CREATE POLICY IF NOT EXISTS "Anyone can read user profiles" 
  ON public.users FOR SELECT 
  USING (true);

-- Create policy for inserting users - users can only create their own record
CREATE POLICY IF NOT EXISTS "Users can create their own profile" 
  ON public.users FOR INSERT 
  WITH CHECK (auth.uid()::text = id::text);

-- Create policy for updating users - users can only update their own record
CREATE POLICY IF NOT EXISTS "Users can update their own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid()::text = id::text);
