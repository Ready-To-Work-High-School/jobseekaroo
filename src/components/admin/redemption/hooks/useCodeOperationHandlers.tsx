
import { RedemptionCode } from '@/types/redemption';

interface CodeOperationHandlersProps {
  handleGenerateCode: (type: 'student' | 'employer', expireDays: number) => Promise<RedemptionCode | null>;
  handleBulkGenerate: (amount: number, type: 'student' | 'employer', expireDays: number) => Promise<RedemptionCode[]>;
  handleAutomatedCodeGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<RedemptionCode[]>;
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
  // Handlers for operations that combine multiple hooks
  const handleCodeGeneration = async () => {
    const newCode = await handleGenerateCode(codeType, expireDays);
    if (newCode) {
      updateCodes([newCode]);
      await fetchCodes();
    }
  };

  const handleBulkGeneration = async (amount: number) => {
    const newCodes = await handleBulkGenerate(amount, codeType, expireDays);
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  };

  const handleAutomatedGeneration = async (
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
  };

  const handleShowDeleteDialog = () => {
    if (selectedCodes.length > 0) {
      openDeleteDialog(selectedCodes);
    }
  };

  const handleConfirmDelete = async () => {
    await handleDeleteSelectedCodes(selectedForDelete.map(code => code.id));
    clearSelection();
    closeDeleteDialog();
    await fetchCodes();
  };

  return {
    handleCodeGeneration,
    handleBulkGeneration,
    handleAutomatedGeneration,
    handleShowDeleteDialog,
    handleConfirmDelete
  };
}
