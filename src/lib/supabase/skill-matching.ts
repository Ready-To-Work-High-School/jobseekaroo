
import { UserSkill } from '@/types/skills';
import { Job } from '@/types/job';
import { supabase } from './index';

/**
 * Calculate a skill match score between a user's skills and job requirements
 */
export async function calculateSkillMatchScore(
  userId: string,
  job: Job
): Promise<{ score: number; matchedSkills: string[] }> {
  try {
    // Fetch user skills
    const { data: userSkills, error } = await supabase
      .from('user_skills')
      .select('skill_name, proficiency_level')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user skills:', error);
      return { score: 0, matchedSkills: [] };
    }

    if (!userSkills || userSkills.length === 0) {
      return { score: 0, matchedSkills: [] };
    }

    // Create a map of skill names to proficiency levels
    const skillMap = new Map<string, number>();
    userSkills.forEach((skill) => {
      skillMap.set(skill.skill_name.toLowerCase(), skill.proficiency_level);
    });

    // Check how many job requirements match user skills
    const jobRequirements = job.requirements || [];
    const matchedSkills: string[] = [];
    let totalScore = 0;

    jobRequirements.forEach((requirement) => {
      const reqLower = requirement.toLowerCase();
      
      // Check for exact matches
      if (skillMap.has(reqLower)) {
        matchedSkills.push(requirement);
        totalScore += skillMap.get(reqLower) || 0;
        return;
      }
      
      // Check for partial matches (if requirement contains a skill or vice versa)
      for (const [skillName, level] of skillMap.entries()) {
        if (reqLower.includes(skillName) || skillName.includes(reqLower)) {
          matchedSkills.push(requirement);
          totalScore += level * 0.7; // Apply a partial match penalty
          return;
        }
      }
    });

    // Calculate final score as a percentage
    const maxPossibleScore = jobRequirements.length * 5; // Assuming max proficiency is 5
    const normalizedScore = maxPossibleScore > 0 
      ? (totalScore / maxPossibleScore) * 100 
      : 0;

    return {
      score: Math.min(Math.round(normalizedScore), 100),
      matchedSkills: matchedSkills
    };
  } catch (error) {
    console.error('Error calculating skill match:', error);
    return { score: 0, matchedSkills: [] };
  }
}

/**
 * Get job recommendations based on user skills
 */
export async function getSkillBasedJobRecommendations(
  userId: string,
  limit: number = 5
): Promise<Array<Job & { matchScore: number; matchedSkills: string[] }>> {
  try {
    // First get all jobs
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs for recommendations:', error);
      return [];
    }

    if (!jobs || jobs.length === 0) {
      return [];
    }

    // Calculate match scores for each job
    const jobsWithScores = await Promise.all(
      jobs.map(async (job) => {
        const { score, matchedSkills } = await calculateSkillMatchScore(userId, job as unknown as Job);
        return {
          ...(job as unknown as Job),
          matchScore: score,
          matchedSkills
        };
      })
    );

    // Sort by match score and return top results
    return jobsWithScores
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting skill-based recommendations:', error);
    return [];
  }
}
