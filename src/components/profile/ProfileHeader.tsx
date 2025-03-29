
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, X, Check } from 'lucide-react';

interface ProfileHeaderProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  handleUpdateProfile: () => Promise<void>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  isEditing,
  setIsEditing,
  handleUpdateProfile,
}) => {
  return (
    <div className="flex justify-between items-center">
      <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
      {isEditing ? (
        <div className="space-x-2">
          <Button variant="ghost" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleUpdateProfile}>
            <Check className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;
