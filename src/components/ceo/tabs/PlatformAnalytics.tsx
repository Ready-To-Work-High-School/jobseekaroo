
import React from 'react';
import { CalendarClock, TrendingUp, Users, Briefcase } from 'lucide-react';
import CeoFeatureCard from '@/components/ceo/CeoFeatureCard';
import { Progress } from "@/components/ui/progress";

const PlatformAnalytics: React.FC = () => {
  // Example analytics data - in a real app this would come from an API
  const analytics = {
    activeStudents: 56,
    verifiedEmployers: 28,
    successfulPlacements: 34,
    platformGrowth: 22, // percentage growth
    studentRetention: 89, // percentage
  };

  return (
    <div className="grid gap-6">
      <CeoFeatureCard
        icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
        title="Platform Analytics"
        description="Key performance metrics for the platform"
      >
        <div className="space-y-6">
          {/* Active Students */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Active Verified Students:
              </span>
              <span className="font-medium">{analytics.activeStudents}+</span>
            </div>
            <Progress value={analytics.activeStudents} className="h-2" />
          </div>
          
          {/* Verified Employers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-purple-500" />
                Verified Employers:
              </span>
              <span className="font-medium">{analytics.verifiedEmployers}+</span>
            </div>
            <Progress value={analytics.verifiedEmployers * 2} className="h-2" />
          </div>
          
          {/* Successful Placements */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-emerald-500" />
                Successful Placements:
              </span>
              <span className="font-medium">{analytics.successfulPlacements}+</span>
            </div>
            <Progress value={analytics.successfulPlacements * 2} className="h-2" />
          </div>
          
          {/* Additional metrics */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="text-center p-3 bg-blue-50 rounded-md">
              <span className="block text-sm text-muted-foreground">Platform Growth</span>
              <span className="text-xl font-bold text-blue-600">{analytics.platformGrowth}%</span>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-md">
              <span className="block text-sm text-muted-foreground">Student Retention</span>
              <span className="text-xl font-bold text-green-600">{analytics.studentRetention}%</span>
            </div>
          </div>
        </div>
      </CeoFeatureCard>
    </div>
  );
};

export default PlatformAnalytics;
