
import { RedemptionCode } from '@/types/redemption';
import { useCallback } from 'react';

interface CodeGenerationHandlerProps {
  handleGenerateCode: (type: 'student' | 'employer', expireDays: number) => Promise<RedemptionCode | null>;
  handleBulkGenerate: (amount: number, type: 'student' | 'employer', expireDays: number) => Promise<RedemptionCode[]>;
  handleAutomatedCodeGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<RedemptionCode[]>;
  codeType: 'student' | 'employer';
  expireDays: number;
  updateCodes: (codes: RedemptionCode[]) => void;
  fetchCodes: () => Promise<void>;
}

export function useCodeGenerationHandler({
  handleGenerateCode,
  handleBulkGenerate,
  handleAutomatedCodeGeneration,
  codeType,
  expireDays,
  updateCodes,
  fetchCodes
}: CodeGenerationHandlerProps) {
  
  const handleCodeGeneration = useCallback(async () => {
    const newCode = await handleGenerateCode(codeType, expireDays);
    if (newCode) {
      updateCodes([newCode]);
      await fetchCodes();
    }
  }, [handleGenerateCode, codeType, expireDays, updateCodes, fetchCodes]);

  const handleBulkGeneration = useCallback(async (amount: number) => {
    const newCodes = await handleBulkGenerate(amount, codeType, expireDays);
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  }, [handleBulkGenerate, codeType, expireDays, updateCodes, fetchCodes]);

  const handleAutomatedGeneration = useCallback(async (
    userType: string, 
    amount: number, 
    expiresInDays: number,
    emailDomain: string
  ) => {
    const newCodes = await handleAutomatedCodeGeneration(userType, amount, expiresInDays, emailDomain);
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  }, [handleAutomatedCodeGeneration, updateCodes, fetchCodes]);

  const handleWizardGeneration = useCallback(async (params: {
    codeType: 'student' | 'employer';
    amount: number;
    expiresInDays: number;
    emailDomain: string;
    sendEmail: boolean;
  }) => {
    if (params.sendEmail) {
      return handleAutomatedGeneration(
        params.codeType, 
        params.amount, 
        params.expiresInDays, 
        params.emailDomain
      );
    } else {
      return handleBulkGeneration(params.amount);
    }
  }, [handleAutomatedGeneration, handleBulkGeneration]);

  return {
    handleCodeGeneration,
    handleBulkGeneration,
    handleAutomatedGeneration,
    handleWizardGeneration
  };
}
