
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types/user';

export const useUserManagement = () => {
  const { user, userProfile, signOut } = useAuth();
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check if user has premium subscription
    setIsPremium(userProfile?.preferences?.hasPremium === true);
  }, [userProfile]);

  const getUserTypeDetails = () => {
    switch (userProfile?.user_type) {
      case 'student':
        return {
          title: 'Student Account',
          description: 'Access to premium student features for your career journey',
          color: 'bg-blue-50 border-blue-200'
        };
      case 'employer':
        return {
          title: 'Employer Account',
          description: 'Premium tools to connect with talented students',
          color: 'bg-amber-50 border-amber-200'
        };
      case 'teacher':
        return {
          title: 'Teacher Account',
          description: 'Resources to guide students in their career development',
          color: 'bg-green-50 border-green-200'
        };
      case 'admin':
        return {
          title: 'Chief Executive Officer',
          description: 'Full platform administration and management capabilities',
          color: 'bg-gray-100 border-gray-400'
        };
      default:
        return {
          title: 'Basic Account',
          description: 'Standard features for job seekers',
          color: 'bg-gray-50 border-gray-200'
        };
    }
  };
  
  const getUserTypeColor = (type?: string) => {
    switch (type) {
      case 'student':
        return 'bg-blue-500 text-white';
      case 'employer':
        return 'bg-amber-500 text-white';
      case 'teacher':
        return 'bg-green-500 text-white';
      case 'admin':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getBadgeCount = (): number => {
    return userProfile?.badges?.length || 0;
  };

  const getStudentBadgeCount = (): number => {
    return userProfile?.student_badges?.length || 0;
  };

  const hasSkills = (): boolean => {
    return !!userProfile?.skills && userProfile.skills.length > 0;
  };

  const hasLocation = (): boolean => {
    return !!userProfile?.location;
  };

  const hasResume = (): boolean => {
    return !!userProfile?.resume_url;
  };

  const hasCompanyName = (): boolean => {
    return !!userProfile?.company_name;
  };

  const hasCompanyWebsite = (): boolean => {
    return !!userProfile?.company_website;
  };

  const hasJobTitle = (): boolean => {
    return !!userProfile?.job_title;
  };

  const hasBio = (): boolean => {
    return !!userProfile?.bio;
  };
  
  const hasRedeemed = !!userProfile?.redeemed_at;

  const getUpgradeMessage = () => {
    if (isPremium) return "You have premium access";
    if (userProfile?.redeemed_at) return "Your account has been upgraded with a redemption code";
    if (userProfile?.user_type === 'student') return "Upgrade to premium for exclusive student features";
    if (userProfile?.user_type === 'employer') return "Upgrade to premium for enhanced employer tools";
    if (userProfile?.user_type === 'teacher') return "Upgrade to premium for enhanced teaching tools";
    return "Upgrade to premium for enhanced features";
  };

  return {
    user,
    userProfile,
    signOut,
    isPremium,
    getUserTypeDetails,
    getUserTypeColor,
    getBadgeCount,
    getStudentBadgeCount,
    hasSkills,
    hasLocation,
    hasResume,
    hasCompanyName,
    hasCompanyWebsite,
    hasJobTitle,
    hasBio,
    hasRedeemed,
    getUpgradeMessage
  };
};
