
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFadeIn } from '@/utils/animations';
import { Calendar, Sparkles, Loader2, CalendarDays } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CalendlyEmbed from '@/components/calendly/CalendlyEmbed';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface CalendlyOrganizationMembership {
  resource: {
    uri: string;
    organization: string;
    user: string;
    role: string;
  };
}

interface CalendlyEventType {
  resource: {
    uri: string;
    name: string;
    description: string | null;
    duration: number;
    slug: string;
    color: string;
    active: boolean;
    scheduling_url: string;
    profile: {
      name: string;
      owner: string;
      type: string;
    };
  };
}

interface CalendlyMembershipsResponse {
  collection: CalendlyOrganizationMembership[];
  pagination: {
    count: number;
    next_page: string | null;
    previous_page: string | null;
    next_page_token: string | null;
    previous_page_token: string | null;
  };
}

interface CalendlyEventTypesResponse {
  collection: CalendlyEventType[];
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
  const [activeTab, setActiveTab] = useState('calendar');
  const [calendlyMemberships, setCalendlyMemberships] = useState<CalendlyOrganizationMembership[]>([]);
  const [eventTypes, setEventTypes] = useState<CalendlyEventType[]>([]);
  
  // Check if user has premium membership
  const hasPremium = userProfile?.preferences?.hasPremium === true;
  
  useEffect(() => {
    const fetchCalendlyData = async () => {
      if (!hasPremium) return;
      
      try {
        setIsLoading(true);
        
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          // Mock organization memberships
          const mockMembershipsData = {
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
          
          // Mock event types
          const mockEventTypesData = {
            collection: [
              {
                resource: {
                  uri: "https://api.calendly.com/event_types/ABCDEF123456",
                  name: "Initial Interview",
                  description: "30-minute initial interview with candidate",
                  duration: 30,
                  slug: "initial-interview",
                  color: "#0056b3",
                  active: true,
                  scheduling_url: "https://calendly.com/johndoe/initial-interview",
                  profile: {
                    name: "John Doe",
                    owner: "https://api.calendly.com/users/ABC123XYZ789",
                    type: "User"
                  }
                }
              },
              {
                resource: {
                  uri: "https://api.calendly.com/event_types/GHIJKL789012",
                  name: "Technical Assessment",
                  description: "60-minute technical assessment interview",
                  duration: 60,
                  slug: "technical-assessment",
                  color: "#28a745",
                  active: true,
                  scheduling_url: "https://calendly.com/johndoe/technical-assessment",
                  profile: {
                    name: "John Doe",
                    owner: "https://api.calendly.com/users/ABC123XYZ789",
                    type: "User"
                  }
                }
              },
              {
                resource: {
                  uri: "https://api.calendly.com/event_types/MNOPQR345678",
                  name: "Final Interview",
                  description: "45-minute final interview with hiring manager",
                  duration: 45,
                  slug: "final-interview",
                  color: "#dc3545",
                  active: true,
                  scheduling_url: "https://calendly.com/johndoe/final-interview",
                  profile: {
                    name: "John Doe",
                    owner: "https://api.calendly.com/users/ABC123XYZ789",
                    type: "User"
                  }
                }
              }
            ],
            pagination: {
              count: 3,
              next_page: null,
              previous_page: null,
              next_page_token: null,
              previous_page_token: null
            }
          };
          
          setCalendlyMemberships(mockMembershipsData.collection);
          setEventTypes(mockEventTypesData.collection);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch Calendly data:', error);
        toast({
          title: "Error",
          description: "Failed to load Calendly data. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    fetchCalendlyData();
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
        
        <Tabs 
          defaultValue="calendar" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-6"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="event-types" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Event Types</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6">
            <Card>
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
          </TabsContent>
          
          <TabsContent value="event-types" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  <span>Meeting Types</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                  </div>
                ) : (
                  <div>
                    {eventTypes.length > 0 ? (
                      <>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                          {eventTypes.map((eventType) => (
                            <div 
                              key={eventType.resource.uri} 
                              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div 
                                className="w-3 h-3 rounded-full mb-2" 
                                style={{ backgroundColor: eventType.resource.color }} 
                              />
                              <h3 className="font-medium text-lg">{eventType.resource.name}</h3>
                              {eventType.resource.description && (
                                <p className="text-muted-foreground text-sm mt-1">
                                  {eventType.resource.description}
                                </p>
                              )}
                              <div className="flex items-center justify-between mt-3">
                                <Badge variant="outline" className="bg-muted/40">
                                  {eventType.resource.duration} minutes
                                </Badge>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-sm" 
                                  asChild
                                >
                                  <a 
                                    href={eventType.resource.scheduling_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    View
                                  </a>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 border-t pt-4">
                          <p className="text-sm font-medium text-muted-foreground mb-2">API Details</p>
                          <div className="bg-muted/20 p-3 rounded text-sm">
                            <p>API Endpoint: GET /event_types</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Profile Owner: {eventTypes[0].resource.profile.owner}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <CalendarDays className="h-16 w-16 mx-auto mb-4 text-muted-foreground/60" />
                        <h3 className="text-lg font-medium">No Event Types Found</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mt-2">
                          You don't have any Calendly event types configured yet. Create event types in Calendly to offer scheduling options.
                        </p>
                        <Button className="mt-4" asChild>
                          <a 
                            href="https://calendly.com/event_types/new" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Create in Calendly
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
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
