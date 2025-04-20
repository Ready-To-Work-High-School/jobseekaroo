
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, GraduationCap, Briefcase, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import ProfileForm from '@/components/profile/ProfileForm';
import EnhancedSeparator from '@/components/shared/EnhancedSeparator';

const StudentProfile = () => {
  const { user, userProfile } = useAuth();

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="animate-fade-in user-profile">
          <Card className="overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-blue-600">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="absolute -bottom-12 left-6">
                <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-purple-500/20 animate-scale-in">
                  <AvatarImage src={userProfile.avatar_url || ''} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-xl">
                    {userProfile.first_name?.[0]}{userProfile.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <div className="pt-16 px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                    {userProfile.first_name} {userProfile.last_name}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <GraduationCap className="h-4 w-4 text-purple-500" />
                    <span>Student</span>
                    {userProfile.location && (
                      <>
                        <span>•</span>
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{userProfile.location}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all duration-300">
                  Edit Profile
                </Button>
              </div>

              {userProfile.bio && (
                <p className="mt-4 text-muted-foreground">
                  {userProfile.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {userProfile.skills?.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-colors animate-fade-in"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <EnhancedSeparator />

        <div className="animate-fade-in">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <ProfileForm 
                user={user}
                userProfile={userProfile}
                isEditing={false}
              />
            </TabsContent>

            <TabsContent value="education">
              <Card className="p-6 transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-purple-500" />
                  <h2 className="text-xl font-semibold">Education & Certifications</h2>
                </div>
                <p className="text-muted-foreground">
                  Add your education history and certifications to showcase your qualifications.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card className="p-6 transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-blue-500" />
                  <h2 className="text-xl font-semibold">Work Experience</h2>
                </div>
                <p className="text-muted-foreground">
                  Add your work experience and internships to highlight your skills.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
