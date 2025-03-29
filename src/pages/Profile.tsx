
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useFadeIn } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import NotSignedInAlert from '@/components/profile/NotSignedInAlert';
import ProfileTabContent from '@/components/profile/ProfileTabContent';
import BenefitsTabContent from '@/components/profile/BenefitsTabContent';

const Profile: React.FC = () => {
  const { user, userProfile, updateProfile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(userProfile?.first_name || '');
  const [lastName, setLastName] = useState(userProfile?.last_name || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [location, setLocation] = useState(userProfile?.location || '');
  const fadeIn = useFadeIn(300);
  const { toast } = useToast();

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        bio: bio,
        location: location,
      });
      setIsEditing(false);
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
      await refreshProfile();
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className={`container mx-auto px-4 py-12 max-w-2xl ${fadeIn}`}>
          <NotSignedInAlert />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-12 max-w-4xl ${fadeIn}`}>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-4">
            <ProfileTabContent
              user={user}
              userProfile={userProfile}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              bio={bio}
              setBio={setBio}
              location={location}
              setLocation={setLocation}
              handleUpdateProfile={handleUpdateProfile}
            />
          </TabsContent>
          <TabsContent value="benefits" className="space-y-4">
            <BenefitsTabContent userProfile={userProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
