
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PurchaseConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [jobInfo, setJobInfo] = useState<any>(null);
  
  const success = searchParams.get('success') === 'true';
  const sessionId = searchParams.get('session_id');
  const jobId = searchParams.get('job_id');
  const planType = searchParams.get('plan');
  
  useEffect(() => {
    const verifyPurchase = async () => {
      if (!success || !jobId) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Fetch job information
        const { data: job, error } = await supabase
          .from('jobs')
          .select('title, company_name, is_premium, is_featured')
          .eq('id', jobId)
          .single();
          
        if (error) throw error;
        setJobInfo(job);
        
        // If the job is already premium, we're good
        if (job.is_premium) {
          setIsLoading(false);
          return;
        }
        
        // If not yet premium, might be a delay with webhook
        // We'll check a few times and then show appropriate message
        let attempts = 0;
        const checkPremiumStatus = async () => {
          attempts++;
          const { data, error } = await supabase
            .from('jobs')
            .select('is_premium')
            .eq('id', jobId)
            .single();
          
          if (!error && data?.is_premium) {
            setJobInfo(prev => ({ ...prev, is_premium: true }));
            setIsLoading(false);
          } else if (attempts < 3) {
            // Try again in 2 seconds
            setTimeout(checkPremiumStatus, 2000);
          } else {
            // After 3 attempts, show message that it may take a few minutes
            setIsLoading(false);
          }
        };
        
        checkPremiumStatus();
      } catch (error) {
        console.error('Error verifying purchase:', error);
        setIsLoading(false);
      }
    };
    
    verifyPurchase();
  }, [success, jobId, sessionId]);
  
  const handleContinue = () => {
    navigate('/employer-dashboard');
  };
  
  if (!success && !isLoading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-amber-500 mb-2" />
          <CardTitle>Payment Canceled</CardTitle>
          <CardDescription>
            Your premium posting was not completed. No charges were made.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={handleContinue}>
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CheckCircle2 className="w-12 h-12 mx-auto text-green-500 mb-2" />
        <CardTitle>Payment Successful!</CardTitle>
        <CardDescription>
          {isLoading 
            ? 'Processing your premium job posting...'
            : `Your job posting has been upgraded to premium${planType === 'premium_analytics_post' ? ' with analytics' : ''}.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {jobInfo && (
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium">{jobInfo.title}</h3>
            <p className="text-sm text-muted-foreground">{jobInfo.company_name}</p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                {planType === 'premium_analytics_post' ? 'Premium + Analytics' : 'Premium'}
              </span>
            </div>
          </div>
        )}
        
        {!isLoading && !jobInfo?.is_premium && (
          <p className="mt-4 text-sm text-muted-foreground">
            Your payment was successful, but it may take a few minutes for all premium features to be activated.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleContinue} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Go to Dashboard'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PurchaseConfirmation;
