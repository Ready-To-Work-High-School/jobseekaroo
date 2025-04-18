
import { RedemptionCode } from '@/types/redemption';
import { School } from '@/types/school';

export interface RedemptionTabManagerProps {
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
  usageOverTime: { date: string; count: number }[];
  generationOverTime: { date: string; count: number }[];
  handlers: {
    onApplyFilters: (filters: any) => void;
    onSelectCode: (code: RedemptionCode, isSelected: boolean) => void;
    onSelectAll: (isSelected: boolean) => void;
    onCopyCode: (code: string) => void;
    onEmailCode: (code: RedemptionCode) => void;
    onViewDetails: (code: RedemptionCode) => void;
    onViewQRCode: (code: RedemptionCode) => void;
    onCodeGeneration: (school: School) => Promise<void>;
    onBulkGeneration: (amount: number, school: School) => Promise<void>;
    onAutomatedGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string, school: School) => Promise<void>;
    onWizardGeneration: (params: any) => Promise<any>;
    onScheduleEmail: (params: any) => Promise<boolean>;
    onRefresh: () => Promise<void>;
    onExport: () => void;
    onPrint: () => void;
    onEmailSelected: (codes: RedemptionCode[]) => void;
    onDeleteSelected: () => void;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
  isCeo?: boolean;
}
