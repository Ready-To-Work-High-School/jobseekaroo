
import React from 'react';
import Layout from '@/components/Layout';
import RedemptionCodeManager from '@/components/admin/RedemptionCodeManager';
import { useFadeIn } from '@/utils/animations';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const AdminRedemptionCodes: React.FC = () => {
  const fadeIn = useFadeIn(300);
  
  console.log('AdminRedemptionCodes page rendered');

  return (
    <Layout>
      <ProtectedRoute adminOnly>
        <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
          <h1 className="text-2xl font-bold mb-6">Redemption Code Management</h1>
          <RedemptionCodeManager />
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default AdminRedemptionCodes;
