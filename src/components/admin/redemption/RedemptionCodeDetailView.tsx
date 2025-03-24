
import React, { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodeDetails from '../RedemptionCodeDetails';
import EmailRedemptionCodeDialog from '../EmailRedemptionCodeDialog';
import { useToast } from '@/hooks/use-toast';

interface RedemptionCodeDetailViewProps {
  formatDate: (date?: Date | string) => string;
}

export const RedemptionCodeDetailView: React.FC<RedemptionCodeDetailViewProps> = ({
  formatDate
}) => {
  const [selectedCode, setSelectedCode] = useState<RedemptionCode | null>(null);
  const [showCodeDetails, setShowCodeDetails] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailSelectedCode, setEmailSelectedCode] = useState<RedemptionCode | null>(null);
  const [selectedCodes, setSelectedCodes] = useState<RedemptionCode[]>([]);
  const { toast } = useToast();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied!',
      description: 'Redemption code copied to clipboard',
    });
  };

  const handleViewDetails = (code: RedemptionCode) => {
    setSelectedCode(code);
    setShowCodeDetails(true);
  };

  const handleEmailCode = (code: RedemptionCode) => {
    setEmailSelectedCode(code);
    setShowEmailDialog(true);
  };

  const handleBulkEmail = (selectedCodes: RedemptionCode[]) => {
    if (selectedCodes.length === 0) {
      toast({
        title: 'No codes selected',
        description: 'Please select at least one code to email',
        variant: 'destructive',
      });
      return;
    }
    
    setEmailSelectedCode(null);
    setSelectedCodes(selectedCodes);
    setShowEmailDialog(true);
  };

  return {
    view: (
      <>
        <RedemptionCodeDetails
          isOpen={showCodeDetails}
          onClose={() => setShowCodeDetails(false)}
          selectedCode={selectedCode}
          onCopyCode={handleCopyCode}
          formatDate={formatDate}
        />
        
        <EmailRedemptionCodeDialog 
          isOpen={showEmailDialog}
          onClose={() => setShowEmailDialog(false)}
          code={emailSelectedCode || undefined}
          selectedCodes={emailSelectedCode ? [] : selectedCodes}
        />
      </>
    ),
    handlers: {
      handleCopyCode,
      handleViewDetails,
      handleEmailCode,
      handleBulkEmail
    }
  };
};
