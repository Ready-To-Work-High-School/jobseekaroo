
import { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { Calendar, Clock, Globe, Bell, Settings, Users, CalendarDays, Webhook } from 'lucide-react';
import CalendlyEmbed from '@/components/calendly/CalendlyEmbed';
import CalendlyUserProfile from '@/components/employer/calendar/CalendlyUserProfile';
import CalendlyScheduledEvents from '@/components/employer/calendar/CalendlyScheduledEvents';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface CalendlyUser {
  name: string;
  email: string;
  timezone: string;
  scheduling_url: string;
  slug: string;
  avatar_url?: string | null;
}

interface CalendlyEvent {
  uri: string;
  name?: string;
  status: string;
  start_time: string;
  end_time: string;
  location?: {
    type: string;
    location?: string;
  };
  created_at: string;
  updated_at: string;
  event_type: string;
  invitees_counter: {
    total: number;
    active: number;
    limit: number;
  };
}

interface EventType {
  uri: string;
  name: string;
  description?: string;
  active: boolean;
  scheduling_url: string;
  duration: number; // Minutes
  color: string;
}

interface Webhook {
  uri: string;
  callback_url: string;
  created_at: string;
  updated_at: string;
  events: string[];
  scope: string;
  organization: string;
}

const EmployerCalendar = () => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("schedule");
  const [isLoading, setIsLoading] = useState(true);
  const [calendlyUser, setCalendlyUser] = useState<CalendlyUser | null>(null);
  const [events, setEvents] = useState<CalendlyEvent[]>([]);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [pagination, setPagination] = useState<{count: number, next_page: string | null} | null>(null);
  const [previousPages, setPreviousPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  
  const fadeIn = useFadeIn(100);
  const slideIn = useSlideIn('left', 200);
  
  // Mock API call for getting Calendly user data
  useEffect(() => {
    // This would be replaced with a real API call to your backend
    // which would then call the Calendly API using your API key
    setIsLoading(true);
    
    // Simulating API delay
    const timer = setTimeout(() => {
      // Mock user data
      setCalendlyUser({
        name: userProfile?.full_name || "John Doe",
        email: userProfile?.email || "john.doe@example.com",
        timezone: "America/New_York",
        scheduling_url: "https://calendly.com/johndoe",
        slug: "johndoe",
        avatar_url: userProfile?.avatar_url || null
      });
      
      // Mock scheduled events
      setEvents([
        {
          uri: "https://api.calendly.com/scheduled_events/123",
          name: "Initial Consultation",
          status: "active",
          start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          end_time: new Date(Date.now() + 86400000 + 3600000).toISOString(), // Tomorrow + 1 hour
          location: {
            type: "web_conferencing",
            location: "Zoom"
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          event_type: "consultation",
          invitees_counter: {
            total: 1,
            active: 1,
            limit: 1
          }
        },
        {
          uri: "https://api.calendly.com/scheduled_events/456",
          name: "Follow-up Meeting",
          status: "active",
          start_time: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
          end_time: new Date(Date.now() + 172800000 + 3600000).toISOString(), // Day after tomorrow + 1 hour
          location: {
            type: "physical",
            location: "Office"
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          event_type: "meeting",
          invitees_counter: {
            total: 3,
            active: 2,
            limit: 5
          }
        }
      ]);
      
      // Mock event types
      setEventTypes([
        {
          uri: "https://api.calendly.com/event_types/A",
          name: "30 Minute Meeting",
          description: "Quick consultation session",
          active: true,
          scheduling_url: "https://calendly.com/johndoe/30min",
          duration: 30,
          color: "#0069ff"
        },
        {
          uri: "https://api.calendly.com/event_types/B",
          name: "60 Minute Meeting",
          description: "In-depth consultation",
          active: true,
          scheduling_url: "https://calendly.com/johndoe/60min",
          duration: 60,
          color: "#f5a623"
        }
      ]);
      
      // Mock webhook subscriptions
      setWebhooks([
        {
          uri: "https://api.calendly.com/webhook_subscriptions/123",
          callback_url: "https://your-app.com/api/calendly-webhook",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          events: ["invitee.created", "invitee.canceled"],
          scope: "organization",
          organization: "https://api.calendly.com/organizations/ABC123"
        }
      ]);
      
      // Mock pagination
      setPagination({
        count: 2,
        next_page: null
      });
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [userProfile]);
  
  // Function to load more events
  const handleLoadMore = useCallback(() => {
    if (!pagination || !pagination.next_page) return;
    
    setIsLoading(true);
    
    // In a real implementation, this would call your backend
    // which would then make a request to the next_page URL
    
    // Store current page for "back" navigation
    if (currentPage) {
      setPreviousPages(prev => [...prev, currentPage]);
    }
    setCurrentPage(pagination.next_page);
    
    // Simulate API delay
    setTimeout(() => {
      // Mock more events
      setEvents(prev => [
        ...prev,
        {
          uri: "https://api.calendly.com/scheduled_events/789",
          name: "Project Review",
          status: "active",
          start_time: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
          end_time: new Date(Date.now() + 259200000 + 5400000).toISOString(), // 3 days from now + 1.5 hours
          location: {
            type: "web_conferencing",
            location: "Microsoft Teams"
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          event_type: "review",
          invitees_counter: {
            total: 4,
            active: 4,
            limit: 10
          }
        }
      ]);
      
      // Update pagination to indicate no more pages
      setPagination({
        count: 3,
        next_page: null
      });
      
      setIsLoading(false);
    }, 1000);
  }, [pagination, currentPage]);
  
  // Function to go back to previous page
  const handlePrevious = useCallback(() => {
    if (previousPages.length === 0) return;
    
    setIsLoading(true);
    
    // In a real implementation, this would call your backend
    // which would make a request to the previous page URL
    
    // Get the last page from history
    const lastPage = previousPages[previousPages.length - 1];
    setCurrentPage(lastPage);
    setPreviousPages(prev => prev.slice(0, -1));
    
    // Simulate API delay
    setTimeout(() => {
      // Simulate returning to previous events state
      // In a real app, you would fetch the actual data for that page
      setEvents([
        {
          uri: "https://api.calendly.com/scheduled_events/123",
          name: "Initial Consultation",
          status: "active",
          start_time: new Date(Date.now() + 86400000).toISOString(),
          end_time: new Date(Date.now() + 86400000 + 3600000).toISOString(),
          location: {
            type: "web_conferencing",
            location: "Zoom"
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          event_type: "consultation",
          invitees_counter: {
            total: 1,
            active: 1,
            limit: 1
          }
        },
        {
          uri: "https://api.calendly.com/scheduled_events/456",
          name: "Follow-up Meeting",
          status: "active",
          start_time: new Date(Date.now() + 172800000).toISOString(),
          end_time: new Date(Date.now() + 172800000 + 3600000).toISOString(),
          location: {
            type: "physical",
            location: "Office"
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          event_type: "meeting",
          invitees_counter: {
            total: 3,
            active: 2,
            limit: 5
          }
        }
      ]);
      
      // Restore pagination state
      setPagination({
        count: 2,
        next_page: "https://api.calendly.com/scheduled_events?page=2"
      });
      
      setIsLoading(false);
    }, 1000);
  }, [previousPages]);
  
  // Handler for creating a new webhook subscription
  const handleCreateWebhook = () => {
    // In a real implementation, this would call your backend
    // which would then create a webhook via the Calendly API
    toast({
      title: "Webhook Creation",
      description: "This would create a new webhook subscription in a real implementation.",
    });
  };
  
  // Handler for deleting a webhook subscription
  const handleDeleteWebhook = (webhookUri: string) => {
    // In a real implementation, this would call your backend
    // which would then delete the webhook via the Calendly API
    setWebhooks(prev => prev.filter(webhook => webhook.uri !== webhookUri));
    
    toast({
      title: "Webhook Deleted",
      description: "Webhook subscription successfully removed.",
    });
  };
  
  return (
    <Layout>
      <div className={`container max-w-5xl mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Calendar Management</h1>
            <Badge variant="outline" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Calendly Integration
            </Badge>
          </div>
          
          <CalendlyUserProfile user={calendlyUser} isLoading={isLoading} />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              <TabsTrigger value="schedule" className="flex gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Schedule</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="event-types" className="flex gap-1.5">
                <Clock className="h-4 w-4" />
                <span>Event Types</span>
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="flex gap-1.5">
                <Webhook className="h-4 w-4" />
                <span>Webhooks</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex gap-1.5 hidden lg:flex">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedule" className="mt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Book Your Meetings</CardTitle>
                    <CardDescription>
                      Use your Calendly scheduling page to allow candidates to book time with you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CalendlyEmbed url={calendlyUser?.scheduling_url} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="mt-6">
              <div className="grid gap-6">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between">
                      <span>Scheduled Events</span>
                      <Badge variant="secondary" className="text-xs">
                        {pagination?.count || 0} Total
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      View and manage your upcoming appointments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CalendlyScheduledEvents 
                      events={events} 
                      isLoading={isLoading}
                      pagination={pagination}
                      onLoadMore={handleLoadMore}
                      onPrevious={handlePrevious}
                      hasPrevious={previousPages.length > 0}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="event-types" className="mt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Your Event Types</CardTitle>
                    <CardDescription>
                      Manage your available meeting types and durations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Card key={i} className="border-muted">
                            <CardHeader className="pb-2">
                              <div className="h-5 w-48 bg-gray-200 animate-pulse rounded"></div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : eventTypes.length > 0 ? (
                      <div className="space-y-4">
                        {eventTypes.map(eventType => (
                          <Card key={eventType.uri} className="border-muted hover:border-muted-foreground/20 transition-colors">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-medium flex items-center">
                                  <div 
                                    className="h-3 w-3 rounded-full mr-2" 
                                    style={{ backgroundColor: eventType.color }}
                                  />
                                  {eventType.name}
                                </CardTitle>
                                <Badge 
                                  variant={eventType.active ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {eventType.duration} min
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-2">
                                {eventType.description || "No description provided."}
                              </p>
                              <div className="text-sm flex items-center">
                                <Globe className="h-4 w-4 mr-1.5 text-muted-foreground" />
                                <a 
                                  href={eventType.scheduling_url} 
                                  className="text-primary hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {eventType.scheduling_url.split('//')[1]}
                                </a>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Clock className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No Event Types Found</h3>
                        <p className="text-muted-foreground mb-6">
                          Create your first event type on Calendly to get started.
                        </p>
                        <Button asChild>
                          <a 
                            href="https://calendly.com/event_types/new" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Create Event Type
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="webhooks" className="mt-6">
              <div className="grid gap-6">
                <Card className={slideIn}>
                  <CardHeader className="pb-3">
                    <CardTitle>Webhook Subscriptions</CardTitle>
                    <CardDescription>
                      Receive real-time notifications when events are scheduled, canceled, or updated.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <div key={i} className="p-4 border rounded-md">
                            <div className="h-5 w-full bg-gray-200 animate-pulse rounded mb-4"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : webhooks.length > 0 ? (
                      <div className="space-y-4">
                        {webhooks.map(webhook => (
                          <div key={webhook.uri} className="p-4 border rounded-md">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-medium text-sm">Callback URL</h4>
                                <a 
                                  href={webhook.callback_url} 
                                  className="text-primary text-sm hover:underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {webhook.callback_url}
                                </a>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteWebhook(webhook.uri)}
                              >
                                Remove
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              <div>
                                <h4 className="text-xs font-medium text-muted-foreground">Events</h4>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {webhook.events.map(event => (
                                    <Badge key={event} variant="secondary" className="text-xs">
                                      {event}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-xs font-medium text-muted-foreground">Created</h4>
                                <p className="text-sm">
                                  {format(new Date(webhook.created_at), 'MMM d, yyyy')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Bell className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">No Webhook Subscriptions</h3>
                        <p className="text-muted-foreground mb-6">
                          Set up webhooks to get notified about scheduling events.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleCreateWebhook}>
                      Add Webhook
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className={slideIn}>
                  <CardHeader className="pb-3">
                    <CardTitle>Webhook Integration Guide</CardTitle>
                    <CardDescription>
                      Learn how to integrate Calendly webhooks with your application.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1">1. Create a Webhook Endpoint</h3>
                        <p className="text-sm text-muted-foreground">
                          Set up an HTTP endpoint in your application that can receive POST requests from Calendly.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-1">2. Subscribe to Events</h3>
                        <p className="text-sm text-muted-foreground">
                          Use the "Add Webhook" button to create a subscription to events like invitee.created or invitee.canceled.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-1">3. Handle Webhook Payloads</h3>
                        <p className="text-sm text-muted-foreground">
                          Process the JSON payload sent to your endpoint when events occur.
                        </p>
                      </div>
                      
                      <div className="bg-muted/50 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2">Available Event Types</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <li className="flex items-center gap-1.5">
                            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                            invitee.created
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                            invitee.canceled
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                            event_type.created
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
                            event_type.updated
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Calendar Settings</CardTitle>
                    <CardDescription>
                      Manage your calendar preferences and integrations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Connected Calendar</h3>
                        <Badge variant="outline" className="gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          Google Calendar
                        </Badge>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Time Zone</h3>
                        <div className="flex items-center gap-1.5">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{calendlyUser?.timezone || "Loading..."}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Availability</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Set your default availability for meetings.
                        </p>
                        <Button variant="outline">Configure Availability</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerCalendar;

