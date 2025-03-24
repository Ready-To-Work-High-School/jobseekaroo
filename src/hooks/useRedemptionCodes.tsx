
import { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';
import { useRedemptionCodeData } from './redemption/useRedemptionCodeData';
import { useRedemptionCodeOperations } from './redemption/useRedemptionCodeOperations';
import { useRedemptionCodeSelection } from './redemption/useRedemptionCodeSelection';
import { useRedemptionCodeUtils } from './redemption/useRedemptionCodeUtils';

/**
 * @deprecated Use the individual hooks from the redemption directory instead. 
 * This hook is kept for backwards compatibility.
 */
export function useRedemptionCodes() {
  const [codeType, setCodeType] = useState<'student' | 'employer'>('student');
  const [expireDays, setExpireDays] = useState<number>(30);

  // Import functionalities from separate hooks
  const {
    codes,
    stats,
    isLoading,
    activeTab,
    setActiveTab,
    currentPage,
    pageSize,
    totalCodes,
    fetchCodes,
    handlePageChange,
    handlePageSizeChange,
    updateCodes,
    removeCodes
  } = useRedemptionCodeData();

  const {
    isGenerating,
    isDeleting,
    handleGenerateCode: generateCode,
    handleBulkGenerate: bulkGenerate,
    handleAutomatedCodeGeneration: automatedGenerate,
    handleDeleteCode: deleteCode,
    handleDeleteSelectedCodes: deleteSelectedCodes
  } = useRedemptionCodeOperations();

  const {
    selectedCodes,
    allSelected,
    handleSelectCode,
    handleSelectAll,
    clearSelection
  } = useRedemptionCodeSelection(codes);

  const { formatDate, exportCodes } = useRedemptionCodeUtils();

  // Wrapper functions to integrate the different hooks
  const handleGenerateCode = async () => {
    const newCode = await generateCode(codeType, expireDays);
    if (newCode) {
      updateCodes([newCode]);
      await fetchCodes();
    }
  };

  const handleBulkGenerate = async (amount: number) => {
    const newCodes = await bulkGenerate(amount, codeType, expireDays);
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  };

  const handleAutomatedCodeGeneration = async (
    userType: string, 
    amount: number, 
    expiresInDays: number,
    emailDomain: string
  ) => {
    const newCodes = await automatedGenerate(userType, amount, expiresInDays, emailDomain);
    if (newCodes.length > 0) {
      updateCodes(newCodes);
      await fetchCodes();
    }
  };

  const handleDeleteCode = async (code: RedemptionCode) => {
    const success = await deleteCode(code);
    if (success) {
      removeCodes([code.id]);
      await fetchCodes();
    }
  };

  const handleDeleteSelectedCodes = async () => {
    if (selectedCodes.length === 0) return;
    
    const codeIds = selectedCodes.map(code => code.id);
    const deletedCount = await deleteSelectedCodes(codeIds);
    
    if (deletedCount > 0) {
      removeCodes(codeIds);
      clearSelection();
      await fetchCodes();
    }
  };

  return {
    // Export all the necessary functions and state
    codes,
    stats,
    isLoading,
    isGenerating,
    isDeleting,
    activeTab,
    selectedCodes,
    allSelected,
    
    currentPage,
    pageSize,
    totalCodes,
    handlePageChange,
    handlePageSizeChange,
    
    setActiveTab,
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration,
    handleSelectCode,
    handleSelectAll,
    handleDeleteCode,
    handleDeleteSelectedCodes,
    fetchCodes,
    formatDate,
    exportCodes,
    
    // Type controls
    codeType,
    setCodeType,
    expireDays,
    setExpireDays
  };
}
