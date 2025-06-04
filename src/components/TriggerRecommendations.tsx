
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, Loader2 } from 'lucide-react';

const TriggerRecommendations: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleGenerateRecommendations = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to get personalized job recommendations",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call to generate recommendations
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Recommendations updated!",
        description: "We've found new job opportunities that match your profile",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Get Fresh Recommendations
        </CardTitle>
        <CardDescription>
          Update your job recommendations based on your latest profile and preferences
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Button 
          onClick={handleGenerateRecommendations}
          disabled={isGenerating || !user}
          className="w-full"
        >
          {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isGenerating ? 'Generating...' : 'Get New Recommendations'}
        </Button>
        
        {!user && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Sign in to get personalized recommendations
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TriggerRecommendations;
