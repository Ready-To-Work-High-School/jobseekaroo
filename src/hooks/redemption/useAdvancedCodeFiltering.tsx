
import { useState, useCallback } from 'react';
import { RedemptionCode } from '@/types/redemption';

interface AdvancedFilters {
  searchTerm: string;
  codeType?: 'student' | 'employer' | null;
  status?: 'used' | 'unused' | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
}

export function useAdvancedCodeFiltering(allCodes: RedemptionCode[]) {
  const [filters, setFilters] = useState<AdvancedFilters>({
    searchTerm: '',
    codeType: null,
    status: null,
    dateFrom: null,
    dateTo: null
  });

  const applyFilters = useCallback((newFilters: AdvancedFilters) => {
    setFilters(newFilters);
  }, []);

  const filteredCodes = useCallback(() => {
    return allCodes.filter(code => {
      // Search term filter (code, ID, or used by)
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matches = 
          code.code.toLowerCase().includes(searchLower) ||
          code.id.toLowerCase().includes(searchLower) ||
          (code.usedBy && code.usedBy.toString().toLowerCase().includes(searchLower));
          
        if (!matches) return false;
      }
      
      // Code type filter
      if (filters.codeType && code.type !== filters.codeType) {
        return false;
      }
      
      // Status filter
      if (filters.status === 'used' && !code.used) {
        return false;
      }
      if (filters.status === 'unused' && code.used) {
        return false;
      }
      
      // Date range filter
      const createdDate = new Date(code.createdAt);
      
      if (filters.dateFrom && createdDate < filters.dateFrom) {
        return false;
      }
      
      if (filters.dateTo) {
        // Set the date to end of day for the "to" date
        const toDateEnd = new Date(filters.dateTo);
        toDateEnd.setHours(23, 59, 59, 999);
        
        if (createdDate > toDateEnd) {
          return false;
        }
      }
      
      return true;
    });
  }, [allCodes, filters]);

  return {
    filters,
    applyFilters,
    filteredCodes: filteredCodes()
  };
}
