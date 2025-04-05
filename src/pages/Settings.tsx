
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Bell, Globe, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';

const Settings = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const fadeIn = useFadeIn(300);
  
  return (
    <Layout>
      <div className={`container mx-auto py-8 px-4 max-w-5xl ${fadeIn}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:grid-cols-4 grid-cols-2 gap-2">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" defaultValue={userProfile?.first_name || ''} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" defaultValue={userProfile?.last_name || ''} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email || ''} disabled />
                  <p className="text-xs text-muted-foreground">
                    Your email is used for account verification and communications.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio" 
                    className="w-full min-h-[100px] p-2 border rounded-md resize-y" 
                    placeholder="Tell us about yourself"
                    defaultValue={userProfile?.bio || ''}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
                <CardDescription>
                  Control who can see your profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-public">Public profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your profile visible to employers
                    </p>
                  </div>
                  <Switch id="profile-public" defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="resume-public">Public resume</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow employers to view your resume
                    </p>
                  </div>
                  <Switch id="resume-public" defaultChecked={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-2fa">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with two-factor authentication
                    </p>
                  </div>
                  <Switch id="enable-2fa" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive job alerts and application updates via email
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="job-recommendations">Job recommendations</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive personalized job recommendations
                    </p>
                  </div>
                  <Switch id="job-recommendations" defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails">Marketing emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive newsletters and promotional content
                    </p>
                  </div>
                  <Switch id="marketing-emails" defaultChecked={false} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your data and privacy preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-collection">Data collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to collect usage data to improve your experience
                    </p>
                  </div>
                  <Switch id="data-collection" defaultChecked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="third-party">Third-party sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow sharing your data with trusted partners
                    </p>
                  </div>
                  <Switch id="third-party" defaultChecked={false} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-amber-50 dark:bg-amber-950/30">
                <CardTitle className="text-amber-800 dark:text-amber-500 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <p className="text-sm text-muted-foreground">
                  These actions will permanently affect your account data.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start">
                    Download my data
                  </Button>
                  <Button variant="outline" className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                    Delete my account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
