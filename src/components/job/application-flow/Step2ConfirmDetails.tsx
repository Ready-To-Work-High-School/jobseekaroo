
import React from 'react';
import { Check } from 'lucide-react';

const Step2ConfirmDetails: React.FC = () => {
  return (
    <div className="space-y-4 py-2">
      <h3 className="text-lg font-medium">Confirm Your Details</h3>
      <div className="space-y-3">
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
        
        <div className="bg-amber-50 p-3 rounded-md border border-amber-100 mt-4">
          <p className="text-sm text-amber-800">
            Make sure your profile is up-to-date to increase your chances of getting hired!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step2ConfirmDetails;
