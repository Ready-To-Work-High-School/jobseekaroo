
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useNotifications } from '@/contexts/NotificationsContext';
import { NotificationItem } from '@/components/notifications/NotificationItem';
import { EmptyNotifications } from '@/components/notifications/EmptyNotifications';
import { NotificationFilters } from '@/components/notifications/NotificationFilters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotificationPreferences } from '@/components/notifications/NotificationPreferences';
import { Button } from '@/components/ui/button';
import { Loader2, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { 
    filteredNotifications, 
    unreadCount, 
    markAllAsRead, 
    clearAll,
    isLoading,
    errorMessage
  } = useNotifications();

  const handleClearAll = () => {
    clearAll();
    setIsDeleteDialogOpen(false);
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 max-w-6xl">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              <p className="text-muted-foreground mt-1">
                Manage your notifications and settings
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
                <TabsTrigger value="all">All Notifications</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      You have {unreadCount} unread notifications
                    </CardDescription>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {unreadCount > 0 && (
                      <Button size="sm" variant="outline" onClick={markAllAsRead}>
                        Mark all as read
                      </Button>
                    )}
                    
                    {filteredNotifications.length > 0 && (
                      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-red-500 border-red-200">
                            <Trash className="h-4 w-4 mr-2" />
                            Clear All
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Clear all notifications?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete all your notifications.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleClearAll} className="bg-red-500 hover:bg-red-600">
                              Clear All
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-3">
                <NotificationFilters />
                
                {isLoading ? (
                  <div className="divide-y border rounded-lg">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="p-4 flex gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : errorMessage ? (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                ) : filteredNotifications.length > 0 ? (
                  <div className="divide-y border rounded-lg">
                    {filteredNotifications.map((notification) => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification} 
                        onClose={() => {}} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <EmptyNotifications />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <NotificationPreferences />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Notifications;
