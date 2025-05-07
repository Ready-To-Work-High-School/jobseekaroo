
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { UserProfile } from '@/types/user';
import { Award, Briefcase, MapPin, Mail, Shield, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ProfileHeaderProps {
  user?: any;
  userProfile?: UserProfile | null;
  isCeo?: boolean;
  showCeoIcon?: boolean;
  isInceptionMember?: boolean;
  accountAge?: string;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
  handleUpdateProfile?: () => Promise<void>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  userProfile,
  isCeo,
  showCeoIcon,
  isInceptionMember,
  accountAge,
  isEditing,
  setIsEditing,
  handleUpdateProfile,
}) => {
  if (!userProfile && !isEditing) return null;
  
  // For ProfileTabContent component which uses this in edit mode
  if (isEditing !== undefined && setIsEditing && handleUpdateProfile) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Personal Information</h3>
          <p className="text-sm text-muted-foreground">Update your personal details</p>
        </div>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleUpdateProfile}>Save</Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>
    );
  }
  
  // Original display mode for the main profile
  return (
    <div className="relative border-b bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/30 dark:to-background pb-6">
      {/* Profile background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-30 -ml-10 -mb-10"></div>
      
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <Avatar className="h-16 w-16 border-2 border-blue-100 shadow-md">
            <AvatarImage src={userProfile?.avatar_url || ''} alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              {userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          
          {/* CEO Shield badge on avatar */}
          {showCeoIcon && (
            <div className="absolute -bottom-1 -right-1">
              <Link to="/ceo-portal">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-amber-400 p-1 border-2 border-white shadow-md">
                  <Shield className="h-3 w-3 text-white" />
                </div>
              </Link>
            </div>
          )}
          
          {/* Inception Member ribbon for 2025-2026 signups */}
          {isInceptionMember && (
            <div className="absolute -right-2 -top-2 rotate-45">
              <div className="bg-blue-600 text-white text-[10px] py-1 px-6 shadow-md font-semibold">
                INCEPTION
              </div>
            </div>
          )}
        </div>
        
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-bold">
              {userProfile?.first_name} {userProfile?.last_name}
            </h2>
            {isCeo && (
              <Badge variant="outline" className="bg-gradient-to-r from-purple-800 via-blue-700 to-amber-600 text-white border-gray-700">
                <Shield className="h-3 w-3 mr-1" />
                Chief Executive Officer
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="flex items-center text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
              {user?.email}
            </span>
            
            {userProfile?.job_title && !isCeo && (
              <span className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                {userProfile.job_title}
              </span>
            )}
            
            {userProfile?.location && (
              <span className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                {userProfile.location}
              </span>
            )}
            
            {userProfile?.created_at && (
              <span className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                Member for {accountAge}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
