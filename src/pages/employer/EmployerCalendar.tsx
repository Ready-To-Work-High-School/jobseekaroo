
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeIn } from '@/utils/animations';
import { Calendar, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EmployerCalendar = () => {
  const fadeIn = useFadeIn(300);
  const { userProfile } = useAuth();
  
  // Check if user has premium membership
  const hasPremium = userProfile?.preferences?.hasPremium === true;
  
  // If not premium, show upgrade prompt
  if (!hasPremium) {
    return (
      <Layout>
        <div className={`container mx-auto px-4 py-6 ${fadeIn}`}>
          <h1 className="text-3xl font-bold mb-6">Recruitment Calendar</h1>
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-100 dark:border-amber-900/50">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span>Premium Feature</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-amber-500" />
                <h3 className="text-lg font-medium mb-2">Calendar is a Premium Feature</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Unlock our interview scheduling and event management calendar by upgrading to our premium plan.
                </p>
                <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                  <Link to="/employer-premium">Upgrade to Premium</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  // Regular content for premium users
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
