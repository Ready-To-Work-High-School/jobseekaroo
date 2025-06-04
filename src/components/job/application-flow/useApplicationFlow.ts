
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Job } from '@/types/job';

interface UseApplicationFlowProps {
  job: Job;
  onClose: () => void;
}

export const useApplicationFlow = ({ job, onClose }: UseApplicationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { user, createApplication } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 3;
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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
      // Create the application in the user's dashboard with required fields only
      await createApplication(job.id, {
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

  return {
    currentStep,
    totalSteps,
    isSubmitting,
    isComplete,
    handleBack,
    handleNext,
    handleSubmitApplication
  };
};
