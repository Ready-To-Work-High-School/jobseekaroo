
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabase'; // Added missing Supabase import
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Bookmark, UserCircle, Briefcase, Settings, BookOpen, Plus, X } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';
import JobCard from '@/components/JobCard';
import { Job } from '@/types/job';
import { getJobById } from '@/lib/mock-data';

// Profile form schema
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  bio: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  newSkill: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const { user, userProfile, getSavedJobs, updateProfile, profileLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const animation = useFadeIn(200);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      bio: '',
      location: '',
      phone: '',
      newSkill: '',
    },
  });

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (userProfile) {
      form.reset({
        firstName: userProfile.first_name || '',
        lastName: userProfile.last_name || '',
        email: user?.email || '',
        bio: userProfile.bio || '',
        location: userProfile.location || '',
        phone: user?.user_metadata?.phone || '',
        newSkill: '',
      });
      
      setSkills(userProfile.skills || []);
    }
  }, [userProfile, user, form]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user) return;
      
      setLoadingJobs(true);
      try {
        const savedJobIds = await getSavedJobs();
        const jobDetails = savedJobIds.map(id => getJobById(id)).filter(Boolean) as Job[];
        setSavedJobs(jobDetails);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      } finally {
        setLoadingJobs(false);
      }
    };
    
    if (activeTab === 'saved-jobs') {
      fetchSavedJobs();
    }
  }, [user, getSavedJobs, activeTab]);

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    try {
      // Update profile in Supabase
      await updateProfile({
        first_name: values.firstName,
        last_name: values.lastName,
        bio: values.bio || null,
        location: values.location || null,
        skills: skills,
      });
      
      // Update user metadata
      await supabase.auth.updateUser({
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
          phone: values.phone,
        }
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  if (profileLoading) {
    return (
      <Layout>
        <div className="container max-w-4xl py-8 flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`container max-w-4xl py-8 ${animation}`}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and saved jobs
            </p>
          </div>

          <Tabs 
            defaultValue="personal" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="saved-jobs" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Saved Jobs
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details here. This information will be displayed on your profile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email address" 
                                disabled 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us a bit about yourself"
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <FormLabel>Skills</FormLabel>
                        <div className="flex flex-wrap gap-2 mt-2 mb-3">
                          {skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="gap-1">
                              {skill}
                              <button 
                                type="button" 
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-1 rounded-full hover:bg-muted p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a skill (e.g. Customer Service)"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddSkill();
                              }
                            }}
                          />
                          <Button 
                            type="button" 
                            size="sm" 
                            onClick={handleAddSkill}
                            variant="outline"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved-jobs" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Jobs</CardTitle>
                  <CardDescription>
                    Manage the jobs you've saved for later
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingJobs ? (
                    <div className="flex items-center justify-center py-10">
                      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  ) : savedJobs.length > 0 ? (
                    <div className="space-y-4">
                      {savedJobs.map((job, index) => (
                        <div key={job.id} className="bg-card shadow-sm rounded-md border p-4 hover:border-primary/30 transition-all duration-200">
                          <JobCard job={job} index={index} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Briefcase className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No saved jobs</h3>
                      <p className="text-muted-foreground mt-1 mb-4">
                        You haven't saved any jobs yet.
                      </p>
                      <Button onClick={() => navigate('/jobs')}>
                        Browse Jobs
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => navigate('/jobs')}>
                    Find More Jobs
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
