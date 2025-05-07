
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Link, Globe, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CalendlyUserProfileProps {
  user: {
    name: string;
    email: string;
    timezone: string;
    scheduling_url: string;
    slug: string;
    avatar_url?: string | null;
  } | null;
  isLoading: boolean;
}

const CalendlyUserProfile = ({ user, isLoading }: CalendlyUserProfileProps) => {
  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!user) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendly Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No Calendly profile connected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {user.name}'s Calendly
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{user.timezone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Link className="h-4 w-4 text-muted-foreground" />
            <Button 
              variant="link" 
              className="text-sm p-0 h-auto" 
              asChild
            >
              <a href={user.scheduling_url} target="_blank" rel="noopener noreferrer">
                {user.scheduling_url}
              </a>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendlyUserProfile;
