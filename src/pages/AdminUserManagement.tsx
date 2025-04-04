
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import UserManagementContainer from '@/components/admin/users/UserManagementContainer';
import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';

const AdminUserManagement: React.FC = () => {
  const fadeIn = useFadeIn(300);
  
  console.log('AdminUserManagement page rendered');

  return (
    <Layout>
      <ProtectedRoute adminOnly>
        <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
          <div className="flex items-center mb-2">
            <Shield className="h-5 w-5 text-primary mr-2" />
            <h1 className="text-2xl font-bold">User Management</h1>
          </div>
          <p className="text-muted-foreground mb-6">
            View, filter, and manage user accounts on the platform
          </p>
          <Separator className="mb-6" />
          
          <UserManagementContainer />
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default AdminUserManagement;
