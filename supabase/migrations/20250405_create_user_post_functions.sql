
-- Posts functions

-- Function to get all posts with username
CREATE OR REPLACE FUNCTION public.get_all_posts()
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  user_id uuid,
  created_at timestamptz,
  username text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.content,
    p.user_id,
    p.created_at,
    u.username
  FROM
    public.posts p
    JOIN public.users u ON p.user_id = u.id
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get post by id
CREATE OR REPLACE FUNCTION public.get_post_by_id(post_id uuid)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  user_id uuid,
  created_at timestamptz,
  username text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.content,
    p.user_id,
    p.created_at,
    u.username
  FROM
    public.posts p
    JOIN public.users u ON p.user_id = u.id
  WHERE
    p.id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a post
CREATE OR REPLACE FUNCTION public.create_post(
  p_title text,
  p_content text,
  p_user_id uuid
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  user_id uuid,
  created_at timestamptz
) AS $$
DECLARE
  new_post_id uuid;
BEGIN
  INSERT INTO public.posts (title, content, user_id)
  VALUES (p_title, p_content, p_user_id)
  RETURNING id INTO new_post_id;
  
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.content,
    p.user_id,
    p.created_at
  FROM
    public.posts p
  WHERE
    p.id = new_post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update a post
CREATE OR REPLACE FUNCTION public.update_post(
  p_id uuid,
  p_title text,
  p_content text,
  p_user_id uuid
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  user_id uuid,
  created_at timestamptz
) AS $$
BEGIN
  UPDATE public.posts
  SET
    title = p_title,
    content = p_content
  WHERE
    id = p_id
    AND user_id = p_user_id;
  
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.content,
    p.user_id,
    p.created_at
  FROM
    public.posts p
  WHERE
    p.id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete a post
CREATE OR REPLACE FUNCTION public.delete_post(
  p_id uuid,
  p_user_id uuid
)
RETURNS void AS $$
BEGIN
  DELETE FROM public.posts
  WHERE
    id = p_id
    AND user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- User functions

-- Function to register a user
CREATE OR REPLACE FUNCTION public.register_user(
  p_username text,
  p_email text,
  p_password text
)
RETURNS TABLE (
  id uuid,
  username text,
  email text,
  created_at timestamptz
) AS $$
DECLARE
  new_user_id uuid;
BEGIN
  INSERT INTO public.users (username, email, password)
  VALUES (p_username, p_email, p_password)
  RETURNING id INTO new_user_id;
  
  RETURN QUERY
  SELECT 
    u.id,
    u.username,
    u.email,
    u.created_at
  FROM
    public.users u
  WHERE
    u.id = new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user by email
CREATE OR REPLACE FUNCTION public.get_user_by_email(p_email text)
RETURNS TABLE (
  id uuid,
  username text,
  email text,
  password text,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.username,
    u.email,
    u.password,
    u.created_at
  FROM
    public.users u
  WHERE
    u.email = p_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user by id
CREATE OR REPLACE FUNCTION public.get_user_by_id(p_id uuid)
RETURNS TABLE (
  id uuid,
  username text,
  email text,
  password text,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.username,
    u.email,
    u.password,
    u.created_at
  FROM
    public.users u
  WHERE
    u.id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get all users
CREATE OR REPLACE FUNCTION public.get_all_users()
RETURNS TABLE (
  id uuid,
  username text,
  email text,
  password text,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.username,
    u.email,
    u.password,
    u.created_at
  FROM
    public.users u
  ORDER BY u.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
