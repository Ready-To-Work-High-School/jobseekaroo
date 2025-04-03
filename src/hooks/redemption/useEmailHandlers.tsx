
import { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';
import { useToast } from '@/hooks/use-toast';
import { ScheduleEmailParams } from '@/hooks/redemption/useScheduledEmails';

interface EmailHandlersProps {
  formatDate: (date?: Date | string) => string;
  selectedCodes: RedemptionCode[];
  scheduleEmail: (params: ScheduleEmailParams) => Promise<boolean>;
  isScheduling: boolean;
}

export function useEmailHandlers({ 
  formatDate, 
  selectedCodes, 
  scheduleEmail,
  isScheduling 
}: EmailHandlersProps) {
  const { toast } = useToast();

  // Handle email code
  const handleEmailCode = (code: RedemptionCode) => {
    // Open email dialog with selected code
    toast({
      title: 'Email Feature',
      description: 'Sending email feature initiated.',
    });
    
    // Logic to email code would go here
    const emailSubject = `Your Redemption Code: ${code.code}`;
    const emailBody = `
      Here is your redemption code: ${code.code}
      
      You can redeem this code at: ${window.location.origin}/redemption-code
      
      This code will expire on: ${formatDate(code.expiresAt)}
    `;
    
    // Create a mailto link
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
  };
  
  // Handle email selected codes
  const handleEmailSelected = () => {
    if (selectedCodes.length === 0) {
      toast({
        title: 'No Codes Selected',
        description: 'Please select at least one code to email.',
        variant: 'destructive',
      });
      return;
    }
    
    // Logic to email multiple codes would go here
    const emailSubject = `Your Redemption Codes`;
    const emailBody = `
      Here are your redemption codes:
      ${selectedCodes.map(code => `- ${code.code} (Expires: ${formatDate(code.expiresAt)})`).join('\n')}
      
      You can redeem these codes at: ${window.location.origin}/redemption-code
    `;
    
    // Create a mailto link
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
  };

  return {
    handleEmailCode,
    handleEmailSelected,
    scheduleEmail,
    isScheduling
  };
}
