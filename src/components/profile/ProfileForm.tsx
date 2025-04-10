
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';

interface ProfileFormProps {
  user: User;
  userProfile: UserProfile;
  isEditing?: boolean;
  firstName?: string;
  setFirstName?: (value: string) => void;
  lastName?: string;
  setLastName?: (value: string) => void;
  email?: string;
  bio?: string;
  setBio?: (value: string) => void;
  phoneNumber?: string;
  setPhoneNumber?: (value: string) => void;
  zipCode?: string;
  setZipCode?: (value: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  user, 
  userProfile,
  isEditing = true,
  firstName: propFirstName,
  setFirstName: propSetFirstName,
  lastName: propLastName,
  setLastName: propSetLastName,
  email: propEmail,
  bio: propBio,
  setBio: propSetBio,
  phoneNumber: propPhoneNumber,
  setPhoneNumber: propSetPhoneNumber,
  zipCode: propZipCode,
  setZipCode: propSetZipCode
}) => {
  // Internal state if props not provided
  const [internalIsEditing, setInternalIsEditing] = useState(isEditing);
  const [internalFirstName, setInternalFirstName] = useState(propFirstName || userProfile?.first_name || '');
  const [internalLastName, setInternalLastName] = useState(propLastName || userProfile?.last_name || '');
  const [internalBio, setInternalBio] = useState(propBio || userProfile?.bio || '');
  const [internalPhoneNumber, setInternalPhoneNumber] = useState(propPhoneNumber || userProfile?.contact_details_encrypted || '');
  const [internalZipCode, setInternalZipCode] = useState(propZipCode || userProfile?.location || '');
  
  // Use prop handlers if provided, otherwise use internal state handlers
  const firstName = propFirstName !== undefined ? propFirstName : internalFirstName;
  const setFirstName = propSetFirstName || setInternalFirstName;
  const lastName = propLastName !== undefined ? propLastName : internalLastName;
  const setLastName = propSetLastName || setInternalLastName;
  const bio = propBio !== undefined ? propBio : internalBio;
  const setBio = propSetBio || setInternalBio;
  const phoneNumber = propPhoneNumber !== undefined ? propPhoneNumber : internalPhoneNumber;
  const setPhoneNumber = propSetPhoneNumber || setInternalPhoneNumber;
  const zipCode = propZipCode !== undefined ? propZipCode : internalZipCode;
  const setZipCode = propSetZipCode || setInternalZipCode;
  
  const handleSave = async () => {
    try {
      // Simulate saving profile
      toast.success('Profile updated successfully!');
      setInternalIsEditing(false);
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
              disabled={!internalIsEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!internalIsEditing}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            value={propEmail || user?.email || ''}
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
            disabled={!internalIsEditing}
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
              disabled={!internalIsEditing}
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input 
              id="zipCode" 
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              disabled={!internalIsEditing}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {!internalIsEditing ? (
          <Button 
            onClick={() => setInternalIsEditing(true)}
            variant="outline"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              onClick={() => setInternalIsEditing(false)}
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
