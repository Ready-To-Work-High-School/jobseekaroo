import React from 'react';
import { MfaSettings } from '@/components/auth/MfaSettings';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfileEdit: React.FC = () => {
  const { userProfile } = useAuth();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input type="text" id="firstName" value={userProfile?.first_name || ''} disabled />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input type="text" id="lastName" value={userProfile?.last_name || ''} disabled />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" value={userProfile?.email || ''} disabled />
          </div>
          <div>
            <Label htmlFor="userType">User Type</Label>
            <Input type="text" id="userType" value={userProfile?.user_type || ''} disabled />
          </div>
        </CardContent>
      </Card>
      
      <MfaSettings />
    </div>
  );
};

export default ProfileEdit;
