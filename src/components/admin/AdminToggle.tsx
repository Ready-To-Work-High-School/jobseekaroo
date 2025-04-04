
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const AdminToggle = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Debug log to trace admin status and navigation
  console.log('AdminToggle - userProfile:', userProfile);

  const makeAdmin = async () => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You need to be logged in to become an admin",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await updateProfile({ user_type: 'admin' });
      toast({
        title: "Success",
        description: "You are now an admin user. Refresh the page to see the changes.",
      });
      
      // Force refresh to show the updated profile
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error('Error making admin:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile to admin",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToAdminPage = () => {
    console.log('Navigating to admin panel');
    navigate('/admin');
  };

  return (
    <Card className="p-4 mb-6">
      <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
        <Shield className="h-5 w-5 text-primary" />
        Admin Access
      </h2>
      
      {userProfile?.user_type === 'admin' ? (
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800 mb-4">
          <p className="text-green-800 dark:text-green-300 font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            You have admin privileges
          </p>
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md border border-amber-200 dark:border-amber-800 mb-4">
          <p className="text-amber-800 dark:text-amber-300 font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            You don't have admin privileges
          </p>
        </div>
      )}
      
      <div className="flex flex-col space-y-2">
        <Button 
          onClick={makeAdmin} 
          variant={userProfile?.user_type === 'admin' ? "outline" : "default"}
          disabled={userProfile?.user_type === 'admin' || isLoading}
          className="relative"
        >
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Processing...
            </>
          ) : userProfile?.user_type === 'admin' ? (
            "Already an admin"
          ) : (
            "Make me an admin"
          )}
        </Button>
        
        {userProfile?.user_type === 'admin' && (
          <Button 
            variant="default" 
            onClick={goToAdminPage}
            disabled={isLoading}
          >
            Go to Admin Dashboard
          </Button>
        )}
        
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/redemption-codes')}
          disabled={isLoading}
        >
          Go to Redemption Codes
        </Button>
      </div>
    </Card>
  );
};

export default AdminToggle;
