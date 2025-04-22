
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { PencilIcon, Briefcase, MapPin, GraduationCap } from 'lucide-react';

const UserProfile = () => {
  const { user, userProfile } = useAuth();

  if (!user || !userProfile) {
    return (
      <Card className="user-profile">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Please sign in to view your profile
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const initials = userProfile.first_name && userProfile.last_name 
    ? `${userProfile.first_name.charAt(0)}${userProfile.last_name.charAt(0)}`
    : user.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <Card className="user-profile">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>My Profile</CardTitle>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile/edit">
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Edit profile</span>
            </Link>
          </Button>
        </div>
        <CardDescription>
          Manage your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-20 w-20">
            {userProfile.avatar_url ? (
              <AvatarImage src={userProfile.avatar_url} alt={userProfile.first_name} />
            ) : null}
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="text-xl font-medium">
              {userProfile.first_name} {userProfile.last_name}
            </h3>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {userProfile.job_title && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>{userProfile.job_title}</span>
            </div>
          )}
          
          {userProfile.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{userProfile.location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>Westside High School Student</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Button asChild variant="outline">
            <Link to="/profile">View Full Profile</Link>
          </Button>
          <Button asChild>
            <Link to="/student-dashboard">My Dashboard</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
