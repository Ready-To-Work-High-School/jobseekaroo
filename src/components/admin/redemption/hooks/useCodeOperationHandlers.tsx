
import { RedemptionCode } from '@/types/redemption';
import { School } from '@/types/school';

interface CodeOperationHandlersProps {
  handleGenerateCode: (type: 'student' | 'employer', school: School, expireDays: number) => Promise<RedemptionCode | null>;
  handleBulkGenerate: (amount: number, type: 'student' | 'employer', school: School, expireDays: number) => Promise<RedemptionCode[]>;
  handleAutomatedCodeGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string, school: School) => Promise<RedemptionCode[]>;
  handleDeleteSelectedCodes: (codeIds: string[]) => Promise<number>;
  codeType: 'student' | 'employer';
  expireDays: number;
  selectedCodes: RedemptionCode[];
  selectedForDelete: RedemptionCode[];
  updateCodes: (codes: RedemptionCode[]) => void;
  fetchCodes: () => Promise<void>;
  clearSelection: () => void;
  openDeleteDialog: (codes: RedemptionCode[]) => void;
  closeDeleteDialog: () => void;
}

export function useCodeOperationHandlers({
  handleGenerateCode,
  handleBulkGenerate,
  handleAutomatedCodeGeneration,
  handleDeleteSelectedCodes,
  codeType,
  expireDays,
  selectedCodes,
  selectedForDelete,
  updateCodes,
  fetchCodes,
  clearSelection,
  openDeleteDialog,
  closeDeleteDialog
}: CodeOperationHandlersProps) {
  
  const handleCodeGeneration = async (school: School) => {
    const newCode = await handleGenerateCode(codeType, school, expireDays);
    if (newCode) {
      updateCodes([newCode]);
      await fetchCodes();
    }
  };

  const handleBulkGeneration = async (amount: number, school: School) => {
    const newCodes = await handleBulkGenerate(amount, codeType, school, expireDays);
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  };

  const handleAutomatedGeneration = async (
    userType: string, 
    amount: number, 
    expiresInDays: number, 
    emailDomain: string,
    school: School
  ) => {
    const newCodes = await handleAutomatedCodeGeneration(
      userType, 
      amount, 
      expiresInDays, 
      emailDomain,
      school
    );
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  };

  const handleWizardGeneration = async (params: {
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
  };

  const handleConfirmDelete = async () => {
    if (selectedForDelete.length === 0) return;
    
    const codeIds = selectedForDelete.map(code => code.id);
    const deletedCount = await handleDeleteSelectedCodes(codeIds);
    
    if (deletedCount > 0) {
      clearSelection();
      closeDeleteDialog();
      await fetchCodes();
    }
  };

  return {
    handleCodeGeneration,
    handleBulkGeneration,
    handleAutomatedGeneration,
    handleWizardGeneration,
    handleShowDeleteDialog: () => openDeleteDialog(selectedCodes),
    handleConfirmDelete
  };
}
