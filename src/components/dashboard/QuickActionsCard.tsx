
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ListTodo, GraduationCap, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function QuickActionsCard() {
  const { user } = useAuth();
  
  const { data: unreadCount } = useQuery({
    queryKey: ['unread-messages', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', user.id)
        .eq('is_read', false);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!user,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/messages" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
            {unreadCount ? (
              <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                {unreadCount}
              </span>
            ) : null}
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/applications" className="flex items-center">
            <ListTodo className="mr-2 h-4 w-4" />
            Track Applications
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/student-profile" className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" />
            Update Profile
          </Link>
        </Button>
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link to="/job-simulations" className="flex items-center">
            <Award className="mr-2 h-4 w-4" />
            Job Simulations
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
