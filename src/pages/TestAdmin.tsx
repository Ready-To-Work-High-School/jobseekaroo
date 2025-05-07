
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, ExternalLink, RefreshCw, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { useAdminStatus } from '@/hooks/useAdminStatus';

const TestAdmin = () => {
  const { user, userProfile, updateProfile, refreshProfile } = useAuth();
  const { isAdmin } = useAdminStatus();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchParams] = useSearchParams();
  const adminTestMode = searchParams.get('adminTest') === 'true';

  useEffect(() => {
    console.log('TestAdmin component - user:', user);
    console.log('TestAdmin component - userProfile:', userProfile);
    console.log('TestAdmin component - isAdmin:', isAdmin);
    console.log('TestAdmin component - adminTestMode:', adminTestMode);
  }, [user, userProfile, isAdmin, adminTestMode]);

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
          variant: "default",
        });
        
        // Reload the page to ensure all components recognize the new admin status
        window.location.reload();
      } catch (error: any) {
        console.error('Error making admin:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to update profile to admin.",
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
    <Layout>
      <div className="container max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Access Testing</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Admin Status</CardTitle>
            <CardDescription>
              Current admin status and testing options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {user ? (
                <>
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Current Status</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>User:</span>
                        <span className="font-medium">{user.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>User Type:</span>
                        <span className="font-medium">{userProfile?.user_type || user?.user_metadata?.user_type || "standard"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Admin Status:</span>
                        {isAdmin ? (
                          <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                        ) : (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <span>Test Mode:</span>
                        {adminTestMode ? (
                          <Badge variant="success" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Enabled</Badge>
                        ) : (
                          <Badge variant="outline">Disabled</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {!isAdmin && (
                      <Button 
                        onClick={makeAdmin} 
                        variant="default" 
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
                    
                    {(isAdmin || adminTestMode) && (
                      <div className="space-y-2">
                        <Button 
                          onClick={goToAdminPanel} 
                          className="w-full"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Go to Admin Dashboard
                        </Button>
                        
                        <Button 
                          onClick={goToAdminUserManagement} 
                          variant="outline"
                          className="w-full"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          User Management
                        </Button>
                      </div>
                    )}
                    
                    <Button 
                      onClick={goToAdminTestMode} 
                      className="w-full bg-amber-600 hover:bg-amber-700"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Enable Admin Test Mode
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                    <p className="text-amber-800 font-medium">⚠️ You need to sign in first</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Sign in to test the admin functionality
                    </p>
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link to="/sign-in">Sign In Now</Link>
                  </Button>
                  
                  <Button onClick={goToAdminTestMode} className="w-full bg-amber-600 hover:bg-amber-700">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Bypass Auth & Access Admin Panel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TestAdmin;
