
import { useState } from 'react';
import { JobApplication, ApplicationStatus } from '@/types/application';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ApplicationCardContent } from './ApplicationCardContent';
import { ApplicationCardFooter } from './ApplicationCardFooter';
import { DeleteDialog } from './DeleteDialog';
import { EditDialog } from './EditDialog';
import { ApplicationCardProps } from './types';

export const ApplicationCard = ({ application, onUpdate }: ApplicationCardProps) => {
  const { updateApplicationStatus, deleteApplication } = useAuth();
  const { toast } = useToast();
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    setIsStatusDropdownOpen(false);
    setIsLoading(true);
    
    try {
      await updateApplicationStatus(application.id, newStatus);
      toast({
        title: "Status updated",
        description: `Application status updated to ${newStatus}`,
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "Failed to update application status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteApplication = async () => {
    setIsLoading(true);
    
    try {
      await deleteApplication(application.id);
      toast({
        title: "Application deleted",
        description: "Application has been deleted successfully",
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Error deleting application",
        description: "Failed to delete application",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handleSaveDetails = async (values: {
    notes: string;
    contactName: string;
    contactEmail: string;
    nextStep: string;
    nextStepDate: string;
  }) => {
    setIsLoading(true);
    
    try {
      // In the original, this was updateApplicationStatus but it also updated other fields
      await updateApplicationStatus(application.id, application.status);
      toast({
        title: "Notes saved",
        description: "Application details have been updated",
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Error saving notes",
        description: "Failed to update application details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowEditDialog(false);
    }
  };

  return (
    <Card className="w-full">
      <ApplicationCardContent application={application} />
      
      <ApplicationCardFooter
        onEdit={() => setShowEditDialog(true)}
        onDelete={() => setShowDeleteDialog(true)}
        onStatusChange={handleStatusChange}
        isStatusDropdownOpen={isStatusDropdownOpen}
        setIsStatusDropdownOpen={setIsStatusDropdownOpen}
        isLoading={isLoading}
      />

      <DeleteDialog
        isOpen={showDeleteDialog}
        setIsOpen={setShowDeleteDialog}
        onDelete={handleDeleteApplication}
        isLoading={isLoading}
      />

      <EditDialog
        isOpen={showEditDialog}
        setIsOpen={setShowEditDialog}
        application={application}
        onSave={handleSaveDetails}
        isLoading={isLoading}
      />
    </Card>
  );
};
