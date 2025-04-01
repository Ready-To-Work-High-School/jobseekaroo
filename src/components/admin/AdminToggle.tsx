
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminToggle = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const { toast } = useToast();

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
      await updateProfile({ user_type: 'admin' });
      toast({
        title: "Success",
        description: "You are now an admin user",
      });
      // Force refresh to show the updated profile
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Error making admin:', error);
      toast({
        title: "Error",
        description: "Failed to update profile to admin",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4 mb-6">
      <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
        <Shield className="h-5 w-5 text-primary" />
        Admin Access
      </h2>
      
      {userProfile?.user_type === 'admin' ? (
        <div className="bg-green-50 p-3 rounded-md border border-green-200 mb-4">
          <p className="text-green-800 font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            You have admin privileges
          </p>
        </div>
      ) : (
        <div className="bg-amber-50 p-3 rounded-md border border-amber-200 mb-4">
          <p className="text-amber-800 font-medium flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            You don't have admin privileges
          </p>
        </div>
      )}
      
      <div className="flex flex-col space-y-2">
        <Button 
          onClick={makeAdmin} 
          variant={userProfile?.user_type === 'admin' ? "outline" : "default"}
          disabled={userProfile?.user_type === 'admin'}
        >
          {userProfile?.user_type === 'admin' ? "Already an admin" : "Make me an admin"}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/admin/redemption-codes'}
        >
          Go to Redemption Codes
        </Button>
      </div>
    </Card>
  );
};

export default AdminToggle;
