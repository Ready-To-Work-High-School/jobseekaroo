
import { useCodeGeneration } from './useCodeGeneration';
import { useCodeDeletion } from './useCodeDeletion';

export function useRedemptionCodeOperations() {
  const {
    isGenerating,
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration
  } = useCodeGeneration();

  const {
    isDeleting,
    handleDeleteCode,
    handleDeleteSelectedCodes
  } = useCodeDeletion();

  return {
    // Combine all functionality from the specialized hooks
    isGenerating,
    isDeleting,
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration,
    handleDeleteCode,
    handleDeleteSelectedCodes
  };
}
