
import { useState, useEffect } from 'react';
import { RedemptionCode } from '@/types/redemption';

export function useRedemptionCodeSelection(codes: RedemptionCode[]) {
  const [selectedCodes, setSelectedCodes] = useState<RedemptionCode[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  // Reset selection when codes change (like when tab changes)
  useEffect(() => {
    setSelectedCodes([]);
    setAllSelected(false);
  }, [codes]);

  const handleSelectCode = (code: RedemptionCode, isSelected: boolean) => {
    if (isSelected) {
      setSelectedCodes(prev => [...prev, code]);
    } else {
      setSelectedCodes(prev => prev.filter(c => c.id !== code.id));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    setAllSelected(isSelected);
    if (isSelected) {
      setSelectedCodes(codes.filter(code => !code.used));
    } else {
      setSelectedCodes([]);
    }
  };

  const clearSelection = () => {
    setSelectedCodes([]);
    setAllSelected(false);
  };

  return {
    selectedCodes,
    setSelectedCodes,
    allSelected,
    setAllSelected,
    handleSelectCode,
    handleSelectAll,
    clearSelection
  };
}
