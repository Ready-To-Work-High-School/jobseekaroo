import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';

const Profile = () => {
  const { user, userProfile } = useAuth();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {user && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userProfile?.avatar_url || ''} alt="Profile" />
                  <AvatarFallback>
                    {userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p>{user.email}</p>
              </div>
              
              {userProfile && (
                <>
                  {userProfile.bio && (
                    <div>
                      <h3 className="font-medium">Bio</h3>
                      <p>{userProfile.bio}</p>
                    </div>
                  )}
                  
                  {userProfile.location && (
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p>{userProfile.location}</p>
                    </div>
                  )}
                  
                  {userProfile.job_title && (
                    <div>
                      <h3 className="font-medium">Job Title</h3>
                      <p>{userProfile.job_title}</p>
                    </div>
                  )}
                  
                  {userProfile.skills && userProfile.skills.length > 0 && (
                    <div>
                      <h3 className="font-medium">Skills</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userProfile.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
