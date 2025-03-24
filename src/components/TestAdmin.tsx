
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
      <h2 className="text-lg font-bold mb-2">Admin Testing Panel</h2>
      
      {user ? (
        <>
          <div className="bg-green-50 p-3 mb-4 rounded-md border border-green-200">
            <p className="text-green-800 font-medium">✓ You are signed in</p>
            <p className="text-sm text-green-700 mt-1">
              Current role: {userProfile?.user_type || 'standard user'}
            </p>
          </div>
          
          <pre className="bg-gray-100 p-2 mb-4 rounded overflow-auto max-h-40 text-xs">
            {JSON.stringify({ user: !!user, userProfile }, null, 2)}
          </pre>
          
          <Button onClick={makeAdmin} variant="destructive" className="w-full">
            Make me an admin
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            After clicking, refresh the page to see the admin navigation links
          </p>
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
            <p className="text-amber-800 font-medium">⚠️ You need to sign in first</p>
            <p className="text-sm text-amber-700 mt-1">
              Sign in to test the admin functionality
            </p>
          </div>
          
          <Button asChild className="w-full">
            <Link to="/sign-in">Sign In Now</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestAdmin;
