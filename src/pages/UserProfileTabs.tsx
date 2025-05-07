
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { UserProfileTab } from '@/components/home/quiz/types';
import { 
  User, Settings, Briefcase, GraduationCap, 
  Award, BookOpen, ShieldCheck, Heart
} from 'lucide-react';

const UserProfileTabs = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  if (!user || !userProfile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              Please sign in to view your profile
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  const profileTabs: UserProfileTab[] = [
    {
      id: 'personal',
      title: 'Personal Info',
      icon: <User className="h-4 w-4" />
    },
    {
      id: 'education',
      title: 'Education',
      icon: <GraduationCap className="h-4 w-4" />
    },
    {
      id: 'experience',
      title: 'Experience',
      icon: <Briefcase className="h-4 w-4" />
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: <Award className="h-4 w-4" />
    },
    {
      id: 'career',
      title: 'Career Path',
      icon: <BookOpen className="h-4 w-4" />
    }
  ];

  // Add admin tab if user is admin
  if (userProfile.user_type === 'admin') {
    profileTabs.push({
      id: 'admin',
      title: 'Admin',
      icon: <ShieldCheck className="h-4 w-4" />
    });
  }

  // Add healthcare tab if user is in healthcare
  if (userProfile.preferences?.careerPath === 'healthcare') {
    profileTabs.push({
      id: 'healthcare',
      title: 'Healthcare',
      icon: <Heart className="h-4 w-4" />
    });
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userProfile.avatar_url || ''} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    {userProfile.first_name?.[0]}{userProfile.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">
                    {userProfile.first_name} {userProfile.last_name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {profileTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="flex items-center gap-2"
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                    <p>{userProfile.first_name} {userProfile.last_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  {userProfile.location && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p>{userProfile.location}</p>
                    </div>
                  )}
                  {userProfile.job_title && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Job Title</h3>
                      <p>{userProfile.job_title}</p>
                    </div>
                  )}
                </div>
                
                {userProfile.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">About</h3>
                    <p className="mt-1">{userProfile.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-md">
                  <p className="text-amber-800 dark:text-amber-300 text-sm">
                    No education information available. Add your education history to complete your profile.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Add Education
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-md">
                  <p className="text-amber-800 dark:text-amber-300 text-sm">
                    No work experience available. Add your work history to enhance your profile.
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Add Experience
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                {userProfile.skills && userProfile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                ) : (
                  <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-md">
                    <p className="text-amber-800 dark:text-amber-300 text-sm">
                      No skills added yet. Adding skills helps employers find you.
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Add Skills
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="career">
            <Card>
              <CardHeader>
                <CardTitle>Career Path</CardTitle>
              </CardHeader>
              <CardContent>
                {userProfile.preferences?.careerPath ? (
                  <div>
                    <h3 className="font-medium mb-2">Your Recommended Career Path:</h3>
                    <Link to="/career-quiz" className="text-blue-600 hover:underline">
                      {userProfile.preferences.careerPathTitle || userProfile.preferences.careerPath}
                    </Link>
                    <p className="mt-4">
                      Take the <Link to="/career-quiz" className="text-blue-600 hover:underline">career assessment</Link> again to update your career path recommendation.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Discover Your Career Path</h3>
                    <p className="text-muted-foreground mb-4">
                      Take our career assessment to find the perfect career path for your skills and interests.
                    </p>
                    <Button asChild>
                      <Link to="/career-quiz">Take Career Assessment</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {userProfile.user_type === 'admin' && (
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" asChild>
                        <Link to="/admin">Admin Dashboard</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/admin/users">User Management</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/admin/content">Content Management</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/admin/settings">System Settings</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
          
          {userProfile.preferences?.careerPath === 'healthcare' && (
            <TabsContent value="healthcare">
              <Card>
                <CardHeader>
                  <CardTitle>Healthcare Career Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Access specialized resources for your healthcare career path:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" asChild>
                        <Link to="/healthcare-pathways">Healthcare Pathways Program</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/certification-guide">Certification Guide</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfileTabs;
