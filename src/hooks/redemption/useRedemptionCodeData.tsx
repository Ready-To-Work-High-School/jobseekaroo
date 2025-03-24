
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RedemptionCode } from '@/types/redemption';
import { listRedemptionCodes } from '@/lib/supabase/redemption';

export function useRedemptionCodeData() {
  const [codes, setCodes] = useState<RedemptionCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCodes, setTotalCodes] = useState(0);
  const { toast } = useToast();
  
  const [stats, setStats] = useState({
    totalCodes: 0,
    usedCodes: 0,
    studentCodes: 0,
    employerCodes: 0,
    expiringThisMonth: 0
  });

  const fetchCodes = async () => {
    setIsLoading(true);
    try {
      let filterType: 'student' | 'employer' | undefined;
      let filterUsed: boolean | undefined;
      
      switch (activeTab) {
        case 'used':
          filterUsed = true;
          break;
        case 'unused':
          filterUsed = false;
          break;
        case 'students':
          filterType = 'student';
          break;
        case 'employers':
          filterType = 'employer';
          break;
        default:
          break;
      }
      
      const { data: filteredCodes, count } = await listRedemptionCodes(
        filterType, 
        filterUsed, 
        { page: currentPage, pageSize }
      );
      
      setCodes(filteredCodes);
      setTotalCodes(count);
      
      const { data: allCodes } = await listRedemptionCodes();
      
      const usedCodesCount = allCodes.filter(code => code.used).length;
      const studentCodesCount = allCodes.filter(code => code.type === 'student').length;
      const employerCodesCount = allCodes.filter(code => code.type === 'employer').length;
      
      const today = new Date();
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const expiringCodes = allCodes.filter(code => {
        if (!code.expiresAt) return false;
        const expDate = new Date(code.expiresAt);
        return expDate <= endOfMonth && expDate >= today && !code.used;
      }).length;
      
      setStats({
        totalCodes: count,
        usedCodes: usedCodesCount,
        studentCodes: studentCodesCount,
        employerCodes: employerCodesCount,
        expiringThisMonth: expiringCodes
      });
      
    } catch (error) {
      console.error('Error fetching redemption codes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load redemption codes',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Run effect when activeTab, currentPage, or pageSize changes
  useEffect(() => {
    fetchCodes();
  }, [activeTab, currentPage, pageSize]);

  // Reset to first page on tab change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const updateCodes = (newCodes: RedemptionCode[]) => {
    setCodes(prevCodes => [...newCodes, ...prevCodes]);
  };

  const removeCodes = (codeIds: string[]) => {
    setCodes(prev => prev.filter(c => !codeIds.includes(c.id)));
  };

  return {
    codes,
    setCodes,
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
  };
}
