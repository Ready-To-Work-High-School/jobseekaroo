
import { UserSkill, SkillResource, SkillGap } from '@/types/skills';
import { supabase } from '@/integrations/supabase/client';

// Skills management helpers
export async function getUserSkills(userId: string): Promise<UserSkill[]> {
  try {
    const { data, error } = await supabase
      .from('user_skills')
      .select('*')
      .eq('user_id', userId)
      .order('skill_name', { ascending: true });
    
    if (error) {
      console.error('Error fetching user skills:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching user skills:', error);
    return [];
  }
}

export async function createUserSkill(skill: Omit<UserSkill, 'id' | 'created_at' | 'updated_at'>): Promise<UserSkill | null> {
  try {
    // Check if the skill already exists for this user
    const { data: existingSkill, error: checkError } = await supabase
      .from('user_skills')
      .select('id')
      .eq('user_id', skill.user_id)
      .eq('skill_name', skill.skill_name)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking for existing skill:', checkError);
      throw checkError;
    }
    
    // If skill already exists, return early
    if (existingSkill) {
      console.log('Skill already exists for this user');
      throw new Error('Skill already exists for this user');
    }
    
    const { data, error } = await supabase
      .from('user_skills')
      .insert([{
        ...skill,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user skill:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Exception creating user skill:', error);
    throw error;
  }
}

export async function updateUserSkill(skillId: string, updates: Partial<UserSkill>): Promise<UserSkill | null> {
  try {
    const { data, error } = await supabase
      .from('user_skills')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', skillId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user skill:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Exception updating user skill:', error);
    throw error;
  }
}

export async function deleteUserSkill(skillId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_skills')
      .delete()
      .eq('id', skillId);
    
    if (error) {
      console.error('Error deleting user skill:', error);
      throw error;
    }
  } catch (error) {
    console.error('Exception deleting user skill:', error);
    throw error;
  }
}

export async function getSkillResources(skillName?: string): Promise<SkillResource[]> {
  try {
    let query = supabase
      .from('skill_resources')
      .select('*');
    
    if (skillName) {
      query = query.eq('skill_name', skillName);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching skill resources:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching skill resources:', error);
    return [];
  }
}

export async function analyzeSkillGaps(
  userId: string, 
  jobRequirements: string[]
): Promise<SkillGap[]> {
  try {
    console.log('Analyzing skill gaps for user', userId);
    console.log('Job requirements:', jobRequirements);
    
    // Get user skills
    const userSkills = await getUserSkills(userId);
    console.log('User skills:', userSkills);
    
    // Create a map of skill names to levels
    const userSkillsMap = new Map<string, number>();
    userSkills.forEach(skill => {
      userSkillsMap.set(skill.skill_name.toLowerCase(), skill.proficiency_level);
    });
    
    // Analyze gaps
    const gaps: SkillGap[] = [];
    
    jobRequirements.forEach(req => {
      // Simple matching - in a real app you'd use more sophisticated matching
      const requiredLevel = 3; // Assume all job requirements need level 3 proficiency
      const reqLower = req.toLowerCase();
      let userLevel = 0;
      
      // Look for direct match first
      if (userSkillsMap.has(reqLower)) {
        userLevel = userSkillsMap.get(reqLower) || 0;
      } else {
        // Look for partial matches
        for (const [skillName, level] of userSkillsMap.entries()) {
          if (skillName.includes(reqLower) || reqLower.includes(skillName)) {
            userLevel = level;
            break;
          }
        }
      }
      
      if (userLevel < requiredLevel) {
        gaps.push({
          skill_name: req,
          required_level: requiredLevel,
          current_level: userLevel,
          gap: requiredLevel - userLevel
        });
      }
    });
    
    console.log('Found skill gaps:', gaps);
    return gaps.sort((a, b) => b.gap - a.gap); // Sort by largest gap first
  } catch (error) {
    console.error('Exception analyzing skill gaps:', error);
    return [];
  }
}
