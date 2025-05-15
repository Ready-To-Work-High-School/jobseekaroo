
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile } from '@/types/user';
import PremiumManagementTable from './premium/PremiumManagementTable';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

interface PremiumManagementProps {
  users: UserProfile[];
}

const PremiumManagement = ({ users }: PremiumManagementProps) => {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Count users with premium status
  const premiumCount = users.filter(
    user => user.premium_status || user.preferences?.hasPremium
  ).length;
  
  const handleCancelSubscription = async (user: UserProfile) => {
    setIsUpdating(true);
    try {
      // API call to cancel premium subscription would go here
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Premium access revoked",
        description: `Premium access has been revoked for ${user.first_name} ${user.last_name}.`,
      });
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast({
        title: "Error",
        description: "Failed to cancel premium access. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Premium Management</CardTitle>
            <CardDescription>Manage user premium subscriptions and access</CardDescription>
          </div>
          <Badge variant="outline" className="ml-2">
            {premiumCount} Premium Users
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <PremiumManagementTable 
          users={users} 
          onCancelSubscription={handleCancelSubscription}
        />
      </CardContent>
      {isUpdating && (
        <CardFooter className="bg-muted/50">
          <div className="flex items-center text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Processing changes...
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PremiumManagement;
