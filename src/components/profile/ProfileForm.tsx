
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export interface ProfileFormProps {
  user: any;
  userProfile: any;
  isEditing: boolean;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  bio: string;
  setBio: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
}

const ProfileForm = ({ user, userProfile }: { user: any, userProfile: any }) => {
  // State for form fields
  const [isEditing, setIsEditing] = useState(true);
  const [firstName, setFirstName] = useState(userProfile?.firstName || '');
  const [lastName, setLastName] = useState(userProfile?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || '');
  const [zipCode, setZipCode] = useState(userProfile?.zipCode || '');
  
  const handleSave = async () => {
    try {
      // Simulate saving profile
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            value={email}
            disabled
            type="email"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed. Contact support if you need to update your email address.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={!isEditing}
            placeholder="Write a short bio about yourself..."
            className="min-h-[120px]"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={!isEditing}
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input 
              id="zipCode" 
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isEditing ? (
          <Button 
            onClick={() => setIsEditing(true)}
            variant="outline"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsEditing(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileForm;
