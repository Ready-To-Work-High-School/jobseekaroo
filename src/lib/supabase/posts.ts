
import { supabase } from '@/integrations/supabase/client';

export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  username?: string;
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        user_id,
        created_at,
        users:user_id (username)
      `)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Format the response to match the expected structure
    return data.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      user_id: post.user_id,
      created_at: post.created_at,
      username: post.users?.username
    }));
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        user_id,
        created_at,
        users:user_id (username)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    if (!data) return null;
    
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      user_id: data.user_id,
      created_at: data.created_at,
      username: data.users?.username
    };
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  }
}

export async function createPost(title: string, content: string, userId: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([
        { title, content, user_id: userId }
      ])
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}

export async function updatePost(id: string, title: string, content: string, userId: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id)
      .eq('user_id', userId) // Ensure user owns the post
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
}

export async function deletePost(id: string, userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .eq('user_id', userId); // Ensure user owns the post
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}
