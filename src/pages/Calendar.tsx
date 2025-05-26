
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Users, Plus, User, MapPin, Video, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

  // Enhanced sample upcoming events with more variety
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
      status: "confirmed",
      interviewer: "John Smith"
    },
    {
      id: 2,
      title: "Team Meeting - Hiring Review",
      type: "Meeting",
      time: "2:00 PM - 3:00 PM",
      date: "Today",
      location: "Conference Room A",
      status: "confirmed",
      attendees: "HR Team"
    },
    {
      id: 3,
      title: "Interview with Marcus Williams",
      type: "Interview",
      candidate: "Marcus Williams",
      position: "IT Support Intern",
      time: "9:00 AM - 9:30 AM",
      date: "Tomorrow",
      location: "Phone Call",
      status: "pending",
      interviewer: "Jane Doe"
    },
    {
      id: 4,
      title: "Interview with Emma Davis",
      type: "Interview",
      candidate: "Emma Davis",
      position: "Health Services Assistant",
      time: "11:00 AM - 11:45 AM",
      date: "March 15",
      location: "Office Visit",
      status: "confirmed",
      interviewer: "Mike Johnson"
    },
    {
      id: 5,
      title: "Career Fair - Virtual Booth",
      type: "Event",
      time: "1:00 PM - 4:00 PM",
      date: "March 16",
      location: "Virtual Platform",
      status: "confirmed",
      description: "High School Career Fair"
    },
    {
      id: 6,
      title: "Interview with Jordan Martinez",
      type: "Interview",
      candidate: "Jordan Martinez",
      position: "Engineering Intern",
      time: "3:00 PM - 3:30 PM",
      date: "March 17",
      location: "Video Call",
      status: "pending",
      interviewer: "Sarah Wilson"
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
      case 'Event': return <CalendarIcon className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getLocationIcon = (location: string) => {
    if (location.includes('Video')) return <Video className="h-3 w-3" />;
    if (location.includes('Phone')) return <Phone className="h-3 w-3" />;
    return <MapPin className="h-3 w-3" />;
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <CalendarIcon className="h-8 w-8" />
              Interview Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Schedule and manage interviews, meetings, and important events
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Schedule Event
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calendar</CardTitle>
                <CardDescription>
                  Click dates to view scheduled events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                />
                
                {/* Quick Stats */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-600">6</div>
                    <div className="text-xs text-blue-600">This Week</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-600">4</div>
                    <div className="text-xs text-green-600">Interviews</div>
                  </div>
                </div>
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
                  Your scheduled interviews, meetings, and events
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
                            {event.interviewer && (
                              <p className="text-xs text-muted-foreground">
                                Interviewer: {event.interviewer}
                              </p>
                            )}
                            {event.attendees && (
                              <p className="text-xs text-muted-foreground">
                                Attendees: {event.attendees}
                              </p>
                            )}
                            {event.description && (
                              <p className="text-xs text-muted-foreground">
                                {event.description}
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
                            {event.date} • {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            {getLocationIcon(event.location)}
                            {event.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {event.type === 'Interview' && (
                          <>
                            <Button size="sm" variant="outline">Join</Button>
                            <Button size="sm" variant="ghost">Reschedule</Button>
                          </>
                        )}
                        {event.type === 'Meeting' && (
                          <>
                            <Button size="sm" variant="outline">Join Meeting</Button>
                            <Button size="sm" variant="ghost">Details</Button>
                          </>
                        )}
                        {event.type === 'Event' && (
                          <Button size="sm" variant="outline">View Details</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-4 gap-4">
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
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">events</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">scheduled</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
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
