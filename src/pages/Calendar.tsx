
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Users, Plus, User, MapPin, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  // Sample upcoming events
  const sampleEvents = [
    {
      id: 1,
      title: "Interview with Sarah Johnson",
      type: "Interview",
      candidate: "Sarah Johnson",
      position: "Customer Service Representative",
      time: "10:00 AM - 10:30 AM",
      date: "Today",
      location: "Video Call",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Team Meeting - Hiring Review",
      type: "Meeting",
      time: "2:00 PM - 3:00 PM",
      date: "Today",
      location: "Conference Room A",
      status: "confirmed"
    },
    {
      id: 3,
      title: "Interview with Marcus Williams",
      type: "Interview",
      candidate: "Marcus Williams",
      position: "IT Support Intern",
      time: "9:00 AM - 9:30 AM",
      date: "Tomorrow",
      location: "Video Call",
      status: "pending"
    },
    {
      id: 4,
      title: "Interview with Emma Davis",
      type: "Interview",
      candidate: "Emma Davis",
      position: "Health Services Assistant",
      time: "11:00 AM - 11:30 AM",
      date: "March 15",
      location: "Office Visit",
      status: "confirmed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Interview': return <User className="h-4 w-4" />;
      case 'Meeting': return <Users className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <CalendarIcon className="h-8 w-8" />
              My Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your interviews, events, and important dates
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  {selectedDate ? `Events for ${selectedDate.toLocaleDateString()}` : 'Your scheduled interviews and meetings'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-sm">{event.title}</h3>
                            {event.candidate && (
                              <p className="text-sm text-muted-foreground">
                                Candidate: {event.candidate}
                              </p>
                            )}
                            {event.position && (
                              <p className="text-xs text-muted-foreground">
                                Position: {event.position}
                              </p>
                            )}
                          </div>
                          <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            {event.location.includes('Video') ? (
                              <Video className="h-3 w-3" />
                            ) : (
                              <MapPin className="h-3 w-3" />
                            )}
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">events</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">events</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">events</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
