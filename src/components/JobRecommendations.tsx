
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { getJobRecommendations } from '@/lib/supabase/recommendations';
import { getJobById } from '@/lib/supabase/jobs';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';

interface JobRecommendationsProps {
  limit?: number;
  showReason?: boolean;
}

const JobRecommendations = ({ limit = 3, showReason = false }: JobRecommendationsProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Array<Job & { reason?: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        const recommendations = await getJobRecommendations(user.id);
        console.info(`Found ${recommendations.length} recommendations for user: ${user.id}`);
        
        if (recommendations.length === 0) {
          setJobs([]);
          setIsLoading(false);
          return;
        }
        
        // Limit the number of recommendations to process
        const limitedRecommendations = recommendations.slice(0, limit);
        
        // Fetch job details for each recommendation
        const jobDetailsPromises = limitedRecommendations.map(async (rec) => {
          try {
            const jobDetails = await getJobById(rec.job_id);
            if (jobDetails) {
              return {
                ...jobDetails,
                reason: rec.reason || "Based on your profile"
              };
            }
            console.warning(`Skipping incomplete job data for job_id: ${rec.job_id}`);
            return null;
          } catch (error) {
            console.error(`Error fetching job by id: ${error}`);
            return null;
          }
        });
        
        // Filter out null results
        const jobResults = (await Promise.all(jobDetailsPromises)).filter(Boolean) as Array<Job & { reason?: string }>;
        
        if (jobResults.length === 0) {
          console.warning('Could not find job details for any recommendations');
          setError('Unable to load job recommendations at this time.');
        } else {
          setJobs(jobResults);
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Unable to load recommendations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [user, limit]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recommended Jobs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recommended Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button asChild variant="outline">
            <Link to="/jobs">Browse All Jobs</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Job Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Sign in to see personalized job recommendations.</p>
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (jobs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recommended Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            We don't have any job recommendations for you yet. 
            Complete your profile to get personalized recommendations.
          </p>
          <Button asChild variant="outline">
            <Link to="/jobs">Browse Jobs</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recommended Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="border-b pb-3 last:border-0">
            <Link to={`/jobs/${job.id}`} className="text-lg font-medium hover:underline">
              {job.title}
            </Link>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span>{job.company.name}</span>
              {job.location?.city && (
                <>
                  <span className="mx-1">•</span>
                  <span>{job.location.city}, {job.location.state}</span>
                </>
              )}
            </div>
            {showReason && job.reason && (
              <Badge variant="outline" className="mt-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
                {job.reason}
              </Badge>
            )}
          </div>
        ))}
        <Button asChild className="w-full" variant="outline">
          <Link to="/jobs" className="flex items-center justify-center">
            View More Jobs
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobRecommendations;
