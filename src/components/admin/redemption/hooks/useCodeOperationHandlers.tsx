
import { RedemptionCode } from '@/types/redemption';
import { useCodeGenerationHandler } from '@/hooks/redemption/useCodeGenerationHandler';
import { useDeleteCodeHandler } from '@/hooks/redemption/useDeleteCodeHandler';

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
  // Use the useCodeGenerationHandler hook
  const {
    handleCodeGeneration,
    handleBulkGeneration,
    handleAutomatedGeneration,
    handleWizardGeneration
  } = useCodeGenerationHandler({
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration,
    codeType,
    expireDays,
    updateCodes,
    fetchCodes
  });
  
  // Use the useDeleteCodeHandler hook
  const {
    handleConfirmDelete
  } = useDeleteCodeHandler({
    handleDeleteSelectedCodes,
    selectedCodes,
    selectedForDelete,
    fetchCodes,
    clearSelection,
    openDeleteDialog,
    closeDeleteDialog
  });

  return {
    handleCodeGeneration,
    handleBulkGeneration,
    handleAutomatedGeneration,
    handleWizardGeneration,
    handleShowDeleteDialog: () => openDeleteDialog(selectedCodes),
    handleConfirmDelete
  };
}
