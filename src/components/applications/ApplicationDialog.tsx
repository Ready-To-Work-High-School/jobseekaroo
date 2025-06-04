
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showSavedJobs: boolean;
  setShowSavedJobs: (show: boolean) => void;
  onSuccess: () => void;
}

const ApplicationDialog: React.FC<ApplicationDialogProps> = ({
  open,
  onOpenChange,
  showSavedJobs,
  setShowSavedJobs,
  onSuccess
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Add a new job application to track your progress.
          </DialogDescription>
        </DialogHeader>
        
        {showSavedJobs ? (
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Select from saved jobs:
            </p>
            {/* Saved jobs list would go here */}
          </div>
        ) : (
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="job-title" className="text-sm font-medium">
                  Job Title
                </label>
                <input
                  id="job-title"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter job title"
                />
              </div>
              <div>
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <input
                  id="company"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter company name"
                />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;
