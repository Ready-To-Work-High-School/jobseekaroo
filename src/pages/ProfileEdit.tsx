
import React from 'react';
import Layout from '@/components/Layout';
import ProfileForm from '@/components/profile/ProfileForm';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import NotSignedInAlert from '@/components/profile/NotSignedInAlert';

const ProfileEdit = () => {
  const { user, userProfile, isLoading } = useAuth();

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
        
        {!isLoading && user && (
          <ProfileForm user={user} userProfile={userProfile} />
        )}
      </div>
    </Layout>
  );
};

export default ProfileEdit;
