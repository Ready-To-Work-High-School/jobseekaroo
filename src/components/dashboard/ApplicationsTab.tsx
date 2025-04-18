
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';

export function ApplicationsTab() {
  const { user } = useAuth();

  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['applications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (applicationsLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!applications?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          You haven't applied to any jobs yet
        </p>
        <Button asChild>
          <Link to="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications?.slice(0, 5).map((app) => (
        <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">{app.job_title}</h3>
            <p className="text-sm text-muted-foreground">{app.company}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{format(new Date(app.applied_date), 'MMM d, yyyy')}</span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/applications">View</Link>
            </Button>
          </div>
        </div>
      ))}
      {(applications?.length || 0) > 5 && (
        <Button variant="link" asChild className="w-full">
          <Link to="/applications">View All Applications</Link>
        </Button>
      )}
    </div>
  );
}
