
import { useState, useEffect, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, ListFilter, List, Plus, User, Users, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import CalendlyUserProfile from '@/components/employer/calendar/CalendlyUserProfile';
import CalendlyScheduledEvents from '@/components/employer/calendar/CalendlyScheduledEvents';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

// Mock Calendly API data
const mockUser = {
  name: "John Doe",
  email: "john.doe@fakeaddress.com",
  timezone: "America/New_York",
  scheduling_url: "https://www.calendly.com/john-doe",
  slug: "john-doe",
  avatar_url: null
};

const mockEventTypes = [
  {
    uri: "https://api.calendly.com/event_types/A",
    name: "30 Minute Meeting",
    description: "Half hour meeting to discuss project needs",
    duration: 30,
    slug: "30min",
    color: "#0088ff",
    active: true,
    secret: false,
    scheduling_url: "https://calendly.com/john-doe/30min"
  },
  {
    uri: "https://api.calendly.com/event_types/B",
    name: "60 Minute Interview",
    description: "Full interview session with candidate",
    duration: 60,
    slug: "interview",
    color: "#ff8800",
    active: true,
    secret: false,
    scheduling_url: "https://calendly.com/john-doe/interview"
  },
  {
    uri: "https://api.calendly.com/event_types/C",
    name: "15 Minute Check-in",
    description: "Quick follow-up meeting",
    duration: 15,
    slug: "checkin",
    color: "#00cc44",
    active: true,
    secret: false,
    scheduling_url: "https://calendly.com/john-doe/checkin"
  }
];

const mockEvents = [
  {
    uri: "https://api.calendly.com/scheduled_events/1",
    name: "Interview with Jane Smith",
    status: "active",
    start_time: "2025-05-15T14:00:00Z",
    end_time: "2025-05-15T15:00:00Z",
    location: { type: "Zoom" },
    created_at: "2025-05-01T12:30:00Z",
    updated_at: "2025-05-01T12:30:00Z",
    event_type: "60 Minute Interview",
    invitees_counter: { total: 1, active: 1, limit: 1 }
  },
  {
    uri: "https://api.calendly.com/scheduled_events/2",
    name: "Project Discussion with Bob Johnson",
    status: "active",
    start_time: "2025-05-16T10:00:00Z",
    end_time: "2025-05-16T10:30:00Z",
    location: { type: "Google Meet" },
    created_at: "2025-05-02T08:15:00Z",
    updated_at: "2025-05-02T08:15:00Z",
    event_type: "30 Minute Meeting",
    invitees_counter: { total: 1, active: 1, limit: 1 }
  },
  {
    uri: "https://api.calendly.com/scheduled_events/3",
    name: "Check-in with Mark Williams",
    status: "canceled",
    start_time: "2025-05-14T09:00:00Z",
    end_time: "2025-05-14T09:15:00Z",
    location: { type: "Phone Call" },
    created_at: "2025-05-03T14:20:00Z",
    updated_at: "2025-05-09T11:30:00Z",
    event_type: "15 Minute Check-in",
    invitees_counter: { total: 1, active: 0, limit: 1 }
  },
  {
    uri: "https://api.calendly.com/scheduled_events/4",
    name: "Interview with Alex Rodriguez",
    status: "active",
    start_time: "2025-05-18T13:00:00Z",
    end_time: "2025-05-18T14:00:00Z",
    location: { type: "Microsoft Teams" },
    created_at: "2025-05-04T09:45:00Z",
    updated_at: "2025-05-04T09:45:00Z",
    event_type: "60 Minute Interview",
    invitees_counter: { total: 1, active: 1, limit: 1 }
  }
];

interface ScheduledEvent {
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

const EmployerCalendar = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upcoming");
  const { userProfile } = useAuth();
  const hasPremium = userProfile?.preferences?.hasPremium === true;
  
  // User state
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  // Event types state
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [loadingEventTypes, setLoadingEventTypes] = useState(true);
  
  // Event types by user state
  const [eventTypesByUser, setEventTypesByUser] = useState<any[]>([]);
  const [loadingEventTypesByUser, setLoadingEventTypesByUser] = useState(true);

  // Scheduled events state
  const [events, setEvents] = useState<ScheduledEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventPagination, setEventPagination] = useState<{count: number, next_page: string | null} | null>(null);
  const [eventsHistory, setEventsHistory] = useState<string[]>([]);
  const [currentEventPage, setCurrentEventPage] = useState("");
  
  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('api.calendly.com/users/me');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setUser(mockUser);
          setLoadingUser(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load calendar profile",
          variant: "destructive",
        });
        setLoadingUser(false);
      }
    };
    
    fetchUser();
  }, [toast]);
  
  // Fetch event types
  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('api.calendly.com/event_types');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setEventTypes(mockEventTypes);
          setLoadingEventTypes(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching event types:', error);
        toast({
          title: "Error",
          description: "Failed to load event types",
          variant: "destructive",
        });
        setLoadingEventTypes(false);
      }
    };
    
    fetchEventTypes();
  }, [toast]);
  
  // Fetch event types by user
  useEffect(() => {
    const fetchEventTypesByUser = async () => {
      try {
        // In a real app, this would be an API call with the user parameter
        // const response = await fetch('api.calendly.com/event_types?user=<user_id>');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setEventTypesByUser(mockEventTypes);
          setLoadingEventTypesByUser(false);
        }, 1200);
      } catch (error) {
        console.error('Error fetching event types by user:', error);
        toast({
          title: "Error",
          description: "Failed to load event types by user",
          variant: "destructive",
        });
        setLoadingEventTypesByUser(false);
      }
    };
    
    fetchEventTypesByUser();
  }, [toast]);
  
  // Fetch scheduled events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('api.calendly.com/scheduled_events');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setEvents(mockEvents);
          setEventPagination({
            count: mockEvents.length,
            next_page: null
          });
          setCurrentEventPage("initial");
          setLoadingEvents(false);
        }, 1200);
      } catch (error) {
        console.error('Error fetching scheduled events:', error);
        toast({
          title: "Error",
          description: "Failed to load scheduled events",
          variant: "destructive",
        });
        setLoadingEvents(false);
      }
    };
    
    fetchEvents();
  }, [toast]);
  
  // Handle load more events
  const handleLoadMoreEvents = useCallback(() => {
    if (!eventPagination?.next_page) return;
    
    setLoadingEvents(true);
    const previousPage = currentEventPage;
    
    // Simulate API call with a delay
    setTimeout(() => {
      const newEvents = [
        {
          uri: "https://api.calendly.com/scheduled_events/5",
          name: "Follow-up with Sarah Lee",
          status: "active",
          start_time: "2025-05-20T15:30:00Z",
          end_time: "2025-05-20T16:00:00Z",
          location: { type: "Google Meet" },
          created_at: "2025-05-05T10:15:00Z",
          updated_at: "2025-05-05T10:15:00Z",
          event_type: "30 Minute Meeting",
          invitees_counter: { total: 1, active: 1, limit: 1 }
        },
        {
          uri: "https://api.calendly.com/scheduled_events/6",
          name: "Quick check-in with Tom Brown",
          status: "active",
          start_time: "2025-05-21T09:00:00Z",
          end_time: "2025-05-21T09:15:00Z",
          location: { type: "Phone Call" },
          created_at: "2025-05-06T16:45:00Z",
          updated_at: "2025-05-06T16:45:00Z",
          event_type: "15 Minute Check-in",
          invitees_counter: { total: 1, active: 1, limit: 1 }
        }
      ];
      
      setEvents(prev => [...prev, ...newEvents]);
      setEventsHistory(prev => [...prev, previousPage]);
      setCurrentEventPage("page-2");
      setEventPagination({
        count: newEvents.length,
        next_page: null // No more pages
      });
      setLoadingEvents(false);
    }, 800);
  }, [eventPagination, currentEventPage]);
  
  // Handle previous page of events
  const handlePreviousEvents = useCallback(() => {
    if (eventsHistory.length === 0) return;
    
    setLoadingEvents(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Remove the current events added from the "next page"
      const newEvents = mockEvents;
      
      setEvents(newEvents);
      const updatedHistory = [...eventsHistory];
      updatedHistory.pop(); // Remove the last page from history
      setEventsHistory(updatedHistory);
      setCurrentEventPage("initial");
      setEventPagination({
        count: mockEvents.length,
        next_page: "https://api.calendly.com/scheduled_events?page=2" // Re-enable next page option
      });
      setLoadingEvents(false);
    }, 800);
  }, [eventsHistory]);
  
  // Format upcoming event dates for display
  const getUpcomingEventDisplay = () => {
    const now = new Date();
    const futureEvents = events
      .filter(event => new Date(event.start_time) > now && event.status === 'active')
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
      
    if (futureEvents.length === 0) {
      return {
        date: "No upcoming events",
        time: "",
        title: "Schedule your next meeting"
      };
    }
    
    const nextEvent = futureEvents[0];
    const eventDate = new Date(nextEvent.start_time);
    
    return {
      date: format(eventDate, "MMMM d, yyyy"),
      time: format(eventDate, "h:mm a"),
      title: nextEvent.name || "Scheduled Meeting"
    };
  };
  
  const upcomingEvent = getUpcomingEventDisplay();
  
  const handleConnectCalendly = () => {
    toast({
      title: "Calendly Integration",
      description: "This would open Calendly OAuth flow in a real implementation.",
    });
  };
  
  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto py-6 space-y-8">
        <PageHeader
          title="Calendar Management"
          description="Manage your calendar scheduling and appointments"
          icon={<Calendar className="h-6 w-6 text-primary" />}
        />
        
        {/* Premium feature card for non-premium users */}
        {!hasPremium && (
          <Card className="bg-muted/50 border border-amber-200 dark:border-amber-900">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-amber-700 dark:text-amber-500">
                <Badge variant="outline" className="mr-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/50">
                  <Plus className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
                Calendar Integration
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Upgrade to premium to connect your Calendly account and manage all your scheduling in one place.
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button variant="default" className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => window.location.href = "/employer/premium-features"}>
                Upgrade to Premium
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - user profile and info */}
          <div className="space-y-6">
            <CalendlyUserProfile 
              user={user} 
              isLoading={loadingUser}
            />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Upcoming Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xl font-medium">{upcomingEvent.title}</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{upcomingEvent.date}</span>
                  </div>
                  {upcomingEvent.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{upcomingEvent.time}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                {hasPremium ? (
                  <Button variant="outline" className="w-full" onClick={handleConnectCalendly}>
                    {user ? "Manage Calendly Settings" : "Connect Calendly"}
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Premium Feature
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
          
          {/* Right column - scheduled events and event types */}
          <div className="md:col-span-2 space-y-6">
            <Tabs
              defaultValue="upcoming"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="upcoming" className="flex gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Upcoming</span>
                </TabsTrigger>
                <TabsTrigger value="events" className="flex gap-2">
                  <List className="h-4 w-4" />
                  <span>Events</span>
                </TabsTrigger>
                <TabsTrigger value="event-types" className="flex gap-2">
                  <ListFilter className="h-4 w-4" />
                  <span>Event Types</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Upcoming tab */}
              <TabsContent value="upcoming" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar Overview</CardTitle>
                    <CardDescription>
                      View and manage your upcoming calendar events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {hasPremium ? (
                      <div className="p-8 text-center">
                        {/* In a real implementation, this would show a calendar or schedule view */}
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                        <h3 className="text-lg font-medium mb-2">Your Calendar</h3>
                        <p className="text-muted-foreground mb-4">
                          Connect your Calendly account to display your calendar here
                        </p>
                        <Button onClick={handleConnectCalendly}>
                          Connect Calendly
                        </Button>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
                        <p className="text-muted-foreground mb-4">
                          Upgrade to premium to connect your calendar
                        </p>
                        <Button onClick={() => window.location.href = "/employer/premium-features"}>
                          Upgrade to Premium
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Events tab */}
              <TabsContent value="events" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Scheduled Events</CardTitle>
                    <CardDescription>
                      View all your scheduled meetings and events
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {hasPremium ? (
                      <CalendlyScheduledEvents 
                        events={events}
                        isLoading={loadingEvents}
                        pagination={eventPagination}
                        onLoadMore={handleLoadMoreEvents}
                        onPrevious={handlePreviousEvents}
                        hasPrevious={eventsHistory.length > 0}
                      />
                    ) : (
                      <div className="p-8 text-center">
                        <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
                        <p className="text-muted-foreground mb-4">
                          Upgrade to premium to view and manage your scheduled events
                        </p>
                        <Button onClick={() => window.location.href = "/employer/premium-features"}>
                          Upgrade to Premium
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Event Types tab */}
              <TabsContent value="event-types" className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Event Types</CardTitle>
                    <CardDescription>
                      Manage your meeting types and availability
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {hasPremium ? (
                      loadingEventTypes ? (
                        <div className="space-y-4">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Card key={i} className="border-muted">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div className="h-5 w-48 bg-gray-200 animate-pulse rounded"></div>
                                  <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
                                </div>
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
                      ) : eventTypes.length === 0 ? (
                        <div className="text-center py-8">
                          <ListFilter className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-medium mb-2">No Event Types</h3>
                          <p className="text-muted-foreground mb-4">
                            You don't have any event types configured yet.
                          </p>
                          <Button>Create Your First Event Type</Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {eventTypes.map((eventType) => (
                            <Card key={eventType.uri} className="border-muted hover:border-primary/20 transition-colors">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-base font-medium">{eventType.name}</CardTitle>
                                  <Badge 
                                    style={{ backgroundColor: eventType.color + '20', color: eventType.color, borderColor: eventType.color + '40' }}
                                    variant="outline"
                                  >
                                    {eventType.duration} min
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <p className="text-sm text-muted-foreground">{eventType.description || "No description provided"}</p>
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <a 
                                      href={eventType.scheduling_url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm text-primary hover:underline"
                                    >
                                      {eventType.scheduling_url}
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )
                    ) : (
                      <div className="p-8 text-center">
                        <ListFilter className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
                        <p className="text-muted-foreground mb-4">
                          Upgrade to premium to view and manage your event types
                        </p>
                        <Button onClick={() => window.location.href = "/employer/premium-features"}>
                          Upgrade to Premium
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerCalendar;
