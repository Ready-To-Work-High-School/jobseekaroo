
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Sparkles, UserPlus, Calendar, ClipboardList } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFadeIn } from '@/utils/animations';
import { DatePicker } from '@/components/ui/date-picker';
import CalendlyUserProfile from '@/components/employer/calendar/CalendlyUserProfile';

// Mock data for Calendly user
const mockCalendlyUser = {
  name: "John Doe",
  email: "john.doe@fakeaddress.com",
  timezone: "America/New_York",
  scheduling_url: "https://www.calendly.com/john-doe",
  slug: "john-doe",
  avatar_url: null,
};

const EmployerCalendar = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendlyUser, setCalendlyUser] = useState<any>(null);
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const fadeIn = useFadeIn(300);
  const { userProfile } = useAuth();
  
  // Check if user has premium membership
  const hasPremium = userProfile?.preferences?.hasPremium === true;
  
  useEffect(() => {
    if (hasPremium) {
      // Simulate API fetch for Calendly user data
      setTimeout(() => {
        setCalendlyUser(mockCalendlyUser);
        setIsLoading(false);
      }, 1000);
      
      // Simulate API fetch for event types
      setTimeout(() => {
        setEventTypes([
          {
            id: "1",
            name: "15 Minute Meeting",
            duration: 15,
            description: "Short intro call or quick discussion",
            url: "https://calendly.com/john-doe/15min"
          },
          {
            id: "2",
            name: "30 Minute Meeting",
            duration: 30,
            description: "Standard consultation",
            url: "https://calendly.com/john-doe/30min"
          },
          {
            id: "3",
            name: "60 Minute Meeting",
            duration: 60,
            description: "In-depth discussion or interview",
            url: "https://calendly.com/john-doe/60min"
          }
        ]);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  }, [hasPremium]);

  // If not premium, show upgrade prompt
  if (!hasPremium) {
    return (
      <Layout>
        <div className={`container mx-auto px-4 py-6 ${fadeIn}`}>
          <h1 className="text-3xl font-bold mb-6">Calendar Management</h1>
          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-100 dark:border-amber-900/50">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <span>Premium Feature</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-amber-500" />
                <h3 className="text-lg font-medium mb-2">Calendar Integration is a Premium Feature</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Integrate your calendar with Calendly, schedule interviews with candidates, and manage your recruitment calendar with our premium plan.
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

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-6 ${fadeIn}`}>
        <h1 className="text-3xl font-bold mb-6">Calendar Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CalendlyUserProfile user={calendlyUser} isLoading={isLoading} />
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="schedule">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </TabsTrigger>
                <TabsTrigger value="event-types">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Event Types
                </TabsTrigger>
                <TabsTrigger value="invitees">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invitees
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="schedule" className="mt-6 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="w-full md:w-auto">
                        <DatePicker
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          placeholder="Select a date"
                          className="w-full"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">Today</Button>
                        <Button variant="outline">This Week</Button>
                      </div>
                    </div>
                    
                    <div className="h-[400px] border rounded-lg flex items-center justify-center">
                      {isLoading ? (
                        <div className="text-center">
                          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                          <p className="mt-2">Loading calendar...</p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Select a date to view your schedule</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="event-types" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Event Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="border rounded-lg p-4 animate-pulse">
                            <div className="h-5 w-1/3 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    ) : eventTypes.length > 0 ? (
                      <div className="space-y-4">
                        {eventTypes.map((eventType) => (
                          <div key={eventType.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                            <h3 className="font-medium mb-1">{eventType.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{eventType.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
                                {eventType.duration} minutes
                              </span>
                              <Button variant="outline" size="sm" asChild>
                                <a href={eventType.url} target="_blank" rel="noopener noreferrer">
                                  View
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">You don't have any event types yet</p>
                        <Button>Create Event Type</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="invitees" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Invitees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No recent invitees</p>
                      <Button variant="outline">View All Invitees</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Schedule with Candidate
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Create Event Type
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Sync Calendar
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm">No upcoming events</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerCalendar;
