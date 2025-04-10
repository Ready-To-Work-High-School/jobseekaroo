
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ProfileForm from '@/components/profile/ProfileForm';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import NotSignedInAlert from '@/components/profile/NotSignedInAlert';

const ProfileEdit = () => {
  const { user, userProfile, isLoading } = useAuth();
  const [firstName, setFirstName] = useState(userProfile?.first_name || '');
  const [lastName, setLastName] = useState(userProfile?.last_name || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.contact_details_encrypted || '');
  const [zipCode, setZipCode] = useState(userProfile?.location || '');

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}
        
        {!isLoading && !user && <NotSignedInAlert />}
        
        {!isLoading && user && userProfile && (
          <ProfileForm 
            user={user} 
            userProfile={userProfile}
            isEditing={true}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={user?.email || ''}
            bio={bio}
            setBio={setBio}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProfileEdit;
