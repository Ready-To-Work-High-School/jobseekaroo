
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface GenerateCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  codeType: string;
  setCodeType: (type: string) => void;
  expiry: string;
  setExpiry: (expiry: string) => void;
  onGenerate: () => void;
}

const GenerateCodeDialog = ({
  open,
  onOpenChange,
  codeType,
  setCodeType,
  expiry,
  setExpiry,
  onGenerate
}: GenerateCodeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Redemption Code</DialogTitle>
          <DialogDescription>
            Create a new redemption code for user access
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="code-type">Code Type</Label>
            <Select value={codeType} onValueChange={setCodeType}>
              <SelectTrigger id="code-type">
                <SelectValue placeholder="Select code type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiry">Expires After (Days)</Label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger id="expiry">
                <SelectValue placeholder="Select expiry period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">365 days</SelectItem>
                <SelectItem value="730">730 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="make-reusable" />
            <Label htmlFor="make-reusable">Make code reusable</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onGenerate}>
            Generate Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateCodeDialog;
