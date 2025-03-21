
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getJobRecommendations } from '@/lib/supabase';
import { getJobById } from '@/lib/mock-data';
import { Job } from '@/types/job';
import { JobRecommendation } from '@/types/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobRecommendationsProps {
  limit?: number;
  showReason?: boolean;
}

export default function JobRecommendations({ limit = 3, showReason = true }: JobRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<(JobRecommendation & { job?: Job })[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const recommendationsData = await getJobRecommendations(user.id);
        
        // Get the job details for each recommendation
        const recommendationsWithJobs = await Promise.all(
          recommendationsData.slice(0, limit).map(async (rec) => {
            const job = getJobById(rec.job_id);
            return { ...rec, job };
          })
        );
        
        setRecommendations(recommendationsWithJobs.filter(rec => rec.job) as (JobRecommendation & { job: Job })[]);
      } catch (error) {
        console.error('Error fetching job recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [user, limit]);

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
