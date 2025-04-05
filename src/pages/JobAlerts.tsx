
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Bell } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';

const notificationTypes = [
  { value: 'job', label: 'New Job Alert' },
  { value: 'application', label: 'Application Update' },
  { value: 'general', label: 'General Announcement' },
];

const JobAlerts = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<string>('job');
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();
  const fadeIn = useFadeIn(300);
  
  const handleSendAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      // First add a notification entry to the database
      const { error } = await supabase
        .from('notifications')
        .insert([
          {
            title,
            message,
            type,
            user_id: user?.id, // For testing, we're sending the notification to ourselves
            read: false
          }
        ]);

      if (error) {
        throw error;
      }
        
      toast({
        title: 'Alert sent',
        description: 'Your notification has been sent successfully.'
      });
        
      // Clear the form
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('Error sending alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to send notification',
        variant: 'destructive'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout>
      <div className={`container max-w-5xl mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Alerts</h1>
            <p className="text-muted-foreground">
              Create notifications to send to users about job opportunities and updates
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <form onSubmit={handleSendAlert}>
              <CardHeader>
                <CardTitle>Create Job Alert</CardTitle>
                <CardDescription>
                  Notifications will be sent in real-time to users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notificationType">Notification Type</Label>
                  <Select
                    value={type}
                    onValueChange={setType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      {notificationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Alert Title</Label>
                  <Input 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., New Job Opening: Software Developer"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Alert Message</Label>
                  <Textarea 
                    id="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the job opportunity or update..."
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSending}>
                  {isSending ? 'Sending...' : 'Send Notification'}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Preview</CardTitle>
              <CardDescription>
                This is how your notification will appear to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {type === 'job' ? (
                      <Bell className="h-5 w-5 text-blue-500" />
                    ) : type === 'application' ? (
                      <AlertCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Bell className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{title || 'Notification Title'}</h3>
                    <p className="text-sm text-muted-foreground">
                      {message || 'Your notification message will appear here. Add details about the job or update.'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default JobAlerts;
