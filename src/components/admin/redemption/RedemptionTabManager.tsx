
import React from 'react';
import RedemptionTabManager from './tab-manager';
import { useCeoStatus } from './tab-manager/useCeoStatus';
import { RedemptionCode } from '@/types/redemption';
import { ScheduleEmailParams } from '@/hooks/redemption/useScheduledEmails';

interface RedemptionTabManagerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
  filteredCodes: RedemptionCode[];
  selectedCodes: RedemptionCode[];
  allSelected: boolean;
  isLoading: boolean;
  isGenerating: boolean;
  isDeleting: boolean;
  isScheduling: boolean;
  codesTab: string;
  setCodesTab: (tab: string) => void;
  currentPage: number;
  pageSize: number;
  totalCodes: number;
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
  formatDate: (date?: Date | string) => string;
  usageOverTime?: { date: string; count: number; }[];
  generationOverTime?: { date: string; count: number; }[];
  handlers: {
    onApplyFilters: (filters: any) => void;
    onSelectCode: (code: RedemptionCode, isSelected: boolean) => void;
    onSelectAll: (isSelected: boolean) => void;
    onCopyCode: (code: string) => void;
    onEmailCode: (code: RedemptionCode) => void;
    onViewDetails: (code: RedemptionCode) => void;
    onViewQRCode: (code: RedemptionCode) => void;
    onCodeGeneration: () => Promise<void>;
    onBulkGeneration: (amount: number) => Promise<void>;
    onAutomatedGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<void>;
    onWizardGeneration: (params: any) => Promise<void>;
    onScheduleEmail: (params: ScheduleEmailParams) => Promise<boolean>;
    onRefresh: () => Promise<void>;
    onExport: () => void;
    onPrint: () => void;
    onEmailSelected: (codes: RedemptionCode[]) => void;
    onDeleteSelected: () => void;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
}

const RedemptionTabManagerWrapper: React.FC<RedemptionTabManagerProps> = (props) => {
  const { isCeo } = useCeoStatus();
  
  return <RedemptionTabManager {...props} isCeo={isCeo} />;
};

export default RedemptionTabManagerWrapper;
