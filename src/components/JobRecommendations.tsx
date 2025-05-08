
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import JobCardLogo from '@/components/job/JobCardLogo';
import { MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface JobRecommendationsProps {
  limit?: number;
  showReason?: boolean;
}

const JobRecommendations: React.FC<JobRecommendationsProps> = ({ limit = 5, showReason = false }) => {
  const { user } = useAuth();
  
  // Fetch job recommendations with a stable key that won't cause blinking
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['jobRecommendations', user?.id, limit],
    queryFn: async () => {
      if (!user) return [];
      
      // First get the recommendation IDs
      const { data: recommendationData, error: recommendationError } = await supabase
        .from('job_recommendations')
        .select('job_id, score, reason')
        .eq('user_id', user.id)
        .order('score', { ascending: false })
        .limit(limit);
      
      if (recommendationError) throw recommendationError;
      
      if (!recommendationData || recommendationData.length === 0) {
        return [];
      }
      
      // Then get the actual job details
      const jobIds = recommendationData.map(rec => rec.job_id);
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .in('id', jobIds);
      
      if (jobsError) throw jobsError;
      
      // Combine the data
      return recommendationData.map(rec => {
        const jobData = jobsData?.find(job => job.id === rec.job_id);
        return {
          ...jobData,
          score: rec.score,
          reason: rec.reason
        };
      }).filter(Boolean);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache to reduce blinking
    enabled: !!user
  });
  
  // Use a stable empty state that won't change during rendering
  const emptyState = useMemo(() => (
    <Card className="bg-muted/40">
      <CardContent className="p-6 text-center">
        <p className="text-muted-foreground mb-4">
          {user ? "No job recommendations available yet." : "Sign in to see personalized job recommendations."}
        </p>
        <Button asChild>
          <Link to={user ? "/jobs" : "/sign-in"}>
            {user ? "Browse All Jobs" : "Sign In"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  ), [user]);
  
  // Show a stable loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-muted animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-3 w-full bg-muted rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (!recommendations || recommendations.length === 0) {
    return emptyState;
  }
  
  return (
    <div className="space-y-4">
      {recommendations.map(job => (
        <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <Link to={`/jobs/${job.id}`} className="p-4 flex flex-col space-y-3">
              <div className="flex items-start gap-3">
                <JobCardLogo
                  logoUrl={job.logo_url}
                  companyName={job.company_name}
                  size="sm"
                />
                <div>
                  <h3 className="font-medium line-clamp-1">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company_name}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {job.location_city}, {job.location_state}
                </span>
                <span className="flex items-center">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {job.job_type}
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {job.pay_rate_min && `$${job.pay_rate_min}`}
                  {job.pay_rate_max && job.pay_rate_max !== job.pay_rate_min && ` - $${job.pay_rate_max}`}
                  {job.pay_rate_period && ` ${job.pay_rate_period}`}
                </span>
              </div>
              
              {showReason && job.reason && (
                <div className="mt-1 pt-2 border-t">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs font-normal">
                    Match: {job.reason}
                  </Badge>
                </div>
              )}
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobRecommendations;
