
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TestAdmin = () => {
  const { user, userProfile, updateProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log('TestAdmin component - userProfile:', userProfile);

  const makeAdmin = async () => {
    if (user && userProfile) {
      try {
        await updateProfile({ user_type: 'admin' });
        toast({
          title: "Success",
          description: "You are now an admin. Please wait while we refresh your profile...",
        });
        console.log('Profile updated to admin');
        
        // Refresh profile to ensure we have the updated user type
        await refreshProfile();
        
        toast({
          title: "Profile Updated",
          description: "Your admin privileges are now active. You can access the admin panel.",
        });
      } catch (error) {
        console.error('Error making admin:', error);
        toast({
          title: "Error",
          description: "Failed to update profile to admin.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Not Logged In",
        description: "You must be logged in to become an admin",
        variant: "destructive",
      });
    }
  };

  const goToAdminTestMode = () => {
    console.log("Navigating to admin test mode");
    // Use direct navigation to avoid any authentication checks that might redirect
    window.location.href = '/admin?adminTest=true';
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
          
          <Button onClick={makeAdmin} variant="destructive" className="w-full mb-2">
            Make me an admin
          </Button>
          
          <Button onClick={goToAdminTestMode} className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
            <Shield className="mr-2 h-4 w-4" />
            Bypass Auth & Access Admin Panel
          </Button>
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
          
          <Button onClick={goToAdminTestMode} className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
            <ExternalLink className="mr-2 h-4 w-4" />
            Bypass Auth & Access Admin Panel
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestAdmin;
