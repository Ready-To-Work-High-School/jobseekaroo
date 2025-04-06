
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import AccountSecurityForm from '@/components/profile/AccountSecurityForm';
import { Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import UserBadges from '@/components/badges/UserBadges';
import { useUserBadges } from '@/hooks/use-user-badges';

const Profile = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const { badges, isLoading: badgesLoading } = useUserBadges();
  
  // Check if user is CEO based on job title or company name
  const isCeo = userProfile?.job_title?.toLowerCase().includes('ceo') || 
               userProfile?.job_title?.toLowerCase().includes('chief executive') ||
               userProfile?.company_name?.toLowerCase().includes('ceo');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {user && (
          <>
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userProfile?.avatar_url || ''} alt="Profile" />
                    <AvatarFallback>
                      {userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-2xl">
                        {userProfile?.first_name} {userProfile?.last_name}
                      </CardTitle>
                      {isCeo && (
                        <Badge variant="outline" className="bg-black text-white">
                          Chief Executive Officer
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {userProfile?.job_title && !isCeo && (
                      <p className="text-sm font-medium">{userProfile.job_title}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {badgesLoading ? (
                  <p className="text-muted-foreground">Loading badges...</p>
                ) : (
                  <UserBadges badges={badges} />
                )}
              </CardContent>
            </Card>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="security">Account & Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p>{user.email}</p>
                    </div>
                    
                    {userProfile && (
                      <>
                        {userProfile.bio && (
                          <div>
                            <h3 className="font-medium">Bio</h3>
                            <p>{userProfile.bio}</p>
                          </div>
                        )}
                        
                        {userProfile.location && (
                          <div>
                            <h3 className="font-medium">Location</h3>
                            <p>{userProfile.location}</p>
                          </div>
                        )}
                        
                        {userProfile.job_title && (
                          <div>
                            <h3 className="font-medium">Job Title</h3>
                            <p>{userProfile.job_title}</p>
                            {isCeo && <p className="text-xs text-blue-600 font-semibold mt-1">Chief Executive Officer Access</p>}
                          </div>
                        )}
                        
                        {userProfile.skills && userProfile.skills.length > 0 && (
                          <div>
                            <h3 className="font-medium">Skills</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {userProfile.skills.map(skill => (
                                <span key={skill} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <AccountSecurityForm />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
