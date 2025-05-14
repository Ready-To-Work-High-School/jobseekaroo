
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SettingsTab = () => {
  const { userProfile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [settings, setSettings] = React.useState({
    companyName: userProfile?.company_name || '',
    companyWebsite: userProfile?.company_website || '',
    emailNotifications: true,
    applicationAlerts: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSaveSettings = async () => {
    try {
      setIsUpdating(true);
      
      if (updateProfile) {
        await updateProfile({
          company_name: settings.companyName,
          company_website: settings.companyWebsite,
        });
        
        toast({
          title: "Settings Updated",
          description: "Your employer settings have been saved successfully."
        });
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employer Settings</CardTitle>
        <p className="text-muted-foreground mt-1">
          Manage your employer account settings and preferences
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                name="companyName"
                value={settings.companyName}
                onChange={handleInputChange}
                placeholder="Your company name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input 
                id="companyWebsite" 
                name="companyWebsite"
                value={settings.companyWebsite}
                onChange={handleInputChange}
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="font-normal cursor-pointer">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about important account updates
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="applicationAlerts" className="font-normal cursor-pointer">
                  Application Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone applies to your job postings
                </p>
              </div>
              <Switch
                id="applicationAlerts"
                checked={settings.applicationAlerts}
                onCheckedChange={(checked) => handleSwitchChange('applicationAlerts', checked)}
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={handleSaveSettings} 
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
