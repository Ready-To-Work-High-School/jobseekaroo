
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import ProfileTabContent from '@/components/profile/ProfileTabContent';
import { Button } from '@/components/ui/button';
import { Award, Briefcase, MapPin, Mail, User, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const { user, userProfile, refreshProfile, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  
  // Form state
  const [firstName, setFirstName] = useState(userProfile?.first_name || '');
  const [lastName, setLastName] = useState(userProfile?.last_name || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [location, setLocation] = useState(userProfile?.location || '');

  // Update form state when profile data changes
  useState(() => {
    if (userProfile) {
      setFirstName(userProfile.first_name || '');
      setLastName(userProfile.last_name || '');
      setBio(userProfile.bio || '');
      setLocation(userProfile.location || '');
    }
  });
  
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        bio,
        location
      });
      
      setIsEditing(false);
      toast.success("Profile updated successfully");
      refreshProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-6">
                Please sign in to view your profile
              </p>
              <Button onClick={() => navigate('/sign-in')}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="security">Account & Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-4">
                <ProfileTabContent 
                  user={user}
                  userProfile={userProfile}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  bio={bio}
                  setBio={setBio}
                  location={location}
                  setLocation={setLocation}
                  handleUpdateProfile={handleUpdateProfile}
                />
              </TabsContent>
              
              <TabsContent value="security" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account & Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Password</h3>
                        <div className="flex items-center gap-4">
                          <p className="text-muted-foreground">••••••••</p>
                          <Button size="sm" variant="outline">Change Password</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userProfile?.avatar_url || ''} />
                    <AvatarFallback className="bg-primary text-white text-xl">
                      {userProfile?.first_name?.[0] || ''}
                      {userProfile?.last_name?.[0] || ''}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-semibold">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </h2>
                  
                  <p className="text-muted-foreground">{user.email}</p>
                  
                  {userProfile?.user_type && (
                    <Badge className="mt-2" variant="outline">
                      {userProfile.user_type.charAt(0).toUpperCase() + userProfile.user_type.slice(1)}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  {userProfile?.job_title && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.job_title}</span>
                    </div>
                  )}
                  
                  {userProfile?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
