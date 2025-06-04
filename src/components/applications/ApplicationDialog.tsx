import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ApplicationForm from './ApplicationForm';

interface ApplicationDialogProps {
  open: boolean;
  onClose: () => void;
  jobId?: string;
  jobTitle?: string;
  companyName?: string;
  onSuccess?: () => void;
}

const ApplicationDialog: React.FC<ApplicationDialogProps> = ({
  open,
  onClose,
  jobId,
  jobTitle,
  companyName,
  onSuccess
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Track Your Application</DialogTitle>
        </DialogHeader>
        <ApplicationForm 
          jobId={jobId}
          jobTitle={jobTitle}
          companyName={companyName}
          onSuccess={onSuccess}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
