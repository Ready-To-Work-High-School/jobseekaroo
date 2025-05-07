import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Grid, ListPlus, Bell, Webhook } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/auth';
import CalendlyEmbed from '@/components/calendly/CalendlyEmbed';
import CalendlyScheduledEvents from "@/components/employer/calendar/CalendlyScheduledEvents";
import CalendlyWebhookManager from "@/components/employer/calendar/CalendlyWebhookManager";
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { Badge } from '@/components/ui/badge';

interface Event {
  title: string;
  date: Date;
  type: string;
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

interface Webhook {
  uri: string;
  callback_url: string;
  events: string[];
  created_at: string;
}

const EmployerCalendar = () => {
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const { isAdmin } = useAdminStatus();
  const [activeTab, setActiveTab] = useState('embed');
  const [events, setEvents] = useState<CalendlyEvent[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [isLoadingWebhooks, setIsLoadingWebhooks] = useState(false);
  const [pagination, setPagination] = useState<{ count: number; next_page: string | null } | null>(null);
  const [previousPages, setPreviousPages] = useState<string[]>([]);
  const [permissionError, setPermissionError] = useState(false);
  
  const userName = userProfile ? `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() : '';
  
  const loadEvents = async (url?: string) => {
    setIsLoadingEvents(true);
    
    // Simulate API call - replace with your actual API endpoint
    // and data fetching logic
    
    // Mock data for demonstration
    const mockEvents: CalendlyEvent[] = [
      {
        uri: "https://api.calendly.com/scheduled_events/AAAAAAA",
        name: "Mock Interview",
        status: "active",
        start_time: "2024-07-22T14:00:00Z",
        end_time: "2024-07-22T14:30:00Z",
        location: { type: "Physical", location: "Conference Room B" },
        created_at: "2024-07-15T10:00:00Z",
        updated_at: "2024-07-15T10:00:00Z",
        event_type: "30 Minute Meeting",
        invitees_counter: { total: 2, active: 1, limit: 2 }
      },
      {
        uri: "https://api.calendly.com/scheduled_events/BBBBBBB",
        name: "Team Sync",
        status: "active",
        start_time: "2024-07-23T10:00:00Z",
        end_time: "2024-07-23T11:00:00Z",
        location: { type: "Google Meet", location: "meet.google.com/abc-defg-hij" },
        created_at: "2024-07-16T14:00:00Z",
        updated_at: "2024-07-16T14:00:00Z",
        event_type: "1 Hour Meeting",
        invitees_counter: { total: 5, active: 5, limit: 5 }
      }
    ];
    
    // Simulate pagination data
    const mockPagination = {
      count: 20,
      next_page: "https://api.example.com/events?page=2"
    };
    
    setTimeout(() => {
      setEvents(mockEvents);
      setPagination(mockPagination);
      setIsLoadingEvents(false);
    }, 500);
  };
  
  const loadMoreEvents = () => {
    if (pagination?.next_page) {
      setPreviousPages(prev => [...prev, window.location.href]);
      loadEvents(pagination.next_page);
    }
  };
  
  const loadPreviousPage = () => {
    const previousUrl = previousPages.pop();
    if (previousUrl) {
      window.history.pushState(null, '', previousUrl);
      loadEvents(previousUrl);
    }
  };
  
  // Load webhooks with permission handling
  const loadWebhooks = async () => {
    setIsLoadingWebhooks(true);
    setPermissionError(false);
    
    try {
      // Simulate API call - in a real app this would be a call to your Calendly API proxy
      // For demo purposes we're handling the 403 error shown in the example
      
      // Mock response based on the permission status we got from the user
      const response = { status: 403 }; // Simulate 403 permission denied error
      
      if (response.status === 403) {
        setPermissionError(true);
        setWebhooks([]);
        toast({
          title: "Permission denied",
          description: "You don't have permission to manage webhooks. Admin privileges required.",
          variant: "destructive",
        });
      } else {
        // In a real implementation, this would parse the response data
        setWebhooks([]);
      }
    } catch (error) {
      console.error("Error loading webhooks:", error);
      toast({
        title: "Error",
        description: "Failed to load webhooks. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingWebhooks(false);
    }
  };
  
  // Handle webhook creation
  const handleCreateWebhook = async (url: string, events: string[]) => {
    if (permissionError) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to create webhooks. Admin privileges required.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would call the Calendly API
    toast({
      title: "Feature requires permissions",
      description: "Creating webhooks requires admin privileges in Calendly.",
    });
  };
  
  // Handle webhook deletion
  const handleDeleteWebhook = async (webhookUri: string) => {
    if (permissionError) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to delete webhooks. Admin privileges required.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would call the Calendly API
    toast({
      title: "Feature requires permissions",
      description: "Deleting webhooks requires admin privileges in Calendly.",
    });
  };
  
  useEffect(() => {
    if (activeTab === 'events') {
      loadEvents();
    } else if (activeTab === 'webhooks') {
      loadWebhooks();
    }
  }, [activeTab]);
  
  return (
    <div className="container max-w-7xl mx-auto py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Calendar Management</h1>
        <p className="text-muted-foreground">
          Manage your schedule, view upcoming events, and configure integration settings.
        </p>
      </div>
      
      <div className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="embed" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-1">
              <ListPlus className="h-4 w-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center gap-1">
              <Webhook className="h-4 w-4" />
              <span>Webhooks</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="embed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendly Schedule</CardTitle>
                <CardDescription>
                  Your scheduling page embedded directly in your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[600px]">
                <CalendlyEmbed userName={userName} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Your next few scheduled appointments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event, i) => {
                    const start = new Date(event.start_time);
                    return (
                      <div key={event.uri} className="flex items-center justify-between border-b pb-3 last:border-0">
                        <div>
                          <p className="font-medium">{event.name || "Scheduled Meeting"}</p>
                          <p className="text-sm text-muted-foreground">{format(start, 'MMMM d, yyyy • h:mm a')}</p>
                        </div>
                        <Badge variant="outline" className={`${event.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                          {event.status}
                        </Badge>
                      </div>
                    );
                  })}
                  
                  {events.length === 0 && !isLoadingEvents && (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No upcoming events</p>
                    </div>
                  )}
                  
                  {isLoadingEvents && (
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between animate-pulse">
                          <div>
                            <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-32"></div>
                          </div>
                          <div className="h-5 bg-gray-200 rounded w-16"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="ml-auto" onClick={() => setActiveTab('events')}>
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <CalendlyScheduledEvents 
              events={events}
              isLoading={isLoadingEvents}
              pagination={pagination}
              onLoadMore={loadMoreEvents}
              onPrevious={loadPreviousPage}
              hasPrevious={previousPages.length > 0}
            />
          </TabsContent>
          
          <TabsContent value="webhooks">
            {permissionError ? (
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Bell className="h-5 w-5" />
                    Permission Denied
                  </CardTitle>
                  <CardDescription>
                    You don't have permission to manage webhooks. This feature requires admin privileges in Calendly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Webhook management allows admins to configure real-time event notifications for your Calendly events.
                    These notifications can be sent to your application when events are created, canceled, or rescheduled.
                  </p>
                  
                  {isAdmin && (
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Admin Note</h3>
                      <p className="text-sm">
                        While you have admin privileges in this application, you may need additional permissions in your Calendly 
                        account to manage webhooks. Please contact your Calendly administrator or upgrade your Calendly plan 
                        to access this feature.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <CalendlyWebhookManager
                webhooks={webhooks}
                onDelete={handleDeleteWebhook}
                onCreate={handleCreateWebhook}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerCalendar;
