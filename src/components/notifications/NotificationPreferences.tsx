
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NotificationPreferences as NotificationPreferencesType } from '@/types/notification-preferences';
import { fetchNotificationPreferences, updateNotificationPreferences } from '@/lib/supabase/notifications';
import { AlertCircle, Bell, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState<NotificationPreferencesType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadPreferences = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchNotificationPreferences(user.id);
        setPreferences(data);
      } catch (error) {
        console.error('Error loading notification preferences:', error);
        setError('Failed to load notification preferences. Please try again.');
        
        toast({
          title: 'Error',
          description: 'Failed to load notification preferences.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [user, toast]);

  const handleTogglePreference = (key: keyof Omit<NotificationPreferencesType, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!preferences) return;
    
    setPreferences(prev => prev ? {
      ...prev,
      [key]: !prev[key]
    } : null);
  };

  const handleSavePreferences = async () => {
    if (!user || !preferences) return;
    
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);
    
    try {
      const updatedPrefs = {
        email_notifications: preferences.email_notifications,
        push_notifications: preferences.push_notifications,
        job_notifications: preferences.job_notifications,
        application_notifications: preferences.application_notifications,
        message_notifications: preferences.message_notifications,
        account_notifications: preferences.account_notifications,
        achievement_notifications: preferences.achievement_notifications
      };
      
      await updateNotificationPreferences(user.id, updatedPrefs);
      
      setSaveSuccess(true);
      toast({
        title: 'Preferences updated',
        description: 'Your notification preferences have been saved.',
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      setError('Failed to save notification preferences. Please try again.');
      
      toast({
        title: 'Error',
        description: 'Failed to save notification preferences.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!preferences) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load notification preferences. Please refresh the page to try again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Manage how you want to be notified
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {saveSuccess && (
          <Alert className="mb-4 border-green-500 text-green-500">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your preferences have been saved.</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notification Channels</h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <label htmlFor="email_toggle" className="text-sm font-medium">
                Email Notifications
              </label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              id="email_toggle"
              checked={preferences.email_notifications}
              onCheckedChange={() => handleTogglePreference('email_notifications')}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <label htmlFor="push_toggle" className="text-sm font-medium">
                Push Notifications
              </label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in your browser
              </p>
            </div>
            <Switch
              id="push_toggle"
              checked={preferences.push_notifications}
              onCheckedChange={() => handleTogglePreference('push_notifications')}
            />
          </div>
        </div>
        
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-medium">Notification Categories</h3>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <label htmlFor="job_toggle" className="text-sm font-medium">
                Job Notifications
              </label>
              <p className="text-sm text-muted-foreground">
                New job listings, matches, and recommendations
              </p>
            </div>
            <Switch
              id="job_toggle"
              checked={preferences.job_notifications}
              onCheckedChange={() => handleTogglePreference('job_notifications')}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <label htmlFor="application_toggle" className="text-sm font-medium">
                Application Updates
              </label>
              <p className="text-sm text-muted-foreground">
                Status changes and reminders for your job applications
              </p>
            </div>
            <Switch
              id="application_toggle"
              checked={preferences.application_notifications}
              onCheckedChange={() => handleTogglePreference('application_notifications')}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <label htmlFor="message_toggle" className="text-sm font-medium">
                Messages
              </label>
              <p className="text-sm text-muted-foreground">
                Direct messages from employers or other users
              </p>
            </div>
            <Switch
              id="message_toggle"
              checked={preferences.message_notifications}
              onCheckedChange={() => handleTogglePreference('message_notifications')}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <label htmlFor="account_toggle" className="text-sm font-medium">
                Account Updates
              </label>
              <p className="text-sm text-muted-foreground">
                Security alerts and account-related information
              </p>
            </div>
            <Switch
              id="account_toggle"
              checked={preferences.account_notifications}
              onCheckedChange={() => handleTogglePreference('account_notifications')}
            />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <label htmlFor="achievement_toggle" className="text-sm font-medium">
                Achievements
              </label>
              <p className="text-sm text-muted-foreground">
                Skills progress, certificates, and milestone rewards
              </p>
            </div>
            <Switch
              id="achievement_toggle"
              checked={preferences.achievement_notifications}
              onCheckedChange={() => handleTogglePreference('achievement_notifications')}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSavePreferences} 
          disabled={isLoading || isSaving}
          className="ml-auto"
        >
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};
