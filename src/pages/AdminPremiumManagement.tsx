
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Separator } from '@/components/ui/separator';
import { Shield, Sparkles } from 'lucide-react';
import PremiumManagement from '@/components/admin/PremiumManagement';
import { useCeoStatus } from '@/components/admin/redemption/tab-manager/useCeoStatus';
import { Card, CardContent } from '@/components/ui/card';

const AdminPremiumManagement: React.FC = () => {
  const fadeIn = useFadeIn(300);
  const { isCeo } = useCeoStatus();
  
  return (
    <Layout>
      <ProtectedRoute adminOnly>
        <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
          <div className="flex items-center mb-2">
            <Shield className="h-5 w-5 text-primary mr-2" />
            <h1 className="text-2xl font-bold">Premium Management</h1>
          </div>
          <div className="flex items-center mb-6">
            <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
            <p className="text-muted-foreground">
              Administer premium privileges and view user subscription status
            </p>
          </div>
          <Separator className="mb-6" />
          
          {!isCeo ? (
            <Card>
              <CardContent className="flex items-center justify-center py-6 text-muted-foreground">
                <p>You need CEO privileges to manage premium subscriptions.</p>
              </CardContent>
            </Card>
          ) : (
            <PremiumManagement />
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default AdminPremiumManagement;
