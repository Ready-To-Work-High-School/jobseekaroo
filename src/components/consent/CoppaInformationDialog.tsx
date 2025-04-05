
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface CoppaInformationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CoppaInformationDialog: React.FC<CoppaInformationDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>About COPPA Compliance</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <p>
            <strong>The Children's Online Privacy Protection Act (COPPA)</strong> is a law that protects the privacy of children under 13. 
            Although our service primarily targets high school students (ages 14-18), we take all privacy protections seriously.
          </p>
          
          <h3 className="font-bold">What information do we collect?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Basic profile information (name, age, school)</li>
            <li>Contact details (email address)</li>
            <li>Employment interests and skills</li>
            <li>Job application history</li>
          </ul>
          
          <h3 className="font-bold">How do we use this information?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>To match students with appropriate job opportunities</li>
            <li>To help employers contact students about positions</li>
            <li>To improve our service and job recommendations</li>
          </ul>
          
          <h3 className="font-bold">Parent/Guardian Rights:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>View your child's personal information</li>
            <li>Request deletion of your child's data</li>
            <li>Revoke consent at any time</li>
          </ul>
          
          <p className="text-xs italic">
            For more information, please review our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> or contact us at <a href="mailto:privacy@js4hs.com" className="text-blue-600 hover:underline">privacy@js4hs.com</a>
          </p>
        </div>
        
        <Button onClick={() => onOpenChange(false)}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CoppaInformationDialog;
