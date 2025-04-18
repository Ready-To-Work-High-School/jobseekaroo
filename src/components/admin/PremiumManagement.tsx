
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCeoStatus } from '@/components/admin/redemption/tab-manager/useCeoStatus';
import PremiumManagementHeader from './premium/PremiumManagementHeader';
import PremiumManagementTable from './premium/PremiumManagementTable';
import { usePremiumManagement } from './premium/usePremiumManagement';

const PremiumManagement = () => {
  const { isCeo } = useCeoStatus();
  const { users, loading, fetchUsers, grantPremiumAccess, revokePremiumAccess } = usePremiumManagement();
  
  if (!isCeo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Premium Management</CardTitle>
          <CardDescription>Manage premium privileges for users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            <AlertCircle className="mr-2 h-5 w-5" />
            <p>You need CEO privileges to access this section.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <PremiumManagementHeader loading={loading} onRefresh={fetchUsers} />
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <PremiumManagementTable
            users={users}
            onGrantAccess={grantPremiumAccess}
            onRevokeAccess={revokePremiumAccess}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PremiumManagement;
