
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
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        { username, email, password: hashedPassword }
      ])
      .select('id, username, email, created_at')
      .single();
      
    if (error) throw error;
    
    return { user: data, error: null };
  } catch (error) {
    console.error('Error registering user:', error);
    return { user: null, error };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, email, password, created_at')
      .eq('email', email)
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
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, created_at')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function getAllUsers(): Promise<UserWithoutPassword[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, created_at');
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
}
