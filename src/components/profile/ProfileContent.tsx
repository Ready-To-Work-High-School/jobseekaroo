
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/user';
import UserBadges from '@/components/badges/UserBadges';
import { UserBadge } from '@/types/badges';

interface ProfileContentProps {
  userProfile: UserProfile | null;
  badges: UserBadge[];
  badgesLoading: boolean;
  isInceptionMember: boolean;
  isEmployer: boolean;
  employerStats: {
    jobsPosted: number;
    hires: number;
    applications: number;
  };
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  userProfile,
  badges,
  badgesLoading,
  isInceptionMember,
  isEmployer,
  employerStats
}) => {
  return (
    <div className="pt-6">
      {badgesLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
          <Award className="h-5 w-5 text-amber-500/50" />
          <p>Loading badges...</p>
        </div>
      ) : (
        <UserBadges badges={badges} className="mt-0" />
      )}
      
      {/* Display employer stats if user is an employer */}
      {isEmployer && (
        <div className="mt-4 pt-4 border-t">
          <h3 className="font-medium flex items-center gap-2 mb-2">
            <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Employer Statistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground">Jobs Posted</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {employerStats.jobsPosted}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground">Hires</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {employerStats.hires}
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
              <p className="text-sm text-muted-foreground">Applications</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {employerStats.applications}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
