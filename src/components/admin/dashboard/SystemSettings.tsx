
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const SystemSettings = () => {
  const handleSettingChange = (setting: string, enabled: boolean) => {
    toast({
      title: `${setting} ${enabled ? 'enabled' : 'disabled'}`,
      description: `The ${setting.toLowerCase()} setting has been updated.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">System Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">User Registration</label>
              <p className="text-xs text-muted-foreground">Allow new user signups</p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={(checked) => handleSettingChange('User Registration', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Maintenance Mode</label>
              <p className="text-xs text-muted-foreground">Disable public access</p>
            </div>
            <Switch
              onCheckedChange={(checked) => handleSettingChange('Maintenance Mode', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSettings;
