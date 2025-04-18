
import { RedemptionCode } from '@/types/redemption';
import { useCallback } from 'react';
import { School } from '@/types/school';

interface CodeGenerationHandlerProps {
  handleGenerateCode: (type: 'student' | 'employer', school: School, expireDays: number) => Promise<RedemptionCode | null>;
  handleBulkGenerate: (amount: number, type: 'student' | 'employer', school: School, expireDays: number) => Promise<RedemptionCode[]>;
  handleAutomatedCodeGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string, school: School) => Promise<RedemptionCode[]>;
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
  
  const handleCodeGeneration = useCallback(async (school: School) => {
    const newCode = await handleGenerateCode(codeType, school, expireDays);
    if (newCode) {
      updateCodes([newCode]);
      await fetchCodes();
    }
  }, [handleGenerateCode, codeType, expireDays, updateCodes, fetchCodes]);

  const handleBulkGeneration = useCallback(async (amount: number, school: School) => {
    const newCodes = await handleBulkGenerate(amount, codeType, school, expireDays);
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  }, [handleBulkGenerate, codeType, expireDays, updateCodes, fetchCodes]);

  const handleAutomatedGeneration = useCallback(async (
    userType: string, 
    amount: number, 
    expiresInDays: number,
    emailDomain: string,
    school: School
  ) => {
    const newCodes = await handleAutomatedCodeGeneration(userType, amount, expiresInDays, emailDomain, school);
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
    school: School;
  }) => {
    if (params.sendEmail) {
      return handleAutomatedGeneration(
        params.codeType, 
        params.amount, 
        params.expiresInDays, 
        params.emailDomain,
        params.school
      );
    } else {
      return handleBulkGeneration(params.amount, params.school);
    }
  }, [handleAutomatedGeneration, handleBulkGeneration]);

  return {
    handleCodeGeneration,
    handleBulkGeneration,
    handleAutomatedGeneration,
    handleWizardGeneration
  };
}
