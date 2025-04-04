
import React from 'react';
import { Button } from '@/components/ui/button';

interface RedemptionActionButtonsProps {
  onClose: () => void;
  onDashboardClick?: () => void;
  redemptionType: string;
}

const RedemptionActionButtons: React.FC<RedemptionActionButtonsProps> = ({ 
  onClose, 
  onDashboardClick,
  redemptionType
}) => {
  // Get button text based on user type
  const getDashboardButtonText = () => {
    switch (redemptionType) {
      case 'student':
        return 'Go to Student Dashboard';
      case 'employer':
        return 'Go to Employer Dashboard';
      case 'admin':
        return 'Go to Admin Dashboard';
      default:
        return 'View Dashboard';
    }
  };

  return (
    <div className="sm:justify-center gap-2 pt-2 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <Button variant="outline" onClick={onClose}>
        Close
      </Button>
      <Button 
        variant="brand" 
        onClick={onDashboardClick || onClose}
      >
        {getDashboardButtonText()}
      </Button>
    </div>
  );
};

export default RedemptionActionButtons;
