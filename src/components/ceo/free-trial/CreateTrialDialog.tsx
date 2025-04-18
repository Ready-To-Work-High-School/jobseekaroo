
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CreateTrialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trialEmail: string;
  setTrialEmail: (email: string) => void;
  trialName: string;
  setTrialName: (name: string) => void;
  trialPlan: string;
  setTrialPlan: (plan: string) => void;
  trialDuration: string;
  setTrialDuration: (duration: string) => void;
  onCreateTrial: () => void;
}

const CreateTrialDialog = ({
  open,
  onOpenChange,
  trialEmail,
  setTrialEmail,
  trialName,
  setTrialName,
  trialPlan,
  setTrialPlan,
  trialDuration,
  setTrialDuration,
  onCreateTrial
}: CreateTrialDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Free Trial</DialogTitle>
          <DialogDescription>
            Grant a free trial to a user
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="trial-name">User Name</Label>
            <Input
              id="trial-name"
              value={trialName}
              onChange={(e) => setTrialName(e.target.value)}
              placeholder="Enter user name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trial-email">Email Address</Label>
            <Input
              id="trial-email"
              type="email"
              value={trialEmail}
              onChange={(e) => setTrialEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trial-plan">Trial Plan</Label>
            <Select value={trialPlan} onValueChange={setTrialPlan}>
              <SelectTrigger id="trial-plan">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="trial-duration">Trial Duration (Days)</Label>
            <Select value={trialDuration} onValueChange={setTrialDuration}>
              <SelectTrigger id="trial-duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="send-email" />
            <Label htmlFor="send-email">Send welcome email</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onCreateTrial}>
            Create Trial
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTrialDialog;
