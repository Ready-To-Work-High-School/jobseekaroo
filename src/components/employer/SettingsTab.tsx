
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Save } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const SettingsTab = () => {
  return (
    <Tabs defaultValue="company">
      <TabsList className="mb-6">
        <TabsTrigger value="company">Company Profile</TabsTrigger>
        <TabsTrigger value="account">Account Settings</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="company">
        <Card>
          <CardHeader className="bg-blue-50 border-b">
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-600" />
              <CardTitle>Company Profile</CardTitle>
            </div>
            <CardDescription>
              Create and customize your company profile to showcase your brand and culture to students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input id="company_name" placeholder="Enter company name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website_url">Company Website</Label>
              <Input id="website_url" placeholder="https://www.yourcompany.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe what your company does..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="culture_description">Culture and Values</Label>
              <Textarea 
                id="culture_description" 
                placeholder="Describe your company culture and values..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <Input type="file" accept="image/*" className="w-full" />
              <p className="text-xs text-muted-foreground mt-1">
                Recommended size: 400x400px. Max 2MB.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end border-t pt-6">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value="user@example.com" disabled />
                <p className="text-xs text-muted-foreground mt-1">
                  To change your email, please contact support.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Control how and when we contact you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Notification preferences are coming soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTab;
