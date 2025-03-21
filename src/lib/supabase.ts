
import { createClient } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import { ApplicationStatus } from '@/types/application';
import { Job, JobType, ExperienceLevel } from '@/types/job';
import { UserSkill, SkillResource, SkillGap } from '@/types/skills';

// Export the already configured supabase client
export const supabase = supabaseClient;

// Helper function to validate application status
export function validateApplicationStatus(status: string): ApplicationStatus {
  const validStatuses: ApplicationStatus[] = ['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn'];
  
  if (validStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }
  
  // Default to 'applied' if an invalid status is provided
  return 'applied';
}

// Get the base URL for authentication redirects
export function getRedirectUrl(): string {
  // In production, use the actual deployed URL
  // For local development, use localhost
  return `${window.location.origin}/`;
}

// Helper to get user profile data
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
}

// Helper to update user profile data
export async function updateUserProfile(userId: string, profileData: Partial<{
  first_name: string;
  last_name: string;
  bio: string;
  location: string;
  resume_url: string;
  skills: string[];
  preferences: Record<string, any>;
}>) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
  
  return data;
}

// Helper to get job recommendations for a user
export async function getJobRecommendations(userId: string) {
  try {
    const { data, error } = await supabase
      .from('job_recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('score', { ascending: false });
    
    if (error) {
      console.error('Error fetching job recommendations:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching job recommendations:', error);
    return [];
  }
}

// Helper to manually trigger recommendation generation for a user
export async function generateRecommendationsForUser(userId: string) {
  try {
    const { data, error } = await supabase
      .rpc('generate_job_recommendations', { user_id_param: userId });
    
    if (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Exception generating recommendations:', error);
    throw error;
  }
}

// Helper to fetch all jobs from the database
export async function getAllJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
    
    // Transform the database records to match the Job type
    return (data || []).map(job => transformDatabaseJobToJobType(job));
  } catch (error) {
    console.error('Exception fetching jobs:', error);
    return [];
  }
}

// Helper to fetch a specific job by ID
export async function getJobById(id: string): Promise<Job | null> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Record not found, this is expected in some cases
        console.log(`Job with ID ${id} not found in database`);
        return null;
      }
      console.error('Error fetching job by id:', error);
      return null;
    }
    
    if (!data) return null;
    
    return transformDatabaseJobToJobType(data);
  } catch (error) {
    console.error('Exception fetching job by id:', error);
    return null;
  }
}

// Helper function to transform a database job record to the Job type
function transformDatabaseJobToJobType(dbJob: any): Job {
  return {
    id: dbJob.id,
    title: dbJob.title,
    company: {
      name: dbJob.company_name,
    },
    location: {
      city: dbJob.location_city,
      state: dbJob.location_state,
      zipCode: dbJob.location_zip,
    },
    type: dbJob.job_type as JobType,
    payRate: {
      min: Number(dbJob.pay_rate_min),
      max: Number(dbJob.pay_rate_max),
      period: dbJob.pay_rate_period as 'hourly' | 'weekly' | 'monthly',
    },
    description: dbJob.description,
    requirements: dbJob.requirements,
    experienceLevel: dbJob.experience_level as ExperienceLevel,
    postedDate: dbJob.posted_date,
    logoUrl: dbJob.logo_url,
    isRemote: dbJob.is_remote,
    isFlexible: dbJob.is_flexible,
    isFeatured: dbJob.is_featured,
  };
}

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
    // Get user skills
    const userSkills = await getUserSkills(userId);
    
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
      const userLevel = userSkillsMap.get(req.toLowerCase()) || 0;
      
      if (userLevel < requiredLevel) {
        gaps.push({
          skill_name: req,
          required_level: requiredLevel,
          current_level: userLevel,
          gap: requiredLevel - userLevel
        });
      }
    });
    
    return gaps.sort((a, b) => b.gap - a.gap); // Sort by largest gap first
  } catch (error) {
    console.error('Exception analyzing skill gaps:', error);
    return [];
  }
}
