
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RedemptionCode } from '@/types/redemption';

export function useRedemptionTableData() {
  const [codes, setCodes] = useState<RedemptionCode[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const filteredCodes = codes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'admin' && code.type === 'admin') ||
      (activeTab === 'student' && code.type === 'student') ||
      (activeTab === 'employer' && code.type === 'employer') ||
      (activeTab === 'unused' && !code.used) ||
      (activeTab === 'used' && code.used);
    
    return matchesSearch && matchesTab;
  });

  return {
    codes,
    setCodes,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredCodes
  };
}
