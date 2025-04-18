
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, CalendarDays, Clock, Edit, Globe, MapPin, Plus, Search, Share2, Trash, Users, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface CareerEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  isVirtual: boolean;
  meetingLink?: string;
  maxParticipants?: number;
  registeredParticipants: number;
}

const MOCK_EVENTS: CareerEvent[] = [
  {
    id: '1',
    title: 'Retail Career Fair',
    description: 'Meet potential candidates interested in retail positions. Showcase your company culture and job opportunities.',
    date: new Date(2024, 0, 15), // January 15, 2024
    time: '10:00 AM - 2:00 PM',
    location: 'Westside High School, Gymnasium',
    isVirtual: false,
    maxParticipants: 100,
    registeredParticipants: 45
  },
  {
    id: '2',
    title: 'Administrative Skills Workshop',
    description: 'Host a workshop teaching essential administrative skills to students.',
    date: new Date(2024, 1, 5), // February 5, 2024
    time: '1:00 PM - 3:00 PM',
    location: '',
    isVirtual: true,
    meetingLink: 'https://zoom.us/j/123456789',
    maxParticipants: 50,
    registeredParticipants: 28
  },
  {
    id: '3',
    title: 'Customer Service Training',
    description: 'Provide training on customer service best practices for interested students.',
    date: new Date(2023, 11, 8), // December 8, 2023
    time: '9:00 AM - 12:00 PM',
    location: 'Company Headquarters, Training Room',
    isVirtual: false,
    maxParticipants: 30,
    registeredParticipants: 30
  }
];

const CareerEventsTab = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<CareerEvent[]>(MOCK_EVENTS);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCreateEvent = () => {
    // In a real app, this would create a new event in the database
    setIsAddEventOpen(false);
  };
  
  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };
  
  const formatEventDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy');
  };

  return (
    <Card>
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Career Events</CardTitle>
        </div>
        <CardDescription>
          Participate in career events and connect with promising students
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events"
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Career Event</DialogTitle>
                <DialogDescription>
                  Set up a new career event to connect with potential candidates
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="e.g., Retail Career Fair" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the event's purpose and what students can expect..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Event Date</Label>
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
                    <Label htmlFor="time">Event Time</Label>
                    <Input id="time" placeholder="e.g., 10:00 AM - 2:00 PM" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isVirtual">Virtual Event</Label>
                    <Switch id="isVirtual" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="location">Location or Meeting Link</Label>
                  <Input id="location" placeholder="Enter physical location or virtual meeting link" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="maxParticipants">Maximum Participants</Label>
                  <Input id="maxParticipants" type="number" placeholder="e.g., 50" />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Event</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">{event.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{formatEventDate(event.date)}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {event.isVirtual ? (
                        <div className="flex items-center">
                          <Video className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Virtual Event</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>
                          {event.registeredParticipants}{event.maxParticipants ? `/${event.maxParticipants}` : ''}
                        </span>
                        
                        {event.maxParticipants && event.registeredParticipants >= event.maxParticipants && (
                          <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-800 border-amber-200">
                            Full
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500" 
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <CalendarDays className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium">No career events found</h3>
                    <p className="text-muted-foreground mt-1">
                      {searchTerm 
                        ? "No events match your search term" 
                        : "You haven't created any career events yet"}
                    </p>
                    <Button className="mt-4" onClick={() => setIsAddEventOpen(true)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Create Event
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredEvents.length} of {events.length} events
        </div>
        
        <Button variant="outline" size="sm">
          <Globe className="h-4 w-4 mr-2" />
          View Public Events
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CareerEventsTab;
