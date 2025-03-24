
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { RedemptionCode } from '@/types/redemption';
import { 
  generateRedemptionCode, 
  listRedemptionCodes,
  sendRedemptionCodeEmail
} from '@/lib/supabase/redemption';

export function useRedemptionCodes() {
  const [codes, setCodes] = useState<RedemptionCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedCodes, setSelectedCodes] = useState<RedemptionCode[]>([]);
  const [allSelected, setAllSelected] = useState(false);
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
      let filteredCodes: RedemptionCode[] = [];
      
      switch (activeTab) {
        case 'used':
          filteredCodes = await listRedemptionCodes(undefined, true);
          break;
        case 'unused':
          filteredCodes = await listRedemptionCodes(undefined, false);
          break;
        case 'students':
          filteredCodes = await listRedemptionCodes('student');
          break;
        case 'employers':
          filteredCodes = await listRedemptionCodes('employer');
          break;
        default:
          filteredCodes = await listRedemptionCodes();
      }
      
      setCodes(filteredCodes);
      
      const allCodes = await listRedemptionCodes();
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
        totalCodes: allCodes.length,
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

  useEffect(() => {
    fetchCodes();
  }, [activeTab]);

  useEffect(() => {
    setSelectedCodes([]);
    setAllSelected(false);
  }, [activeTab]);

  const handleGenerateCode = async (codeType: 'student' | 'employer', expireDays: number) => {
    setIsGenerating(true);
    try {
      const newCode = await generateRedemptionCode(codeType, expireDays);
      
      if (newCode) {
        setCodes([newCode, ...codes]);
        toast({
          title: 'Success',
          description: `New ${codeType} code generated: ${newCode.code}`,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to generate redemption code',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error generating redemption code:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkGenerate = async (amount: number, codeType: 'student' | 'employer', expireDays: number) => {
    setIsGenerating(true);
    
    try {
      const newCodes: RedemptionCode[] = [];
      
      for (let i = 0; i < amount; i++) {
        const code = await generateRedemptionCode(codeType, expireDays);
        if (code) newCodes.push(code);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      if (newCodes.length > 0) {
        setCodes([...newCodes, ...codes]);
        toast({
          title: 'Success',
          description: `Generated ${newCodes.length} new redemption codes`,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to generate redemption codes',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error generating redemption codes:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during bulk generation',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAutomatedCodeGeneration = async (
    userType: string, 
    amount: number, 
    expiresInDays: number,
    emailDomain: string
  ) => {
    setIsGenerating(true);
    
    try {
      const newCodes: RedemptionCode[] = [];
      const validType = userType === 'student' || userType === 'employer' ? 
        userType : 'student'; // Default to student for non-standard types
      
      for (let i = 0; i < amount; i++) {
        const code = await generateRedemptionCode(validType as 'student' | 'employer', expiresInDays);
        if (code) newCodes.push(code);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      if (newCodes.length === 0) {
        throw new Error('Failed to generate any redemption codes');
      }
      
      const emailSubject = `${userType.charAt(0).toUpperCase() + userType.slice(1)} Access Codes`;
      const emailMessage = `
        Here are your requested access codes for ${userType} users:
        
        These codes can be distributed to users with @${emailDomain} email addresses.
        
        Users can redeem these codes at the following URL: ${window.location.origin}/redemption-code
        
        These codes will expire in ${expiresInDays} days.
      `;
      
      const sendResult = await sendRedemptionCodeEmail({
        to: `admin@${emailDomain}`,
        subject: emailSubject,
        message: emailMessage,
        codes: newCodes
      });
      
      if (!sendResult) {
        throw new Error('Generated codes but failed to send email');
      }
      
      setCodes(prev => [...newCodes, ...prev]);
      
      toast({
        title: 'Success',
        description: `Generated and emailed ${newCodes.length} ${userType} codes to admin@${emailDomain}`,
      });
    } catch (error) {
      console.error('Error in automated code generation:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate or distribute codes',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

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

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const exportCodes = () => {
    const csvContent = [
      ['Code', 'Type', 'Status', 'Created', 'Expires', 'Used By', 'Used At'].join(','),
      ...codes.map(code => [
        code.code,
        code.type,
        code.used ? 'Used' : 'Available',
        formatDate(code.createdAt),
        formatDate(code.expiresAt || ''),
        code.usedBy || 'N/A',
        formatDate(code.usedAt || '')
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `redemption-codes-${new Date().toISOString().slice(0,10)}.csv`);
    a.click();
  };

  return {
    codes,
    stats,
    isLoading,
    isGenerating,
    activeTab,
    selectedCodes,
    allSelected,
    setActiveTab,
    handleGenerateCode,
    handleBulkGenerate,
    handleAutomatedCodeGeneration,
    handleSelectCode,
    handleSelectAll,
    fetchCodes,
    formatDate,
    exportCodes
  };
}
