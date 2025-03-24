
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const TestAdmin = () => {
  const { user, userProfile, updateProfile } = useAuth();

  const makeAdmin = async () => {
    if (user && userProfile) {
      try {
        await updateProfile({ user_type: 'admin' });
        alert('You are now an admin. Refresh the page to see changes.');
        console.log('Profile updated to admin');
      } catch (error) {
        console.error('Error making admin:', error);
        alert('Error making admin: ' + JSON.stringify(error));
      }
    } else {
      alert('You must be logged in to become an admin');
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-bold mb-2">Admin Testing</h2>
      <pre className="bg-gray-100 p-2 mb-4 rounded overflow-auto max-h-40">
        {JSON.stringify({ user: !!user, userProfile }, null, 2)}
      </pre>
      <Button onClick={makeAdmin} variant="destructive">
        Make me an admin
      </Button>
    </div>
  );
};

export default TestAdmin;
