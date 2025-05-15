
import React, { useEffect } from 'react';
import { usePremiumManagement } from './premium/usePremiumManagement';
import PremiumManagementTable from './premium/PremiumManagementTable';
import { UserProfile } from '@/types/user';
import LoadingSpinner from '@/components/ui/loading-spinner';

const PremiumManagement = () => {
  const { premiumUsers, loading, fetchPremiumUsers, cancelSubscription } = usePremiumManagement();

  useEffect(() => {
    fetchPremiumUsers();
  }, [fetchPremiumUsers]);

  const handleCancelSubscription = async (user: UserProfile) => {
    if (!user.premium_status) return;
    
    try {
      await cancelSubscription(user.premium_status);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Premium Users Management</h1>
      <PremiumManagementTable
        users={premiumUsers}
        onCancelSubscription={handleCancelSubscription}
      />
    </div>
  );
};

export default PremiumManagement;
