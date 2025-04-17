
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getJobRecommendations } from '@/lib/supabase/recommendations';
import { getJobById } from '@/lib/supabase';
import { Job } from '@/types/job';
import { JobRecommendation } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface JobRecommendationsProps {
  limit?: number;
  showReason?: boolean;
}

export default function JobRecommendations({ limit = 3, showReason = true }: JobRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<(JobRecommendation & { job?: Job })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch recommendations from Supabase
        const recommendationsData = await getJobRecommendations(user.id);
        
        if (recommendationsData.length === 0) {
          console.log('No recommendations found for user:', user.id);
        } else {
          console.log(`Found ${recommendationsData.length} recommendations for user:`, user.id);
        }
        
        // Get the job details for each recommendation
        const recommendationsWithJobs = await Promise.all(
          recommendationsData.slice(0, limit).map(async (rec) => {
            try {
              const job = await getJobById(rec.job_id);
              // Validate that the job object has the required properties
              if (job && job.company && job.company.name) {
                return { ...rec, job };
              } else {
                console.warn(`Skipping incomplete job data for job_id: ${rec.job_id}`);
                return { ...rec, job: undefined };
              }
            } catch (err) {
              console.error(`Error fetching job ${rec.job_id}:`, err);
              return { ...rec, job: undefined };
            }
          })
        );
        
        // Filter out any recommendations where we couldn't find the job
        const validRecommendations = recommendationsWithJobs.filter(rec => rec.job) as (JobRecommendation & { job: Job })[];
        
        if (validRecommendations.length === 0 && recommendationsData.length > 0) {
          console.warn('Could not find job details for any recommendations');
          toast({
            title: "Job data issue",
            description: "Could not load job details for your recommendations",
            variant: "destructive",
          });
        }
        
        setRecommendations(validRecommendations);
      } catch (error) {
        console.error('Error fetching job recommendations:', error);
        setError('Failed to load job recommendations');
        toast({
          title: "Error",
          description: "Failed to load job recommendations",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [user, limit, toast]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Recommended Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Recommended Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6 text-destructive gap-2">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Recommended Jobs
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="text-muted-foreground">No job recommendations found for your profile.</p>
          <div className="mt-4">
            <Link to="/jobs">
              <Button variant="outline">Browse All Jobs</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Recommended Jobs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          rec.job && (
            <div key={rec.id} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{rec.job.title}</h3>
                  <p className="text-sm text-muted-foreground">{rec.job.company.name}</p>
                  {showReason && rec.reason && (
                    <p className="text-sm mt-2 text-muted-foreground">
                      <Badge variant="secondary" className="mr-2">Match</Badge>
                      {rec.reason}
                    </p>
                  )}
                </div>
                <Link to={`/jobs/${rec.job.id}`}>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )
        ))}
        
        <div className="pt-2">
          <Link to="/jobs">
            <Button variant="outline" className="w-full">
              See All Recommended Jobs
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
