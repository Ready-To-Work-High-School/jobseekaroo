
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';

export function InterviewsTab() {
  const { user } = useAuth();

  const { data: upcomingInterviews, isLoading: interviewsLoading } = useQuery({
    queryKey: ['interviews', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data: interviewsData, error: interviewsError } = await supabase
        .from('interviews')
        .select('*')
        .eq('candidate_id', user.id)
        .gte('scheduled_time', new Date().toISOString())
        .order('scheduled_time', { ascending: true })
        .limit(5);
      
      if (interviewsError) throw interviewsError;
      if (!interviewsData || interviewsData.length === 0) return [];
      
      const interviewsWithJobDetails = await Promise.all(
        interviewsData.map(async (interview) => {
          const { data: jobData } = await supabase
            .from('jobs')
            .select('title')
            .eq('id', interview.job_id)
            .single();
            
          return {
            ...interview,
            job_title: jobData?.title || 'Upcoming Interview'
          };
        })
      );
      
      return interviewsWithJobDetails;
    },
    enabled: !!user,
  });

  if (interviewsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!upcomingInterviews?.length) {
    return (
      <p className="text-center text-muted-foreground py-4">
        No upcoming interviews scheduled
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {upcomingInterviews?.map((interview) => (
        <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">{interview.job_title}</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(interview.scheduled_time), 'MMM d, yyyy - h:mm a')}
            </p>
          </div>
          {interview.meeting_link && (
            <Button size="sm" asChild>
              <a href={interview.meeting_link} target="_blank" rel="noopener noreferrer">
                Join Meeting
              </a>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
