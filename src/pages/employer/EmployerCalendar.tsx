
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeIn } from '@/utils/animations';
import { Calendar } from 'lucide-react';

const EmployerCalendar = () => {
  const fadeIn = useFadeIn(300);
  
  return (
    <Layout>
      <div className={`container mx-auto px-4 py-6 ${fadeIn}`}>
        <h1 className="text-3xl font-bold mb-6">Recruitment Calendar</h1>
        <p className="text-muted-foreground mb-6">
          Schedule interviews, events, and manage your recruitment timeline
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Interview Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Calendar Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto mt-2">
                Our interview scheduling and event management calendar will be available soon. This feature will help you organize and manage your recruitment timeline effectively.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployerCalendar;
