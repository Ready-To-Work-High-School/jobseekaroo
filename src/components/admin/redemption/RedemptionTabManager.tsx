import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodesTab from './tabs/CodesTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import ReportsTab from './tabs/ReportsTab';
import WizardTab from './tabs/WizardTab';
import SchedulerTab from './tabs/SchedulerTab';
import RequestsTab from './tabs/RequestsTab';
import { RedemptionCode } from '@/types/redemption';
import { ScheduleEmailParams } from '@/hooks/redemption/useScheduledEmails';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus, Trash } from 'lucide-react';

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
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is CEO - in a real app, you'd check a specific role
  // For this example, we'll use a simple check based on email domain
  const isCeo = userProfile?.email?.endsWith('@ceo.westsidehigh.edu') || 
               userProfile?.email?.endsWith('@executive.westsidehigh.edu') ||
               userProfile?.company_name?.includes('CEO') ||
               userProfile?.job_title?.includes('CEO') ||
               userProfile?.job_title?.includes('Chief Executive');

  // Navigate to employer dashboard to manage jobs
  const handleManageJobs = () => {
    navigate('/employer-dashboard');
  };

  return (
    <>
      {isCeo && (
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">CEO Dashboard</h2>
            <p className="text-sm text-muted-foreground">Manage codes and job postings</p>
          </div>
          <Button 
            onClick={handleManageJobs} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Briefcase className="h-4 w-4" />
            Manage Job Postings
          </Button>
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="codes">Redemption Codes</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          {isCeo && <TabsTrigger value="wizard">Generation Wizard</TabsTrigger>}
          {isCeo && <TabsTrigger value="scheduler">Email Scheduler</TabsTrigger>}
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
            onCodeGeneration={isCeo ? handlers.onCodeGeneration : undefined}
            onBulkGeneration={isCeo ? handlers.onBulkGeneration : undefined}
            onAutomatedGeneration={isCeo ? handlers.onAutomatedGeneration : undefined}
            onRefresh={handlers.onRefresh}
            onExport={handlers.onExport}
            onPrint={handlers.onPrint}
            onEmailSelected={() => handlers.onEmailSelected(selectedCodes)}
            onDeleteSelected={handlers.onDeleteSelected}
            onPageChange={handlers.onPageChange}
            onPageSizeChange={handlers.onPageSizeChange}
            isCeo={isCeo}
          />
        </TabsContent>
        
        <TabsContent value="requests">
          <RequestsTab isCeo={isCeo} />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsTab 
            stats={stats} 
            usageOverTime={usageOverTime}
            generationOverTime={generationOverTime}
            codes={filteredCodes}
          />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportsTab codes={filteredCodes} formatDate={formatDate} />
        </TabsContent>
        
        {isCeo && (
          <TabsContent value="wizard">
            <WizardTab 
              onGenerate={handlers.onWizardGeneration}
              isGenerating={isGenerating}
            />
          </TabsContent>
        )}
        
        {isCeo && (
          <TabsContent value="scheduler">
            <SchedulerTab 
              onSchedule={handlers.onScheduleEmail}
              isScheduling={isScheduling}
            />
          </TabsContent>
        )}
      </Tabs>
    </>
  );
};

export default RedemptionTabManager;
