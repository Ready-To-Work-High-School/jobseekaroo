
import React from 'react';
import { format } from 'date-fns';
import { Calendar, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/user';

interface ProfileBioSectionProps {
  userProfile: UserProfile | null;
  isInceptionMember: boolean;
}

const ProfileBioSection: React.FC<ProfileBioSectionProps> = ({
  userProfile,
  isInceptionMember
}) => {
  if (!userProfile) return null;
  
  return (
    <div className="space-y-4 pt-6">
      {userProfile.bio && (
        <div>
          <h3 className="font-medium">Bio</h3>
          <p className="mt-1 text-muted-foreground">{userProfile.bio}</p>
        </div>
      )}
      
      {userProfile.skills && userProfile.skills.length > 0 && (
        <div>
          <h3 className="font-medium">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {userProfile.skills.map(skill => (
              <Badge 
                key={skill} 
                variant="outline" 
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {userProfile.created_at && (
        <div>
          <h3 className="font-medium">Account Information</h3>
          <div className="mt-1 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Joined: {format(new Date(userProfile.created_at), 'MMMM d, yyyy')}</span>
            </div>
            {isInceptionMember && (
              <div className="flex items-center gap-2 mt-1">
                <Award className="h-4 w-4 text-blue-500" />
                <span className="text-blue-600 font-medium">2025-2026 Inception Member</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBioSection;
