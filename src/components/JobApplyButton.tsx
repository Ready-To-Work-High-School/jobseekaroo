
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface JobApplyButtonProps {
  jobId: string;
  onApply?: () => void;
}

const JobApplyButton: React.FC<JobApplyButtonProps> = ({ jobId, onApply }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleApply = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to apply for jobs",
        variant: "destructive",
      });
      return;
    }

    setIsApplying(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasApplied(true);
      toast({
        title: "Application submitted!",
        description: "Your application has been sent to the employer",
      });
      
      onApply?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  if (hasApplied) {
    return (
      <Button disabled className="w-full">
        <CheckCircle className="mr-2 h-4 w-4" />
        Applied
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleApply} 
      disabled={isApplying}
      className="w-full"
    >
      {isApplying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isApplying ? 'Applying...' : 'Apply Now'}
    </Button>
  );
};

export default JobApplyButton;
