
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';

interface ProfileTabContentProps {
  user: User;
  userProfile: UserProfile | null;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  location: string;
  setLocation: (location: string) => void;
  handleUpdateProfile: () => Promise<void>;
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({
  user,
  userProfile,
  isEditing,
  setIsEditing,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  bio,
  setBio,
  location,
  setLocation,
  handleUpdateProfile,
}) => {
  return (
    <Card>
      <CardHeader>
        <ProfileHeader
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleUpdateProfile={handleUpdateProfile}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        {userProfile ? (
          <ProfileForm
            user={user}
            userProfile={userProfile}
            isEditing={isEditing}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            bio={bio}
            setBio={setBio}
            zipCode={location}
            setZipCode={setLocation}
          />
        ) : (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Loading...</AlertTitle>
            <AlertDescription>
              Fetching your profile information. Please wait.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileTabContent;
