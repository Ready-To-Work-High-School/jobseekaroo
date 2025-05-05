import React from 'react';
import Layout from '@/components/Layout';
import { useParams } from 'react-router-dom';
import { useFadeIn } from '@/utils/animations';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth';
import StudentProfileCard from '@/components/students/StudentProfileCard';
import { getUserProfile } from '@/lib/supabase/profile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import StudentBadges from '@/components/students/badges/StudentBadges';
import { getUserSimulationCredentials } from '@/lib/supabase/simulations';

const StudentProfile = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userProfile?.first_name || '',
    lastName: userProfile?.last_name || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
  });

  // Fetch user credentials/certificates
  const { data: credentials } = useQuery({
    queryKey: ['userCredentials', user?.id],
    queryFn: () => user ? getUserSimulationCredentials(user.id) : Promise.resolve([]),
    enabled: !!user,
  });

  if (!user || !userProfile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              Please sign in to view your profile
            </p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate('/sign-in')}>Sign In</Button>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleSave = async () => {
    try {
      await updateProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        bio: formData.bio,
        location: formData.location,
      });
      
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
        <div className="user-profile">
          <Card className="overflow-hidden">
            <div className="relative h-32 bg-gradient-to-r from-purple-500 via-blue-500 to-blue-600">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="absolute -bottom-12 left-6">
                <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-purple-500/20">
                  <AvatarImage src={userProfile.avatar_url || ''} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white text-xl">
                    {userProfile.first_name?.[0]}{userProfile.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              {!editMode && (
                <div className="absolute top-4 right-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/90"
                    onClick={() => setEditMode(true)}
                  >
                    <PenLine className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
            
            <div className="pt-16 px-6 pb-6">
              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-2 border rounded-md"
                    ></textarea>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
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
                  </div>

                  {userProfile.bio && (
                    <p className="mt-4 text-muted-foreground">
                      {userProfile.bio}
                    </p>
                  )}

                  {userProfile.skills && userProfile.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {userProfile.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="bg-purple-500/10 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>

        <Separator />

        <div className="animate-fade-in">
          <Tabs defaultValue="credentials" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="credentials" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-500" />
                    <CardTitle>Earned Credentials</CardTitle>
                  </div>
                  <CardDescription>
                    Certificates and badges earned through job simulations and courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {credentials && credentials.length > 0 ? (
                    <div className="space-y-4">
                      {credentials.map((credential) => (
                        <div key={credential.id} className="border rounded-md p-4 hover:bg-slate-50">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-blue-100">
                                <Award className="h-5 w-5 text-blue-700" />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  {credential.job_simulations?.title || 'Job Simulation Certificate'}
                                </h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>Issued on {format(new Date(credential.issue_date), 'MMM dd, yyyy')}</span>
                                </p>
                              </div>
                            </div>
                            <Badge variant="outline">
                              #{credential.certificate_id.split('-')[1]}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                        <Award className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Credentials Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Complete job simulations to earn certificates that showcase your skills.
                      </p>
                      <Button onClick={() => navigate('/job-simulations')}>
                        Start a Simulation
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-500" />
                    <CardTitle>Education</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium">Westside High School</h3>
                    <p className="text-sm text-muted-foreground">Class of 2024</p>
                    <p className="text-sm mt-2">Business & Innovation Academy</p>
                  </div>
                  <Button variant="ghost" className="mt-4 w-full">
                    <PenLine className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-500" />
                    <CardTitle>Work Experience</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                      <Briefcase className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Experience Added Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Add your work experience, internships, and volunteer positions.
                    </p>
                    <Button variant="outline">
                      <PenLine className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
