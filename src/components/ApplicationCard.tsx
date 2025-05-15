
import { useState } from 'react';
import { format } from 'date-fns';
import { JobApplication, ApplicationStatus } from '@/types/application';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { Building, Calendar, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ApplicationCardProps {
  application: JobApplication;
  onUpdate: () => void;
}

export const ApplicationCard = ({ application, onUpdate }: ApplicationCardProps) => {
  const { updateApplicationStatus, deleteApplication } = useAuth();
  const { toast } = useToast();
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [notes, setNotes] = useState(application.notes || '');
  const [contactName, setContactName] = useState(application.contact_name || '');
  const [contactEmail, setContactEmail] = useState(application.contact_email || '');
  const [nextStep, setNextStep] = useState(application.next_step || '');
  const [nextStepDate, setNextStepDate] = useState(application.next_step_date || '');
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

  const handleSaveNotes = async () => {
    setIsLoading(true);
    
    try {
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
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{application.job_title}</h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <Building className="h-4 w-4 mr-1" />
              <span>{application.company}</span>
            </div>
          </div>
          <ApplicationStatusBadge status={application.status} />
        </div>

        <div className="flex items-center text-sm text-muted-foreground mt-1 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Applied: {format(new Date(application.applied_date), 'MMM d, yyyy')}</span>
        </div>

        {application.notes && (
          <div className="mt-3 text-sm">
            <p className="text-muted-foreground line-clamp-2">{application.notes}</p>
          </div>
        )}

        {(application.next_step || application.next_step_date) && (
          <div className="mt-3 text-sm bg-secondary p-2 rounded-md">
            <div className="font-medium">Next Step:</div>
            <div className="text-muted-foreground mt-1 flex items-start gap-2">
              {application.next_step && (
                <span>{application.next_step}</span>
              )}
              {application.next_step_date && (
                <span className="text-muted-foreground">
                  {format(new Date(application.next_step_date), 'MMM d, yyyy')}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEditDialog(true)}
          disabled={isLoading}
        >
          <Pencil className="h-4 w-4 mr-1" /> Edit
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
          
          <DropdownMenu open={isStatusDropdownOpen} onOpenChange={setIsStatusDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" disabled={isLoading}>
                Update Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem onClick={() => handleStatusChange('applied')}>
                <ApplicationStatusBadge status="applied" className="w-full justify-start" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('interviewing')}>
                <ApplicationStatusBadge status="interviewing" className="w-full justify-start" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('offered')}>
                <ApplicationStatusBadge status="offered" className="w-full justify-start" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('accepted')}>
                <ApplicationStatusBadge status="accepted" className="w-full justify-start" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('rejected')}>
                <ApplicationStatusBadge status="rejected" className="w-full justify-start" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('withdrawn')}>
                <ApplicationStatusBadge status="withdrawn" className="w-full justify-start" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this application? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteApplication}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Application Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Application Details</DialogTitle>
            <DialogDescription>
              Update the details for your application to {application.company}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this application"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  placeholder="Contact person"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  placeholder="Contact email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextStep">Next Step</Label>
              <Input
                id="nextStep"
                placeholder="e.g., Phone Interview"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nextStepDate">Next Step Date</Label>
              <Input
                id="nextStepDate"
                type="date"
                value={nextStepDate ? nextStepDate.substring(0, 10) : ''}
                onChange={(e) => setNextStepDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowEditDialog(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNotes}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
