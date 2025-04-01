
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ExternalLink, RefreshCw, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

const TestAdmin = () => {
  const { user, userProfile, updateProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  console.log('TestAdmin component - userProfile:', userProfile);

  const makeAdmin = async () => {
    if (user && userProfile) {
      setIsUpdating(true);
      try {
        await updateProfile({ user_type: 'admin' });
        toast({
          title: "Success",
          description: "You are now an admin. Please wait while we refresh your profile...",
        });
        console.log('Profile updated to admin');
        
        // Force refresh profile to ensure we have the updated user type
        setIsRefreshing(true);
        await refreshProfile();
        setIsRefreshing(false);
        
        toast({
          title: "Profile Updated",
          description: "Your admin privileges are now active. You can access the admin panel.",
          // Changed from "success" to "default" since "success" is not a valid variant
          variant: "default",
        });
      } catch (error) {
        console.error('Error making admin:', error);
        toast({
          title: "Error",
          description: "Failed to update profile to admin.",
          variant: "destructive",
        });
      } finally {
        setIsUpdating(false);
      }
    } else {
      toast({
        title: "Not Logged In",
        description: "You must be logged in to become an admin",
        variant: "destructive",
      });
    }
  };

  const goToAdminPanel = () => {
    console.log("Navigating to admin panel");
    navigate('/admin');
  };

  const goToAdminUserManagement = () => {
    console.log("Navigating to admin user management");
    navigate('/admin/users');
  };
  
  const goToAdminTestMode = () => {
    console.log("Navigating to admin test mode");
    // Use direct navigation to avoid any authentication checks that might redirect
    window.location.href = '/admin?adminTest=true';
  };

  return (
    <Card className="p-4 border rounded-md">
      <h2 className="text-lg font-bold mb-4">Admin Control Panel</h2>
      
      {user ? (
        <>
          <div className={`bg-${userProfile?.user_type === 'admin' ? 'green' : 'amber'}-50 p-3 mb-4 rounded-md border border-${userProfile?.user_type === 'admin' ? 'green' : 'amber'}-200`}>
            <p className={`text-${userProfile?.user_type === 'admin' ? 'green' : 'amber'}-800 font-medium`}>
              {userProfile?.user_type === 'admin' 
                ? '✓ You have admin privileges' 
                : '⚠️ You do not have admin privileges yet'}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Current role: {userProfile?.user_type || 'standard user'}
            </p>
          </div>
          
          <div className="space-y-3">
            {userProfile?.user_type !== 'admin' && (
              <Button 
                onClick={makeAdmin} 
                variant="destructive" 
                className="w-full"
                disabled={isUpdating || isRefreshing}
              >
                {isUpdating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Making you admin...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Make me an admin
                  </>
                )}
              </Button>
            )}
            
            {isRefreshing && (
              <div className="flex items-center justify-center py-2 text-sm text-blue-600">
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing profile...
              </div>
            )}
            
            {userProfile?.user_type === 'admin' && (
              <div className="space-y-2">
                <Button 
                  onClick={goToAdminPanel} 
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Go to Admin Dashboard
                </Button>
                
                <Button 
                  onClick={goToAdminUserManagement} 
                  className="w-full flex items-center justify-center"
                >
                  <Users className="mr-2 h-4 w-4" />
                  User Management
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={goToAdminTestMode} 
                  className="w-full flex items-center justify-center"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Usage Analytics
                </Button>
              </div>
            )}
            
            <Button 
              onClick={goToAdminTestMode} 
              className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
            >
              <Shield className="mr-2 h-4 w-4" />
              Bypass Auth & Access Admin Panel (Test Mode)
            </Button>
          </div>
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
    </Card>
  );
};

export default TestAdmin;
