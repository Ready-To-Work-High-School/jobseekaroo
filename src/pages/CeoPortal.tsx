
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Shield, Users, Key, Award, CalendarClock, BadgeCheck, Sparkles } from 'lucide-react';
import CeoHeader from '@/components/ceo/CeoHeader';
import UserPrivilegesManager from '@/components/ceo/UserPrivilegesManager';
import RedemptionCodesManager from '@/components/ceo/RedemptionCodesManager';
import FreeTrialManager from '@/components/ceo/FreeTrialManager';
import { useCeoStatus } from '@/components/admin/redemption/tab-manager/useCeoStatus';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AdminAccessRestrictedScreen from '@/components/ceo/AdminAccessRestrictedScreen';

const CeoPortal: React.FC = () => {
  const fadeIn = useFadeIn(300);
  const [activeTab, setActiveTab] = useState('overview');
  const { isCeo } = useCeoStatus();
  const navigate = useNavigate();
  
  // If user is not a CEO, show restricted access screen
  if (!isCeo) {
    return <AdminAccessRestrictedScreen />;
  }

  return (
    <Layout>
      <ProtectedRoute adminOnly>
        <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
          <CeoHeader />
          
          <Alert className="mb-6 bg-gradient-to-r from-purple-50 via-blue-50 to-amber-50 border-l-4 border-gradient-to-r from-purple-500 via-blue-500 to-amber-500">
            <Shield className="h-5 w-5" />
            <AlertTitle>CEO Portal Access Granted</AlertTitle>
            <AlertDescription>
              You have full administrative privileges including user management, code generation, and system settings.
            </AlertDescription>
          </Alert>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-1 md:grid-cols-4 h-auto">
              <TabsTrigger value="overview" className="flex gap-2 items-center">
                <Crown className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="users" className="flex gap-2 items-center">
                <Users className="h-4 w-4" /> User Privileges
              </TabsTrigger>
              <TabsTrigger value="codes" className="flex gap-2 items-center">
                <Key className="h-4 w-4" /> Redemption Codes
              </TabsTrigger>
              <TabsTrigger value="trials" className="flex gap-2 items-center">
                <Award className="h-4 w-4" /> Free Trials
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Crown className="h-5 w-5 text-amber-500" />
                      CEO Authority Dashboard
                    </CardTitle>
                    <CardDescription>
                      Manage all aspects of the platform with full administrative privileges
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          className="flex justify-start items-center gap-2"
                          onClick={() => setActiveTab('users')}
                        >
                          <Users className="h-4 w-4" />
                          Manage User Privileges
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex justify-start items-center gap-2"
                          onClick={() => setActiveTab('codes')}
                        >
                          <Key className="h-4 w-4" />
                          Manage Redemption Codes
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex justify-start items-center gap-2"
                          onClick={() => setActiveTab('trials')}
                        >
                          <Award className="h-4 w-4" />
                          Configure Free Trials
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="flex justify-start items-center gap-2"
                          onClick={() => navigate('/admin/premium')}
                        >
                          <Sparkles className="h-4 w-4" />
                          Premium Management
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="rounded-lg border p-4 bg-background/50">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <CalendarClock className="h-4 w-4" /> System Status
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Active Users:</span>
                            <span className="font-medium">2,453</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pending Requests:</span>
                            <span className="font-medium">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">System Status:</span>
                            <span className="font-medium flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span> 
                              Operational
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5 text-blue-500" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>
                      Perform common administrative tasks
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <Button 
                          onClick={() => navigate('/admin/users')}
                          variant="outline" 
                          className="flex justify-start items-center gap-2"
                        >
                          <Users className="h-4 w-4" />
                          User Management
                        </Button>
                        
                        <Button 
                          onClick={() => navigate('/admin/redemption-codes')}
                          variant="outline" 
                          className="flex justify-start items-center gap-2"
                        >
                          <Key className="h-4 w-4" />
                          Redemption Codes
                        </Button>
                        
                        <Button 
                          onClick={() => navigate('/admin/dashboard')}
                          variant="outline" 
                          className="flex justify-start items-center gap-2"
                        >
                          <Shield className="h-4 w-4" />
                          Admin Dashboard
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <UserPrivilegesManager />
            </TabsContent>
            
            <TabsContent value="codes">
              <RedemptionCodesManager />
            </TabsContent>
            
            <TabsContent value="trials">
              <FreeTrialManager />
            </TabsContent>
          </Tabs>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default CeoPortal;
