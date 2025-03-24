
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SkillsAnalytics from '@/components/dashboard/SkillsAnalytics';
import SkillMatchJobCard from '@/components/dashboard/SkillMatchJobCard';
import { SkillsProvider } from '@/contexts/SkillsContext';
import { getSkillBasedJobRecommendations } from '@/lib/supabase/skill-matching';
import { Job } from '@/types/job';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Briefcase, LineChart, ChevronRight, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const fadeInAnimation = useFadeIn(200);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [skillBasedJobs, setSkillBasedJobs] = useState<Array<Job & { matchScore: number; matchedSkills: string[] }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }

    const loadSkillBasedRecommendations = async () => {
      try {
        setIsLoading(true);
        const recommendations = await getSkillBasedJobRecommendations(user.id);
        
        // Add validation to ensure we only set valid job recommendations
        const validRecommendations = recommendations.filter(job => 
          job && job.id && job.company && job.company.name
        );
        
        if (validRecommendations.length !== recommendations.length) {
          console.warn(`Filtered out ${recommendations.length - validRecommendations.length} invalid job recommendations`);
        }
        
        setSkillBasedJobs(validRecommendations);
      } catch (error) {
        console.error('Error loading skill based recommendations:', error);
        toast({
          title: 'Error',
          description: 'Failed to load job recommendations based on your skills',
          variant: 'destructive',
        });
        // Set empty array on error to prevent rendering with invalid data
        setSkillBasedJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadSkillBasedRecommendations();
  }, [user, navigate, toast]);

  if (!user) return null;

  return (
    <Layout>
      <div className={`container py-8 ${fadeInAnimation}`}>
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Application Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-lg text-center">
                  <h3 className="text-3xl font-bold">0</h3>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg text-center">
                  <h3 className="text-3xl font-bold">0</h3>
                  <p className="text-sm text-muted-foreground">Interviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <SkillsProvider>
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-6 text-muted-foreground">
                  No recent activity to display
                </p>
              </CardContent>
            </Card>
          </SkillsProvider>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="skill-match">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="skill-match" className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    Skill Match
                  </TabsTrigger>
                  <TabsTrigger value="saved" className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    Saved
                  </TabsTrigger>
                </TabsList>
                <button 
                  className="text-sm text-primary flex items-center"
                  onClick={() => navigate('/jobs')}
                >
                  View all jobs
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              
              <TabsContent value="skill-match">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : skillBasedJobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillBasedJobs.map((job) => (
                      <SkillMatchJobCard 
                        key={job.id}
                        job={job}
                        matchScore={job.matchScore}
                        matchedSkills={job.matchedSkills}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-muted/40 rounded-lg">
                    <p className="text-muted-foreground">No skill-matched jobs found</p>
                    <p className="text-sm mt-2">
                      Add more skills to your profile to get better job recommendations
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="saved">
                <div className="text-center py-8 bg-muted/40 rounded-lg">
                  <p className="text-muted-foreground">No saved jobs</p>
                  <p className="text-sm mt-2">
                    Browse jobs and save the ones you're interested in
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <SkillsProvider>
              <SkillsAnalytics />
            </SkillsProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
