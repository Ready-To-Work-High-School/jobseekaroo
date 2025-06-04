
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { VerificationForm } from '@/components/employer/VerificationForm';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const VerificationFormContainer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = () => {
    toast({
      title: "Verification Submitted",
      description: "Your employer verification request has been submitted for review."
    });
    
    // Redirect to dashboard after successful submission
    navigate('/employer/dashboard');
  };

  const handleError = (error: Error) => {
    toast({
      title: "Submission Failed",
      description: error.message || "There was an error submitting your verification. Please try again.",
      variant: "destructive"
    });
    setIsSubmitting(false);
  };

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Employer Verification</CardTitle>
          <CardDescription>
            Complete this form to verify your business and start posting jobs for high school students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerificationForm 
            onSuccess={handleSuccess} 
            onError={handleError}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            userId={user?.id}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationFormContainer;
