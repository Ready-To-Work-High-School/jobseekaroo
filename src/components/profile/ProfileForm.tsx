
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';

interface ProfileFormProps {
  isEditing: boolean;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  location: string;
  setLocation: (location: string) => void;
  user: User;
  userProfile: UserProfile | null;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  isEditing,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  bio,
  setBio,
  location,
  setLocation,
  user,
  userProfile,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us a little about yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          id="location"
          placeholder="Your Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">User ID</p>
          <p className="truncate">{user.id}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
