
import { School } from '@/types/school';
import { RedemptionCode } from '@/types/redemption';
import { ScheduleEmailParams } from '@/hooks/redemption/useScheduledEmails';

interface RedemptionContainerHandlersProps {
  handleGenerateCode: (type: 'student' | 'employer', school: School, expireDays: number) => Promise<RedemptionCode | null>;
  handleBulkGenerate: (amount: number, type: 'student' | 'employer', school: School, expireDays: number) => Promise<RedemptionCode[]>;
  handleAutomatedCodeGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string, school: School) => Promise<RedemptionCode[]>;
  handleDeleteSelectedCodes: (codeIds: string[]) => Promise<number>;
  codeType: 'student' | 'employer';
  expireDays: number;
  selectedCodes: RedemptionCode[];
  selectedForDelete: RedemptionCode[];
  filteredCodes: RedemptionCode[];
  updateCodes: (codes: RedemptionCode[]) => void;
  fetchCodes: () => Promise<void>;
  clearSelection: () => void;
  openDeleteDialog: (codes: RedemptionCode[]) => void;
  closeDeleteDialog: () => void;
  formatDate: (date?: Date | string) => string;
  exportCodes: (codes: RedemptionCode[]) => void;
  scheduleEmail: (params: ScheduleEmailParams) => Promise<boolean>;
  isScheduling: boolean;
}

export function useRedemptionContainerHandlers({
  handleGenerateCode,
  handleBulkGenerate,
  handleAutomatedCodeGeneration,
  handleDeleteSelectedCodes,
  codeType,
  expireDays,
  selectedCodes,
  selectedForDelete,
  filteredCodes,
  updateCodes,
  fetchCodes,
  clearSelection,
  openDeleteDialog,
  closeDeleteDialog,
  formatDate,
  exportCodes,
  scheduleEmail,
  isScheduling
}: RedemptionContainerHandlersProps) {
  
  // Create a dummy school for now
  const dummySchool = {
    id: "default-school-id",
    name: "Default School",
    slug: "default-school",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const handlers = {
    onApplyFilters: (filters: any) => console.log('Apply filters', filters),
    onSelectCode: (code: RedemptionCode, isSelected: boolean) => console.log('Select code', code.id, isSelected),
    onSelectAll: (isSelected: boolean) => console.log('Select all', isSelected),
    onCopyCode: (code: string) => console.log('Copy code', code),
    onEmailCode: (code: RedemptionCode) => console.log('Email code', code),
    onViewDetails: (code: RedemptionCode) => console.log('View details', code),
    onViewQRCode: (code: RedemptionCode) => console.log('View QR code', code),
    onCodeGeneration: (school: School) => handleGenerateCode(codeType, school, expireDays),
    onBulkGeneration: (amount: number, school: School) => handleBulkGenerate(amount, codeType, school, expireDays),
    onAutomatedGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string, school: School) => 
      handleAutomatedCodeGeneration(userType, amount, expiresInDays, emailDomain, school),
    onWizardGeneration: (params: any) => Promise.resolve([]),
    onScheduleEmail: scheduleEmail,
    onRefresh: fetchCodes,
    onExport: () => exportCodes(filteredCodes),
    onPrint: () => console.log('Print codes'),
    onEmailSelected: (codes: RedemptionCode[]) => console.log('Email selected', codes),
    onDeleteSelected: () => openDeleteDialog(selectedCodes),
    onPageChange: (page: number) => console.log('Page change to', page),
    onPageSizeChange: (size: number) => console.log('Page size change to', size)
  };

  const detailsView = <div>Details View Component</div>;
  const handleConfirmDelete = async () => {
    if (selectedForDelete.length === 0) return;
    
    const codeIds = selectedForDelete.map(code => code.id);
    const deletedCount = await handleDeleteSelectedCodes(codeIds);
    
    if (deletedCount > 0) {
      clearSelection();
      closeDeleteDialog();
      await fetchCodes();
    }
  };

  return {
    handlers,
    detailsView,
    handleConfirmDelete
  };
}
