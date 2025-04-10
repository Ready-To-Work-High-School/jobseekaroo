
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Job } from '@/types/job';

import StepProgress from './application-flow/StepProgress';
import Step1JobOverview from './application-flow/Step1JobOverview';
import Step2ConfirmDetails from './application-flow/Step2ConfirmDetails';
import Step3SubmitApplication from './application-flow/Step3SubmitApplication';
import ApplicationCompletionScreen from './application-flow/ApplicationCompletionScreen';
import ApplicationFooter from './application-flow/ApplicationFooter';
import { useApplicationFlow } from './application-flow/useApplicationFlow';

interface JobApplicationFlowProps {
  job: Job;
  onClose: () => void;
}

const JobApplicationFlow: React.FC<JobApplicationFlowProps> = ({ job, onClose }) => {
  const { 
    currentStep, 
    totalSteps, 
    isSubmitting,
    isComplete,
    handleBack,
    handleNext
  } = useApplicationFlow({ job, onClose });

  function renderStepContent() {
    switch (currentStep) {
      case 1:
        return <Step1JobOverview job={job} />;
      case 2:
        return <Step2ConfirmDetails />;
      case 3:
        return <Step3SubmitApplication job={job} />;
      default:
        return null;
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!isComplete ? (
          <>
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Apply for Position</h2>
                <p className="text-sm text-muted-foreground">Complete these steps to submit your application</p>
              </div>

              <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
              
              {renderStepContent()}
            </div>

            <ApplicationFooter 
              currentStep={currentStep}
              totalSteps={totalSteps}
              isSubmitting={isSubmitting}
              onBack={handleBack}
              onNext={handleNext}
              onCancel={onClose}
            />
          </>
        ) : (
          <ApplicationCompletionScreen job={job} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationFlow;
