
import { Job } from '@/types/job';
import { useAuth } from '@/contexts/AuthContext';

export const useQualificationMatch = (job: Job) => {
  const { userProfile } = useAuth();
  
  if (!userProfile?.skills) {
    return {
      score: 0,
      matchClass: 'glow-amber' // Default for when we can't determine
    };
  }

  const userSkills = userProfile.skills as string[];
  const requiredSkills = job.requirements || [];
  
  // Calculate match percentage
  const matchingSkills = requiredSkills.filter(skill => 
    userSkills.some(userSkill => 
      userSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );
  
  const score = requiredSkills.length > 0 
    ? (matchingSkills.length / requiredSkills.length) * 100 
    : 0;
  
  // Determine glow class based on match score
  const matchClass = score >= 80 ? 'glow-green' 
    : score >= 50 ? 'glow-blue'
    : 'glow-amber';
    
  return { score, matchClass };
};
