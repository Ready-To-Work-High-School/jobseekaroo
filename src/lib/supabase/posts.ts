
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
    // Use raw SQL query due to typings issues
    const { data, error } = await supabase
      .rpc('get_all_posts')
      .select();
      
    if (error) throw error;
    
    // Format the response to match the expected structure
    return data.map((post: any) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      user_id: post.user_id,
      created_at: post.created_at,
      username: post.username
    }));
  } catch (error) {
    console.error('Error getting posts:', error);
    return [];
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  try {
    // Use raw SQL query due to typings issues
    const { data, error } = await supabase
      .rpc('get_post_by_id', { post_id: id })
      .select()
      .single();
      
    if (error) throw error;
    
    if (!data) return null;
    
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      user_id: data.user_id,
      created_at: data.created_at,
      username: data.username
    };
  } catch (error) {
    console.error('Error getting post:', error);
    return null;
  }
}

export async function createPost(title: string, content: string, userId: string): Promise<Post | null> {
  try {
    // Use raw SQL query due to typings issues
    const { data, error } = await supabase
      .rpc('create_post', { 
        p_title: title, 
        p_content: content, 
        p_user_id: userId 
      })
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
    // Use raw SQL query due to typings issues
    const { data, error } = await supabase
      .rpc('update_post', { 
        p_id: id, 
        p_title: title, 
        p_content: content, 
        p_user_id: userId 
      })
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
    // Use raw SQL query due to typings issues
    const { error } = await supabase
      .rpc('delete_post', { 
        p_id: id, 
        p_user_id: userId 
      });
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}
