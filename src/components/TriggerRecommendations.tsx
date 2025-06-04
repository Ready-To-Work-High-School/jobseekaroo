
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { generateRecommendationsForUser } from '@/lib/supabase/recommendations';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface TriggerRecommendationsProps {
  className?: string;
}

export function TriggerRecommendations({ className }: TriggerRecommendationsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleGenerateRecommendations = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to generate job recommendations",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setStatus('loading');

    try {
      await generateRecommendationsForUser(user.id);
      setStatus('success');
      toast({
        title: "Success!",
        description: "Your job recommendations have been refreshed. They'll appear shortly.",
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setStatus('error');
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Refresh Job Recommendations</CardTitle>
        <CardDescription>
          Update your job recommendations based on your current profile information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Our system automatically updates your job recommendations daily. However, if you've recently updated your profile or want to see fresh recommendations, you can manually trigger an update.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          onClick={handleGenerateRecommendations} 
          disabled={isLoading}
          variant={status === 'error' ? "destructive" : "default"}
        >
          {status === 'loading' ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Updated!
            </>
          ) : status === 'error' ? (
            <>
              <AlertCircle className="h-4 w-4 mr-2" />
              Failed
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Recommendations
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
