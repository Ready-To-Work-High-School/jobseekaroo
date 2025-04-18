
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Video, ExternalLink, MapPin, User, Plus, Filter } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface Interview {
  id: string;
  candidateName: string;
  jobTitle: string;
  date: Date;
  time: string;
  duration: number;
  location: string;
  isVirtual: boolean;
  meetingLink?: string;
  status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
}

const MOCK_INTERVIEWS: Interview[] = [
  {
    id: '1',
    candidateName: 'Jessica Miller',
    jobTitle: 'Retail Associate',
    date: new Date(2023, 11, 15),
    time: '10:00 AM',
    duration: 30,
    location: 'Main Office',
    isVirtual: false,
    status: 'scheduled'
  },
  {
    id: '2',
    candidateName: 'Brandon Williams',
    jobTitle: 'Customer Service Rep',
    date: new Date(2023, 11, 15),
    time: '2:30 PM',
    duration: 45,
    location: '',
    isVirtual: true,
    meetingLink: 'https://zoom.us/j/123456789',
    status: 'scheduled'
  },
  {
    id: '3',
    candidateName: 'Alex Johnson',
    jobTitle: 'Administrative Assistant',
    date: new Date(2023, 11, 12),
    time: '11:15 AM',
    duration: 60,
    location: 'Conference Room B',
    isVirtual: false,
    status: 'completed'
  }
];

const InterviewSchedulingTab = () => {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState<Interview[]>(MOCK_INTERVIEWS);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddInterviewOpen, setIsAddInterviewOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  const filteredInterviews = interviews.filter(interview => {
    // Filter by status if needed
    if (filterStatus && interview.status !== filterStatus) {
      return false;
    }
    
    // Filter by selected date
    if (selectedDate) {
      return (
        interview.date.getDate() === selectedDate.getDate() &&
        interview.date.getMonth() === selectedDate.getMonth() &&
        interview.date.getFullYear() === selectedDate.getFullYear()
      );
    }
    
    return true;
  });

  // Get all dates that have interviews scheduled
  const interviewDates = interviews.map(interview => ({
    date: interview.date,
    status: interview.status
  }));

  const getStatusBadge = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'canceled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Canceled</Badge>;
      case 'no-show':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">No Show</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleAddNewInterview = () => {
    // In a real app, this would add a new interview to the database
    setIsAddInterviewOpen(false);
  };

  return (
    <Card>
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Interview Scheduling</CardTitle>
        </div>
        <CardDescription>
          Schedule and manage interviews with student candidates
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Calendar sidebar */}
          <div className="border-r p-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="font-medium">Calendar</h3>
              <Dialog open={isAddInterviewOpen} onOpenChange={setIsAddInterviewOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex gap-1 items-center">
                    <Plus className="h-4 w-4" />
                    New Interview
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Schedule New Interview</DialogTitle>
                    <DialogDescription>
                      Create a new interview with a candidate
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="candidate">Candidate</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select candidate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Jessica Miller</SelectItem>
                          <SelectItem value="2">Brandon Williams</SelectItem>
                          <SelectItem value="3">Sarah Thompson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="job">Job Position</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Retail Associate</SelectItem>
                          <SelectItem value="2">Administrative Assistant</SelectItem>
                          <SelectItem value="3">Customer Service Rep</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="time">Time</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9:00">9:00 AM</SelectItem>
                            <SelectItem value="9:30">9:30 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="10:30">10:30 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                            <SelectItem value="11:30">11:30 AM</SelectItem>
                            <SelectItem value="13:00">1:00 PM</SelectItem>
                            <SelectItem value="13:30">1:30 PM</SelectItem>
                            <SelectItem value="14:00">2:00 PM</SelectItem>
                            <SelectItem value="14:30">2:30 PM</SelectItem>
                            <SelectItem value="15:00">3:00 PM</SelectItem>
                            <SelectItem value="15:30">3:30 PM</SelectItem>
                            <SelectItem value="16:00">4:00 PM</SelectItem>
                            <SelectItem value="16:30">4:30 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Select defaultValue="30">
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="90">1.5 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="isVirtual">Virtual Meeting</Label>
                          <Switch id="isVirtual" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location or Meeting Link</Label>
                      <Input id="location" placeholder="Enter location or meeting link" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Any additional notes for the interview" />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddInterviewOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddNewInterview}>Schedule Interview</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiersStyles={{
                today: { fontWeight: 'bold' }
              }}
            />
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Interview Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Scheduled</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Canceled</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interview list */}
          <div className="md:col-span-2 p-4">
            <div className="mb-4">
              <Tabs defaultValue="upcoming">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                  
                  <Select
                    onValueChange={(value) => setFilterStatus(value === 'all' ? null : value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <span>Filter by status</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                      <SelectItem value="no-show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Tabs>
            </div>

            <div className="space-y-4">
              {selectedDate && (
                <h3 className="font-medium text-lg">
                  Interviews for {format(selectedDate, 'MMMM d, yyyy')}
                </h3>
              )}
              
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((interview) => (
                  <Card key={interview.id} className="overflow-hidden">
                    <div className={`
                      border-l-4 
                      ${interview.status === 'scheduled' ? 'border-blue-500' : ''}
                      ${interview.status === 'completed' ? 'border-green-500' : ''}
                      ${interview.status === 'canceled' ? 'border-red-500' : ''}
                      ${interview.status === 'no-show' ? 'border-amber-500' : ''}
                    `}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{interview.candidateName}</h3>
                            <p className="text-sm text-muted-foreground">{interview.jobTitle}</p>
                            
                            <div className="flex items-center mt-2">
                              <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm mr-3">{format(interview.date, 'MMM d, yyyy')}</span>
                              
                              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm">{interview.time} ({interview.duration} min)</span>
                            </div>
                            
                            <div className="flex items-center mt-2">
                              {interview.isVirtual ? (
                                <>
                                  <Video className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span className="text-sm">Virtual Interview</span>
                                  {interview.meetingLink && (
                                    <a 
                                      href={interview.meetingLink} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:underline flex items-center ml-2"
                                    >
                                      Join Meeting <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                  )}
                                </>
                              ) : (
                                <>
                                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span className="text-sm">{interview.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            {getStatusBadge(interview.status)}
                            
                            <div className="mt-4 space-x-2">
                              <Button variant="outline" size="sm">Details</Button>
                              <Button size="sm">Reschedule</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <CalendarIcon className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium">No interviews found</h3>
                  <p className="text-muted-foreground mt-1">
                    {selectedDate 
                      ? `No interviews scheduled for ${format(selectedDate, 'MMMM d, yyyy')}` 
                      : "No interviews scheduled"}
                  </p>
                  <Button className="mt-4" onClick={() => setIsAddInterviewOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" />
                    Schedule Interview
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewSchedulingTab;
