
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getJobRecommendations, getJobById } from '@/lib/supabase';
import { Job } from '@/types/job';
import { JobRecommendation } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight, AlertTriangle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorMessage from './ui/ErrorMessage';

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
            return { ...rec, job };
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
    } catch (error: any) {
      console.error('Error fetching job recommendations:', error);
      setError(error.message || 'Failed to load job recommendations');
      toast({
        title: "Error",
        description: "Failed to load job recommendations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          <LoadingSpinner className="py-6" />
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
          <ErrorMessage message={error} />
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={fetchRecommendations}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null;
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
