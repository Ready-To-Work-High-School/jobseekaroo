
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Users, Plus, User, MapPin, Video, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const EmployerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Sample interview data
  const sampleInterviews = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      position: "Customer Service Representative",
      time: "10:00 AM",
      duration: "30 min",
      date: "Today",
      type: "Video Call",
      status: "confirmed",
      recruiter: "John Smith"
    },
    {
      id: 2,
      candidate: "Marcus Williams",
      position: "IT Support Intern",
      time: "2:00 PM",
      duration: "30 min",
      date: "Today",
      type: "Phone Call",
      status: "confirmed",
      recruiter: "Jane Doe"
    },
    {
      id: 3,
      candidate: "Emma Davis",
      position: "Health Services Assistant",
      time: "9:00 AM",
      duration: "45 min",
      date: "Tomorrow",
      type: "In-Person",
      status: "pending",
      recruiter: "Mike Johnson"
    },
    {
      id: 4,
      candidate: "Jordan Martinez",
      position: "Engineering Intern",
      time: "11:00 AM",
      duration: "30 min",
      date: "March 15",
      type: "Video Call",
      status: "confirmed",
      recruiter: "Sarah Wilson"
    }
  ];

  // Sample calendar events by date
  const calendarEvents = {
    '2024-01-15': [
      { time: '10:00 AM', title: 'Sarah Johnson Interview', type: 'interview' },
      { time: '2:00 PM', title: 'Marcus Williams Interview', type: 'interview' }
    ],
    '2024-01-16': [
      { time: '9:00 AM', title: 'Emma Davis Interview', type: 'interview' },
      { time: '3:00 PM', title: 'Team Meeting', type: 'meeting' }
    ],
    '2024-01-17': [
      { time: '11:00 AM', title: 'Jordan Martinez Interview', type: 'interview' }
    ]
  };

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
      case 'Video Call': return <Video className="h-4 w-4" />;
      case 'Phone Call': return <Phone className="h-4 w-4" />;
      case 'In-Person': return <MapPin className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const formatDateKey = (date: Date | undefined) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const getEventsForSelectedDate = () => {
    const dateKey = formatDateKey(selectedDate);
    return calendarEvents[dateKey as keyof typeof calendarEvents] || [];
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
              Schedule and manage interviews with candidates
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Schedule Interview
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar Widget */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Calendar View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                  modifiers={{
                    hasEvents: (date) => {
                      const dateKey = date.toISOString().split('T')[0];
                      return !!calendarEvents[dateKey as keyof typeof calendarEvents];
                    }
                  }}
                  modifiersStyles={{
                    hasEvents: {
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      fontWeight: 'bold'
                    }
                  }}
                />
                
                {/* Selected Date Events */}
                {selectedDate && getEventsForSelectedDate().length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2">
                      Events for {selectedDate.toLocaleDateString()}
                    </h4>
                    <div className="space-y-2">
                      {getEventsForSelectedDate().map((event, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs p-2 bg-blue-50 rounded">
                          <Clock className="h-3 w-3" />
                          <span className="font-medium">{event.time}</span>
                          <span>{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-600">4</div>
                    <div className="text-xs text-blue-600">This Week</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-600">2</div>
                    <div className="text-xs text-green-600">Today</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interview List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Interviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(interview.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-sm">{interview.candidate}</h3>
                            <p className="text-sm text-muted-foreground">
                              {interview.position}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Interviewer: {interview.recruiter}
                            </p>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(interview.status)}`}>
                            {interview.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {interview.date} at {interview.time} ({interview.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{interview.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Join</Button>
                        <Button size="sm" variant="ghost">Reschedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">interviews</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">interviews</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">interviews</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployerCalendar;
