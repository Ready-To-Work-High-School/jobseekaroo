
import { useState, useCallback } from 'react';
import { RedemptionCode } from '@/types/redemption';

type CodeFilters = {
  searchTerm: string;
  codeType?: 'student' | 'employer' | null;
  status?: 'used' | 'unused' | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
};

export function useAdvancedCodeFiltering(codes: RedemptionCode[]) {
  const [filters, setFilters] = useState<CodeFilters>({ searchTerm: '' });

  const applyFilters = useCallback((newFilters: CodeFilters) => {
    setFilters(newFilters);
  }, []);

  const filteredCodes = codes.filter(code => {
    // Apply search term filter (match code, id, or user)
    if (filters.searchTerm && !code.code.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !code.id.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
        !(code.usedBy && code.usedBy.toString().toLowerCase().includes(filters.searchTerm.toLowerCase()))) {
      return false;
    }

    // Apply code type filter
    if (filters.codeType && code.type !== filters.codeType) {
      return false;
    }

    // Apply status filter
    if (filters.status === 'used' && !code.used) return false;
    if (filters.status === 'unused' && code.used) return false;

    // Apply date range filters for created_at
    if (filters.dateFrom) {
      const codeDate = new Date(code.createdAt);
      const fromDate = new Date(filters.dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      if (codeDate < fromDate) return false;
    }

    if (filters.dateTo) {
      const codeDate = new Date(code.createdAt);
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      if (codeDate > toDate) return false;
    }

    return true;
  });

  return {
    filters,
    applyFilters,
    filteredCodes
  };
}
