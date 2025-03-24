
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodesTab from './tabs/CodesTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import ReportsTab from './tabs/ReportsTab';
import WizardTab from './tabs/WizardTab';
import SchedulerTab from './tabs/SchedulerTab';
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

const RedemptionTabManager: React.FC<RedemptionTabManagerProps> = ({
  activeTab,
  setActiveTab,
  stats,
  filteredCodes,
  selectedCodes,
  allSelected,
  isLoading,
  isGenerating,
  isDeleting,
  isScheduling,
  codesTab,
  setCodesTab,
  currentPage,
  pageSize,
  totalCodes,
  codeType,
  setCodeType,
  expireDays,
  setExpireDays,
  formatDate,
  usageOverTime,
  generationOverTime,
  handlers
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="codes">Redemption Codes</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="wizard">Generation Wizard</TabsTrigger>
        <TabsTrigger value="scheduler">Email Scheduler</TabsTrigger>
      </TabsList>
      
      <TabsContent value="codes">
        <CodesTab
          stats={stats}
          filteredCodes={filteredCodes}
          selectedCodes={selectedCodes}
          allSelected={allSelected}
          isLoading={isLoading}
          isGenerating={isGenerating}
          isDeleting={isDeleting}
          activeTab={codesTab}
          setActiveTab={setCodesTab}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCodes={totalCodes}
          codeType={codeType}
          setCodeType={setCodeType}
          expireDays={expireDays}
          setExpireDays={setExpireDays}
          formatDate={formatDate}
          onApplyFilters={handlers.onApplyFilters}
          onSelectCode={handlers.onSelectCode}
          onSelectAll={handlers.onSelectAll}
          onCopyCode={handlers.onCopyCode}
          onEmailCode={handlers.onEmailCode}
          onViewDetails={handlers.onViewDetails}
          onViewQRCode={handlers.onViewQRCode}
          onCodeGeneration={handlers.onCodeGeneration}
          onBulkGeneration={handlers.onBulkGeneration}
          onAutomatedGeneration={handlers.onAutomatedGeneration}
          onRefresh={handlers.onRefresh}
          onExport={handlers.onExport}
          onPrint={handlers.onPrint}
          onEmailSelected={() => handlers.onEmailSelected(selectedCodes)}
          onDeleteSelected={handlers.onDeleteSelected}
          onPageChange={handlers.onPageChange}
          onPageSizeChange={handlers.onPageSizeChange}
        />
      </TabsContent>
      
      <TabsContent value="analytics">
        <AnalyticsTab 
          stats={stats} 
          usageOverTime={usageOverTime}
          generationOverTime={generationOverTime}
        />
      </TabsContent>
      
      <TabsContent value="reports">
        <ReportsTab codes={filteredCodes} formatDate={formatDate} />
      </TabsContent>
      
      <TabsContent value="wizard">
        <WizardTab 
          onGenerate={handlers.onWizardGeneration}
          isGenerating={isGenerating}
        />
      </TabsContent>
      
      <TabsContent value="scheduler">
        <SchedulerTab 
          onSchedule={handlers.onScheduleEmail}
          isScheduling={isScheduling}
        />
      </TabsContent>
    </Tabs>
  );
};

export default RedemptionTabManager;
