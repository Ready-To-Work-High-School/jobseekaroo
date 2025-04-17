
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import AccountSecurityForm from '@/components/profile/AccountSecurityForm';
import { Award, Briefcase, MapPin, Mail, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import UserBadges from '@/components/badges/UserBadges';
import { useUserBadges } from '@/hooks/use-user-badges';
import JobRecommendations from '@/components/JobRecommendations';

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
            <Card className="mb-6 overflow-hidden">
              <CardHeader className="relative border-b bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/30 dark:to-background pb-6">
                {/* Profile background accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-30 -ml-10 -mb-10"></div>
                
                <div className="flex items-center gap-4 relative">
                  <Avatar className="h-16 w-16 border-2 border-blue-100 shadow-md">
                    <AvatarImage src={userProfile?.avatar_url || ''} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-2xl">
                        {userProfile?.first_name} {userProfile?.last_name}
                      </CardTitle>
                      {isCeo && (
                        <Badge variant="outline" className="bg-black text-white border-gray-700">
                          Chief Executive Officer
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                        {user.email}
                      </span>
                      
                      {userProfile?.job_title && !isCeo && (
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Briefcase className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                          {userProfile.job_title}
                        </span>
                      )}
                      
                      {userProfile?.location && (
                        <span className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                          {userProfile.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {badgesLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                    <Award className="h-5 w-5 text-amber-500/50" />
                    <p>Loading badges...</p>
                  </div>
                ) : (
                  <UserBadges badges={badges} className="mt-0" />
                )}
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
                        {userProfile?.bio && (
                          <div>
                            <h3 className="font-medium">Bio</h3>
                            <p className="mt-1 text-muted-foreground">{userProfile.bio}</p>
                          </div>
                        )}
                        
                        {userProfile?.skills && userProfile.skills.length > 0 && (
                          <div>
                            <h3 className="font-medium">Skills</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {userProfile.skills.map(skill => (
                                <Badge 
                                  key={skill} 
                                  variant="outline" 
                                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <AccountSecurityForm />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="lg:col-span-1">
                <JobRecommendations limit={5} showReason={true} />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
