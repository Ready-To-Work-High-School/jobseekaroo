
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Plus, User, MapPin, Video, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EmployerCalendar = () => {
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

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Calendar className="h-8 w-8" />
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

        <div className="grid gap-6">
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

          <div className="grid md:grid-cols-3 gap-4">
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
    </Layout>
  );
};

export default EmployerCalendar;
