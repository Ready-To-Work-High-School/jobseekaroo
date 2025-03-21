
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EditDialogProps } from './types';

export const EditDialog = ({
  isOpen,
  setIsOpen,
  application,
  onSave,
  isLoading
}: EditDialogProps) => {
  const [notes, setNotes] = useState(application.notes || '');
  const [contactName, setContactName] = useState(application.contact_name || '');
  const [contactEmail, setContactEmail] = useState(application.contact_email || '');
  const [nextStep, setNextStep] = useState(application.next_step || '');
  const [nextStepDate, setNextStepDate] = useState(application.next_step_date || '');

  const handleSaveChanges = () => {
    onSave({
      notes,
      contactName,
      contactEmail,
      nextStep,
      nextStepDate
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
