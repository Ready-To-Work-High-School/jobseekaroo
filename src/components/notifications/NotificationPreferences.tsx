
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/auth';
import { NotificationPreferences } from '@/types/notification-preferences';

const NotificationPreferencesComponent = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    const fetchPreferences = async () => {
      try {
        const { data, error } = await supabase
          .from('notification_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (error) {
          if (error.code === 'PGRST116') {
            // No preferences found, create default preferences
            await createDefaultPreferences();
          } else {
            throw error;
          }
        } else {
          setPreferences(data);
        }
      } catch (error) {
        console.error('Error fetching notification preferences:', error);
        toast({
          title: 'Error',
          description: 'Failed to load notification preferences',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPreferences();
  }, [user, toast]);

  const createDefaultPreferences = async () => {
    if (!user) return;
    
    try {
      const defaultPreferences = {
        user_id: user.id,
        email_notifications: true,
        push_notifications: true,
        job_notifications: true,
        application_notifications: true,
        message_notifications: true,
        account_notifications: true,
        achievement_notifications: true,
      };
      
      const { data, error } = await supabase
        .from('notification_preferences')
        .insert(defaultPreferences)
        .select()
        .single();
        
      if (error) throw error;
      
      setPreferences(data);
    } catch (error) {
      console.error('Error creating default preferences:', error);
    }
  };

  const handleToggleChange = async (field: keyof NotificationPreferences, value: boolean) => {
    if (!preferences || !user) return;
    
    try {
      const { error } = await supabase
        .from('notification_preferences')
        .update({ [field]: value })
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setPreferences({ ...preferences, [field]: value });
      
      toast({
        title: 'Preferences Updated',
        description: 'Your notification preferences have been saved',
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to update preferences',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading preferences...</div>;
  }

  if (!preferences) {
    return <div className="p-6 text-center">No preferences found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex flex-col">
              <span>Email Notifications</span>
              <span className="text-sm text-muted-foreground">
                Receive notifications via email
              </span>
            </Label>
            <Switch
              id="email-notifications"
              checked={preferences.email_notifications}
              onCheckedChange={(value) => handleToggleChange('email_notifications', value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications" className="flex flex-col">
              <span>Push Notifications</span>
              <span className="text-sm text-muted-foreground">
                Receive push notifications in your browser
              </span>
            </Label>
            <Switch
              id="push-notifications"
              checked={preferences.push_notifications}
              onCheckedChange={(value) => handleToggleChange('push_notifications', value)}
            />
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-3">Notification Types</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="job-notifications">Job Notifications</Label>
                <Switch
                  id="job-notifications"
                  checked={preferences.job_notifications}
                  onCheckedChange={(value) => handleToggleChange('job_notifications', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="application-notifications">Application Notifications</Label>
                <Switch
                  id="application-notifications"
                  checked={preferences.application_notifications}
                  onCheckedChange={(value) => handleToggleChange('application_notifications', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="message-notifications">Message Notifications</Label>
                <Switch
                  id="message-notifications"
                  checked={preferences.message_notifications}
                  onCheckedChange={(value) => handleToggleChange('message_notifications', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="account-notifications">Account Notifications</Label>
                <Switch
                  id="account-notifications"
                  checked={preferences.account_notifications}
                  onCheckedChange={(value) => handleToggleChange('account_notifications', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="achievement-notifications">Achievement Notifications</Label>
                <Switch
                  id="achievement-notifications"
                  checked={preferences.achievement_notifications}
                  onCheckedChange={(value) => handleToggleChange('achievement_notifications', value)}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationPreferencesComponent;
