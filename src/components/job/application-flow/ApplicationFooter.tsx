
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import Spinner from '@/components/ui/spinner';

interface ApplicationFooterProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
}

const ApplicationFooter: React.FC<ApplicationFooterProps> = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onBack,
  onNext,
  onCancel,
}) => {
  return (
    <DialogFooter className="flex sm:justify-between gap-2">
      {currentStep > 1 ? (
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
      ) : (
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      )}
      
      <Button 
        onClick={onNext}
        disabled={isSubmitting}
        className="gap-1.5"
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" />
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
  );
};

export default ApplicationFooter;
