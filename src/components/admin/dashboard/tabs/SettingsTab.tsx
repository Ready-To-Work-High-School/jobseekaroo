
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useCeoStatus } from '@/components/admin/redemption/tab-manager/useCeoStatus';
import { useToast } from '@/hooks/use-toast';
import { SaveIcon, SettingsIcon, BellIcon, LockIcon, UserIcon } from 'lucide-react';

const SettingsTab: React.FC = () => {
  const { isCeo } = useCeoStatus();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
        <CardDescription>Configure system settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="general">
              <SettingsIcon className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <BellIcon className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <LockIcon className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="permissions">
              <UserIcon className="h-4 w-4 mr-2" />
              Permissions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" defaultValue="Job Seekers 4 HS" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea id="siteDescription" defaultValue="Platform connecting high school students with job opportunities" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="adminEmail">Admin Contact Email</Label>
                <Input id="adminEmail" type="email" defaultValue="admin@jobseekers4hs.org" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="emailNotifications" defaultChecked />
                <Label htmlFor="emailNotifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="appNotifications" defaultChecked />
                <Label htmlFor="appNotifications">In-App Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="marketingEmails" />
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="digestFrequency">Email Digest Frequency</Label>
                <select className="block w-full p-2 border rounded">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Never</option>
                </select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="twoFactor" />
                <Label htmlFor="twoFactor">Require Two-Factor Authentication</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="failedAttempts" defaultChecked />
                <Label htmlFor="failedAttempts">Lock Accounts After Failed Attempts</Label>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="60" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="passwordPolicy">Password Policy</Label>
                <select className="block w-full p-2 border rounded">
                  <option>Basic (8+ characters)</option>
                  <option>Medium (8+ chars with numbers)</option>
                  <option>Strong (8+ chars with numbers and symbols)</option>
                </select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="permissions" className="space-y-4 pt-4">
            <div className="grid gap-4">
              {isCeo && (
                <>
                  <div className="flex items-center space-x-2">
                    <Switch id="adminApprovals" defaultChecked />
                    <Label htmlFor="adminApprovals">Require CEO Approval for Admin Actions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="analyticsAccess" defaultChecked />
                    <Label htmlFor="analyticsAccess">Allow Admins to Access Analytics</Label>
                  </div>
                </>
              )}
              <div className="flex items-center space-x-2">
                <Switch id="employerApprovals" defaultChecked />
                <Label htmlFor="employerApprovals">Require Admin Approval for New Employers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="studentAccess" defaultChecked />
                <Label htmlFor="studentAccess">Allow Students to Contact Employers</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-1">
          <SaveIcon className="h-4 w-4" />
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SettingsTab;
