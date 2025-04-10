
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Check, FileCheck, Clock, ArrowRight, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Job } from '@/types/job';
import { useAuth } from '@/contexts/AuthContext';

interface JobApplicationFlowProps {
  job: Job;
  onClose: () => void;
}

const JobApplicationFlow: React.FC<JobApplicationFlowProps> = ({ job, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { user, createApplication } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmitApplication();
    }
  };

  const handleSubmitApplication = async () => {
    if (!user) {
      toast.error("You must be signed in to apply for jobs");
      navigate("/sign-in");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create the application in the user's dashboard
      await createApplication({
        job_id: job.id,
        job_title: job.title,
        company: job.company.name,
        status: 'applied',
        applied_date: new Date().toISOString().substring(0, 10),
        notes: `Applied for ${job.title} at ${job.company.name}. Pay range: $${job.payRate.min}-$${job.payRate.max} ${job.payRate.period}.`,
      });

      // Show success state
      setIsSubmitting(false);
      setIsComplete(true);
      
      // Show success toast
      toast.success("Application submitted successfully!");
      
      // Analytics event
      try {
        if (window.gtag) {
          window.gtag('event', 'job_application_submitted', {
            'job_id': job.id,
            'job_title': job.title,
            'company': job.company.name
          });
        }
      } catch (err) {
        console.error("Analytics error:", err);
      }
      
    } catch (error) {
      console.error("Error submitting application:", error);
      setIsSubmitting(false);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 py-2">
            <h3 className="text-lg font-medium">Job Overview</h3>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 bg-muted/50 p-3 rounded-md">
                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company.name}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-muted-foreground">Pay Range</div>
                  <div className="font-medium">${job.payRate.min} - ${job.payRate.max} {job.payRate.period}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-muted-foreground">Location</div>
                  <div className="font-medium">{job.location.city}, {job.location.state}</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 py-2">
            <h3 className="text-lg font-medium">Confirm Your Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>Your profile information will be shared</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>This application will be tracked in your dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600" />
                <span>You'll receive status updates via email</span>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-md border border-amber-100 mt-4">
                <p className="text-sm text-amber-800">
                  Make sure your profile is up-to-date to increase your chances of getting hired!
                </p>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 py-2">
            <h3 className="text-lg font-medium">Submit Your Application</h3>
            <p className="text-sm text-muted-foreground">
              You're about to apply for {job.title} at {job.company.name}. 
              Once submitted, the employer will review your application and may contact you.
            </p>
            
            <div className="flex items-center justify-center py-4">
              <FileCheck className="h-16 w-16 text-primary" />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> After applying, follow up with the employer in 3-5 days if you haven't heard back.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderCompletionScreen = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-center flex flex-col items-center gap-2">
          <div className="bg-green-100 p-3 rounded-full">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          Application Submitted!
        </DialogTitle>
        <DialogDescription className="text-center max-w-sm mx-auto">
          Your application for <span className="font-medium">{job.title}</span> at{" "}
          <span className="font-medium">{job.company.name}</span> has been submitted successfully.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-6 py-6">
        <div className="border rounded-md p-4 bg-muted/30">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Next Steps
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <div className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-primary">1</span>
              </div>
              <span>The employer will review your application</span>
            </li>
            <li className="flex gap-2">
              <div className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-primary">2</span>
              </div>
              <span>You'll receive an email when there are updates</span>
            </li>
            <li className="flex gap-2">
              <div className="bg-primary/20 rounded-full h-5 w-5 flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-primary">3</span>
              </div>
              <span>Track your application status in your dashboard</span>
            </li>
          </ul>
        </div>
      </div>

      <DialogFooter className="flex sm:justify-between">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <Button onClick={() => navigate('/applications')} className="gap-1">
          View Applications
          <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogFooter>
    </>
  );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!isComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>Apply for Position</DialogTitle>
              <DialogDescription>Complete these steps to submit your application</DialogDescription>
            </DialogHeader>

            <div className="py-2">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span>Step {currentStep} of {totalSteps}</span>
                <span className="font-medium">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {renderStepContent()}

            <DialogFooter className="flex sm:justify-between gap-2">
              {currentStep > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              ) : (
                <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
              )}
              
              <Button 
                onClick={handleNext}
                disabled={isSubmitting}
                className="gap-1"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">◌</span>
                    Submitting...
                  </>
                ) : currentStep < totalSteps ? (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          renderCompletionScreen()
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationFlow;
