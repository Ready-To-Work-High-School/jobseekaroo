
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RedemptionCode } from '@/types/redemption';

export function useRedemptionCodeGeneration(
  codes: RedemptionCode[],
  setCodes: (codes: RedemptionCode[]) => void
) {
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [newCodeType, setNewCodeType] = useState('admin');
  const [newCodeExpiry, setNewCodeExpiry] = useState('365');
  const [bulkAmount, setBulkAmount] = useState('10');
  const { toast } = useToast();

  const handleGenerateCode = async () => {
    try {
      const codePrefix = newCodeType.toUpperCase();
      const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
      const code = `${codePrefix}-${randomPart}`;
      
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + parseInt(newCodeExpiry));
      
      const newCode = {
        id: `mock-${Date.now()}`,
        code,
        type: newCodeType as 'admin' | 'student' | 'employer',
        used: false,
        createdAt: new Date(),
        expiresAt: expDate
      };
      
      setCodes([newCode, ...codes]);
      setShowGenerateDialog(false);
      
      toast({
        title: "Code generated",
        description: `New ${newCodeType} code: ${code}`,
      });
    } catch (error) {
      console.error('Error generating code:', error);
      toast({
        title: "Error",
        description: "Failed to generate redemption code",
        variant: "destructive",
      });
    }
  };

  const handleBulkGenerate = () => {
    try {
      const amount = parseInt(bulkAmount);
      if (isNaN(amount) || amount <= 0 || amount > 100) {
        toast({
          title: "Invalid amount",
          description: "Please enter a number between 1 and 100",
          variant: "destructive",
        });
        return;
      }
      
      const newCodes = Array(amount).fill(0).map((_, i) => {
        const codePrefix = newCodeType.toUpperCase();
        const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
        const code = `${codePrefix}-${randomPart}`;
        
        const expDate = new Date();
        expDate.setDate(expDate.getDate() + parseInt(newCodeExpiry));
        
        return {
          id: `mock-bulk-${Date.now()}-${i}`,
          code: code,
          type: newCodeType as 'admin' | 'student' | 'employer',
          used: false,
          createdAt: new Date(),
          expiresAt: expDate
        };
      });
      
      setCodes([...newCodes, ...codes]);
      setShowBulkDialog(false);
      
      toast({
        title: "Bulk codes generated",
        description: `Generated ${amount} new ${newCodeType} codes`,
      });
    } catch (error) {
      console.error('Error generating bulk codes:', error);
      toast({
        title: "Error",
        description: "Failed to generate bulk redemption codes",
        variant: "destructive",
      });
    }
  };

  return {
    showGenerateDialog,
    setShowGenerateDialog,
    showBulkDialog,
    setShowBulkDialog,
    newCodeType,
    setNewCodeType,
    newCodeExpiry,
    setNewCodeExpiry,
    bulkAmount,
    setBulkAmount,
    handleGenerateCode,
    handleBulkGenerate
  };
}
