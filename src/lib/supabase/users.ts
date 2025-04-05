
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

export interface UserWithoutPassword {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function registerUser(username: string, email: string, password: string) {
  try {
    const hashedPassword = await hashPassword(password);
    
    // Use RPC function instead of direct table access
    const { data, error } = await supabase
      .rpc('register_user', {
        p_username: username,
        p_email: email,
        p_password: hashedPassword
      })
      .select();
      
    if (error) throw error;
    
    return { user: data, error: null };
  } catch (error) {
    console.error('Error registering user:', error);
    return { user: null, error };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    // Use RPC function to get user by email
    const { data: user, error } = await supabase
      .rpc('get_user_by_email', { p_email: email })
      .single();
    
    if (error) throw error;
    
    if (!user) {
      return { user: null, error: new Error('User not found') };
    }
    
    const isMatch = await comparePassword(password, user.password);
    
    if (!isMatch) {
      return { user: null, error: new Error('Invalid credentials') };
    }
    
    // Don't return the password
    const { password: _, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, error: null };
  } catch (error) {
    console.error('Error logging in:', error);
    return { user: null, error };
  }
}

export async function getUserById(id: string): Promise<UserWithoutPassword | null> {
  try {
    // Use RPC function to get user by id
    const { data, error } = await supabase
      .rpc('get_user_by_id', { p_id: id })
      .single();
      
    if (error) throw error;
    
    if (!data) return null;

    // Don't return the password
    const { password: _, ...userWithoutPassword } = data;
    
    return userWithoutPassword;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function getAllUsers(): Promise<UserWithoutPassword[]> {
  try {
    // Use RPC function to get all users
    const { data, error } = await supabase
      .rpc('get_all_users')
      .select();
      
    if (error) throw error;
    
    // Remove passwords from the results
    return data.map(user => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}
