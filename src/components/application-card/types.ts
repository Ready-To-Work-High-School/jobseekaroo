
import { JobApplication, ApplicationStatus } from '@/types/application';

export interface ApplicationCardProps {
  application: JobApplication;
  onUpdate: () => void;
}

export interface StatusDropdownProps {
  application: JobApplication;
  onStatusChange: (newStatus: ApplicationStatus) => void;
  isLoading: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  isLoading: boolean;
}

export interface EditDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  application: JobApplication;
  onSave: (values: {
    notes: string;
    contactName: string;
    contactEmail: string;
    nextStep: string;
    nextStepDate: string;
  }) => void;
  isLoading: boolean;
}
