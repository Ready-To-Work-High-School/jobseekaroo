
import React, { useState } from 'react';
import { UserProfile } from '@/types/user';
import PremiumManagementTable from './premium/PremiumManagementTable';
import { useToast } from '@/hooks/use-toast';

interface PremiumManagementProps {
  users: UserProfile[];
}

const PremiumManagement: React.FC<PremiumManagementProps> = ({ users }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [premiumUsers, setPremiumUsers] = useState<UserProfile[]>(
    users.filter(user => user.premium_status && user.premium_status.toLowerCase() !== 'cancelled')
  );

  const handleCancelSubscription = async (user: UserProfile) => {
    setLoading(true);
    try {
      // Here you would implement the actual cancellation logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      // Update the list
      setPremiumUsers(prev => 
        prev.map(u => u.id === user.id 
          ? { ...u, premium_status: 'cancelled' } 
          : u
        )
      );
      
      toast({
        title: "Subscription Cancelled",
        description: `${user.first_name || user.email}'s subscription has been cancelled.`,
      });
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Premium Management</h2>
      <PremiumManagementTable 
        users={premiumUsers} 
        onCancelSubscription={handleCancelSubscription} 
      />
    </div>
  );
};

export default PremiumManagement;
