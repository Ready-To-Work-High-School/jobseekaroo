
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { fetchNotificationPreferences, updateNotificationPreferences } from '@/lib/supabase/notifications';

const NotificationPreferences = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    inApp: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);
  
  const loadPreferences = async () => {
    if (!user) return;
    setIsLoading(true);
    
    try {
      // For now, we'll use a dummy implementation since the function doesn't exist
      // This would normally call fetchNotificationPreferences from lib/supabase/notifications
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data) {
        setPreferences({
          email: data.email_enabled ?? true,
          push: data.push_enabled ?? true,
          inApp: data.in_app_enabled ?? true,
        });
      }
    } catch (error) {
      console.error('Error loading notification preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your notification preferences',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const savePreferences = async () => {
    if (!user) return;
    setIsSaving(true);
    
    try {
      // For now, we'll use a dummy implementation since the function doesn't exist
      // This would normally call updateNotificationPreferences from lib/supabase/notifications
      const { error } = await supabase
        .from('notification_preferences')
        .upsert({
          user_id: user.id,
          email_enabled: preferences.email,
          push_enabled: preferences.push,
          in_app_enabled: preferences.inApp,
          updated_at: new Date().toISOString()
        });
        
      if (error) throw error;
      
      toast({
        title: 'Preferences Updated',
        description: 'Your notification preferences have been saved'
      });
    } catch (error) {
      console.error('Error saving notification preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to save your notification preferences',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose how you want to receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch 
            id="email-notifications"
            checked={preferences.email}
            onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, email: checked }))}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications on your devices
            </p>
          </div>
          <Switch 
            id="push-notifications"
            checked={preferences.push}
            onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, push: checked }))}
            disabled={isLoading}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="in-app-notifications">In-App Notifications</Label>
            <p className="text-sm text-muted-foreground">
              See notifications inside the application
            </p>
          </div>
          <Switch 
            id="in-app-notifications"
            checked={preferences.inApp}
            onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, inApp: checked }))}
            disabled={isLoading}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={savePreferences} disabled={isLoading || isSaving}>
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationPreferences;
