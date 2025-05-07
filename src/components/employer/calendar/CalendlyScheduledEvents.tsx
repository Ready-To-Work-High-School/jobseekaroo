
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar, User, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

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

interface ScheduledEventsProps {
  events: CalendlyEvent[];
  isLoading: boolean;
  pagination: {
    count: number;
    next_page: string | null;
  } | null;
  onLoadMore: () => void;
  onPrevious: () => void;
  hasPrevious: boolean;
}

const CalendlyScheduledEvents = ({ 
  events, 
  isLoading, 
  pagination, 
  onLoadMore, 
  onPrevious,
  hasPrevious
}: ScheduledEventsProps) => {
  if (isLoading) {
    return (
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
    );
  }
  
  if (!events || events.length === 0) {
    return (
      <Card className="border-muted">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Scheduled Events</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any scheduled events yet.
            </p>
            <Button>Schedule Your First Meeting</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      canceled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
    };
    
    return variants[status.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  };
  
  const formatEventTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const dateStr = format(start, 'MMMM d, yyyy');
    const timeStr = `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
    
    return { dateStr, timeStr };
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {events.map((event) => {
          const { dateStr, timeStr } = formatEventTime(event.start_time, event.end_time);
          return (
            <Card key={event.uri} className="border-muted hover:border-muted-foreground/20 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">
                    {event.name || "Scheduled Meeting"}
                  </CardTitle>
                  <Badge className={`${getStatusBadge(event.status)}`}>
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{dateStr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{timeStr}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.location.type}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {event.invitees_counter.active} of {event.invitees_counter.total} invitees
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {(pagination || hasPrevious) && (
        <Pagination>
          <PaginationContent>
            {hasPrevious && (
              <PaginationItem>
                <PaginationPrevious onClick={onPrevious} />
              </PaginationItem>
            )}
            
            {pagination?.next_page && (
              <PaginationItem>
                <PaginationNext onClick={onLoadMore} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CalendlyScheduledEvents;
