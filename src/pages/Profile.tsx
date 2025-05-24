
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import AccountSecurityForm from '@/components/profile/AccountSecurityForm';
import { useUserBadges } from '@/hooks/use-user-badges';
import JobRecommendations from '@/components/JobRecommendations';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileContent from '@/components/profile/ProfileContent';
import ProfileBioSection from '@/components/profile/ProfileBioSection';
import { useProfileStatus } from '@/hooks/useProfileStatus';
import { useEmployerStats } from '@/hooks/useEmployerStats';

const Profile = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const { badges, isLoading: badgesLoading } = useUserBadges();
  
  // Use custom hooks to get user status and employer stats
  const { 
    isCeo, 
    isAdmin, 
    isEmployer, 
    showCeoIcon, 
    accountAge, 
    isInceptionMember 
  } = useProfileStatus(userProfile);
  
  const { data: employerStatsData } = useEmployerStats(user?.id);
  const employerStats = employerStatsData?.stats;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {user && (
          <>
            <Card className="mb-6 overflow-hidden user-profile">
              <CardHeader className="relative border-b bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/30 dark:to-background pb-6">
                <ProfileHeader 
                  user={user}
                  userProfile={userProfile}
                  isCeo={isCeo}
                  showCeoIcon={showCeoIcon}
                  isInceptionMember={isInceptionMember}
                  accountAge={accountAge}
                />
              </CardHeader>
              <CardContent className="pt-6">
                <ProfileContent 
                  userProfile={userProfile}
                  badges={badges}
                  badgesLoading={badgesLoading}
                  isInceptionMember={isInceptionMember}
                  isEmployer={isEmployer}
                  employerStats={employerStats}
                />
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile Information</TabsTrigger>
                    <TabsTrigger value="security">Account & Security</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile">
                    <Card>
                      <CardContent className="space-y-4 pt-6">
                        <ProfileBioSection 
                          userProfile={userProfile}
                          isInceptionMember={isInceptionMember}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <AccountSecurityForm />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="lg:col-span-1">
                <JobRecommendations limit={3} showReason={true} />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
