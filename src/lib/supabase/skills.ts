
import { supabase } from '@/lib/supabase';

export const getUserSkills = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_skills')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user skills:', error);
    return [];
  }
};

export const createUserSkill = async (userId: string, skillData: any) => {
  try {
    const { data, error } = await supabase
      .from('user_skills')
      .insert({ user_id: userId, ...skillData })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user skill:', error);
    throw error;
  }
};

export const updateUserSkill = async (skillId: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from('user_skills')
      .update(updates)
      .eq('id', skillId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user skill:', error);
    throw error;
  }
};

export const deleteUserSkill = async (skillId: string) => {
  try {
    const { error } = await supabase
      .from('user_skills')
      .delete()
      .eq('id', skillId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting user skill:', error);
    throw error;
  }
};

export const getSkillResources = async () => {
  try {
    const { data, error } = await supabase
      .from('skill_resources')
      .select('*');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching skill resources:', error);
    return [];
  }
};
