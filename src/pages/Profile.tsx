
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import AccountSecurityForm from '@/components/profile/AccountSecurityForm';
import { Award, Briefcase, MapPin, Mail, Sparkles, Shield, Calendar, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import UserBadges from '@/components/badges/UserBadges';
import { useUserBadges } from '@/hooks/use-user-badges';
import JobRecommendations from '@/components/JobRecommendations';
import { Link } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import { supabase } from '@/lib/supabase';

const Profile = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const { badges, isLoading: badgesLoading } = useUserBadges();
  const [employerStats, setEmployerStats] = useState<{
    jobsPosted: number;
    hires: number;
    applications: number;
  }>({ jobsPosted: 0, hires: 0, applications: 0 });
  
  // Check if user is CEO based on job title or company name
  const isCeo = userProfile?.job_title?.toLowerCase()?.includes('ceo') || 
               userProfile?.job_title?.toLowerCase()?.includes('chief executive') ||
               userProfile?.company_name?.toLowerCase()?.includes('ceo');
  
  // Check if user is admin as well (for CEO portal access)
  const isAdmin = userProfile?.user_type === 'admin';
  const isEmployer = userProfile?.user_type === 'employer';
  const showCeoIcon = isCeo && isAdmin;

  // Calculate account age
  const accountAge = userProfile?.created_at 
    ? formatDistanceToNow(new Date(userProfile.created_at), { addSuffix: false })
    : 'Unknown';
  
  // Check if user signed up for the 2025-2026 year
  const isInceptionMember = userProfile?.created_at
    ? new Date(userProfile.created_at) >= new Date('2025-01-01') && 
      new Date(userProfile.created_at) <= new Date('2026-12-31')
    : false;
  
  useEffect(() => {
    if (user && isEmployer) {
      fetchEmployerStats();
    }
  }, [user, isEmployer]);
  
  const fetchEmployerStats = async () => {
    if (!user) return;
    
    try {
      // Get jobs posted count
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('id', { count: 'exact' })
        .eq('employer_id', user.id);
      
      if (jobsError) throw jobsError;
      
      // Get hires count
      const { data: hiresData, error: hiresError } = await supabase
        .from('job_applications')
        .select('id', { count: 'exact' })
        .eq('employer_id', user.id)
        .eq('status', 'hired');
      
      if (hiresError) throw hiresError;
      
      // Get applications count
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('job_applications')
        .select('id', { count: 'exact' })
        .eq('employer_id', user.id);
      
      if (applicationsError) throw applicationsError;
      
      setEmployerStats({
        jobsPosted: jobsData?.length || 0,
        hires: hiresData?.length || 0,
        applications: applicationsData?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching employer stats:', error);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {user && (
          <>
            <Card className="mb-6 overflow-hidden user-profile">
              <CardHeader className="relative border-b bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/30 dark:to-background pb-6">
                {/* Profile background accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-30 -ml-10 -mb-10"></div>
                
                <div className="flex items-center gap-4 relative">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-blue-100 shadow-md">
                      <AvatarImage src={userProfile?.avatar_url || ''} alt="Profile" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        {userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* CEO Shield badge on avatar */}
                    {showCeoIcon && (
                      <div className="absolute -bottom-1 -right-1">
                        <Link to="/ceo-portal">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-amber-400 p-1 border-2 border-white shadow-md">
                            <Shield className="h-3 w-3 text-white" />
                          </div>
                        </Link>
                      </div>
                    )}
                    
                    {/* Inception Member ribbon for 2025-2026 signups */}
                    {isInceptionMember && (
                      <div className="absolute -right-2 -top-2 rotate-45">
                        <div className="bg-blue-600 text-white text-[10px] py-1 px-6 shadow-md font-semibold">
                          INCEPTION
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-2xl">
                        {userProfile?.first_name} {userProfile?.last_name}
                      </CardTitle>
                      {isCeo && (
                        <Badge variant="outline" className="bg-gradient-to-r from-purple-800 via-blue-700 to-amber-600 text-white border-gray-700">
                          <Shield className="h-3 w-3 mr-1" />
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
                      
                      {userProfile?.created_at && (
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                          Member for {accountAge}
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
                
                {/* Display employer stats if user is an employer */}
                {isEmployer && (
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      Employer Statistics
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                        <p className="text-sm text-muted-foreground">Jobs Posted</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {employerStats.jobsPosted}
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                        <p className="text-sm text-muted-foreground">Hires</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {employerStats.hires}
                        </p>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
                        <p className="text-sm text-muted-foreground">Applications</p>
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                          {employerStats.applications}
                        </p>
                      </div>
                    </div>
                  </div>
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
                        
                        {userProfile?.created_at && (
                          <div>
                            <h3 className="font-medium">Account Information</h3>
                            <div className="mt-1 text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Joined: {format(new Date(userProfile.created_at), 'MMMM d, yyyy')}</span>
                              </div>
                              {isInceptionMember && (
                                <div className="flex items-center gap-2 mt-1">
                                  <Award className="h-4 w-4 text-blue-500" />
                                  <span className="text-blue-600 font-medium">2025-2026 Inception Member</span>
                                </div>
                              )}
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
