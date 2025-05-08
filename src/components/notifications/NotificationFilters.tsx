
import React from 'react';
import { useNotifications } from '@/contexts/notifications/NotificationsContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Briefcase, 
  MessageSquare, 
  Check, 
  CircleAlert 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NotificationFilters = () => {
  const { 
    filterType, 
    setFilterType, 
    filterStatus,
    setFilterStatus
  } = useNotifications();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Filter Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Type Filter */}
        <div>
          <h4 className="text-xs font-medium mb-2">Type</h4>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilterType(null)} 
              className={`flex items-center text-xs px-3 py-1 rounded-full ${
                filterType === null 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Bell className="h-3 w-3 mr-1" />
              All
            </button>
            <button 
              onClick={() => setFilterType('system')} 
              className={`flex items-center text-xs px-3 py-1 rounded-full ${
                filterType === 'system' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Bell className="h-3 w-3 mr-1" />
              System
            </button>
            <button 
              onClick={() => setFilterType('job')} 
              className={`flex items-center text-xs px-3 py-1 rounded-full ${
                filterType === 'job' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <Briefcase className="h-3 w-3 mr-1" />
              Jobs
            </button>
            <button 
              onClick={() => setFilterType('application')} 
              className={`flex items-center text-xs px-3 py-1 rounded-full ${
                filterType === 'application' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <CircleAlert className="h-3 w-3 mr-1" />
              Applications
            </button>
            <button 
              onClick={() => setFilterType('message')} 
              className={`flex items-center text-xs px-3 py-1 rounded-full ${
                filterType === 'message' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              Messages
            </button>
          </div>
        </div>

        {/* Read Status Filter */}
        <div>
          <h4 className="text-xs font-medium mb-2">Status</h4>
          <Tabs 
            defaultValue={filterStatus} 
            className="w-full"
            onValueChange={(value) => setFilterStatus(value as 'all' | 'unread' | 'read')}
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                <CircleAlert className="h-3 w-3 mr-1" /> Unread
              </TabsTrigger>
              <TabsTrigger value="read" className="text-xs">
                <Check className="h-3 w-3 mr-1" /> Read
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationFilters;
