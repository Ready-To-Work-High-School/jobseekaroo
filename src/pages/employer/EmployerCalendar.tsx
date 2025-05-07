
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeIn } from '@/utils/animations';
import { Calendar, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CalendlyEmbed from '@/components/calendly/CalendlyEmbed';

interface CalendlyOrganizationMembership {
  resource: {
    uri: string;
    organization: string;
    user: string;
    role: string;
  };
}

interface CalendlyResponse {
  collection: CalendlyOrganizationMembership[];
  pagination: {
    count: number;
    next_page: string | null;
    previous_page: string | null;
    next_page_token: string | null;
    previous_page_token: string | null;
  };
}

const EmployerCalendar = () => {
  const fadeIn = useFadeIn(300);
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [calendlyMemberships, setCalendlyMemberships] = useState<CalendlyOrganizationMembership[]>([]);
  
  // Check if user has premium membership
  const hasPremium = userProfile?.preferences?.hasPremium === true;
  
  useEffect(() => {
    const fetchCalendlyOrgMemberships = async () => {
      if (!hasPremium) return;
      
      try {
        setIsLoading(true);
        // This would be replaced with actual API call if we had Calendly API token
        // Example of how the actual API call would look:
        // 
        // const response = await fetch('https://api.calendly.com/organization_memberships?user=https://api.calendly.com/users/ABC123XYZ789', {
        //   headers: {
        //     'Authorization': `Bearer ${calendlyToken}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // const data: CalendlyResponse = await response.json();
        // setCalendlyMemberships(data.collection);

        // For demo purposes, we'll use mock data
        setTimeout(() => {
          const mockData = {
            collection: [
              {
                resource: {
                  uri: "https://api.calendly.com/organization_memberships/123",
                  organization: "https://api.calendly.com/organizations/456",
                  user: "https://api.calendly.com/users/ABC123XYZ789",
                  role: "owner"
                }
              }
            ],
            pagination: {
              count: 1,
              next_page: null,
              previous_page: null,
              next_page_token: null,
              previous_page_token: null
            }
          };
          
          setCalendlyMemberships(mockData.collection);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch Calendly organization memberships:', error);
        toast({
          title: "Error",
          description: "Failed to load Calendly data. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    fetchCalendlyOrgMemberships();
  }, [hasPremium, toast]);
  
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
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Interview Calendar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
              </div>
            ) : (
              <div className="min-h-[400px]">
                <CalendlyEmbed />
                {calendlyMemberships.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Connected Calendly Account</p>
                    <div className="bg-muted/20 p-3 rounded text-sm">
                      <p>Organization Role: {calendlyMemberships[0].resource.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        API Reference: /organization_memberships?user=https://api.calendly.com/users/ABC123XYZ789
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>Premium Calendar Features</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-1">Auto-scheduling</h3>
              <p className="text-sm text-muted-foreground">Schedule interviews based on candidate and interviewer availability</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-1">Event Management</h3>
              <p className="text-sm text-muted-foreground">Plan recruitment events, job fairs, and open houses</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-1">Reminders</h3>
              <p className="text-sm text-muted-foreground">Automated SMS and email reminders for scheduled interviews</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-1">Calendar Sync</h3>
              <p className="text-sm text-muted-foreground">Sync with Google, Microsoft, or Apple calendar</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmployerCalendar;
