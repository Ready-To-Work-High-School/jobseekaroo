
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Step2ConfirmDetails: React.FC = () => {
  return (
    <div className="space-y-4 py-2">
      <h3 className="text-lg font-medium">Confirm Your Details</h3>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>Your profile information will be shared</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>This application will be tracked in your dashboard</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span>You'll receive status updates via email</span>
          </div>
        </CardContent>
      </Card>
      
      <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-100">
        <AlertDescription>
          Make sure your profile is up-to-date to increase your chances of getting hired!
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Step2ConfirmDetails;
