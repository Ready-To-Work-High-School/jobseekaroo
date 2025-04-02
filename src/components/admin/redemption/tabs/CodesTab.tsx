
import React from 'react';
import CodeGenerationPanel from '../code-generation/CodeGenerationPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import AllCodesTab from './AllCodesTab';
import StudentCodesTab from './StudentCodesTab';
import EmployerCodesTab from './EmployerCodesTab';
import RedemptionCodeStats from '../RedemptionCodeStats';
import { RedemptionCode } from '@/types/redemption';

interface CodesTabProps {
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
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPage: number;
  pageSize: number;
  totalCodes: number;
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
  formatDate: (date?: Date | string) => string;
  isCeo?: boolean;
  onApplyFilters: (filters: any) => void;
  onSelectCode: (code: RedemptionCode, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onCopyCode: (code: string) => void;
  onEmailCode: (code: RedemptionCode) => void;
  onViewDetails: (code: RedemptionCode) => void;
  onViewQRCode: (code: RedemptionCode) => void;
  onCodeGeneration?: () => Promise<void>;
  onBulkGeneration?: (amount: number) => Promise<void>;
  onAutomatedGeneration?: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<void>;
  onRefresh: () => Promise<void>;
  onExport: () => void;
  onPrint: () => void;
  onEmailSelected: () => void;
  onDeleteSelected: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const CodesTab: React.FC<CodesTabProps> = ({
  stats,
  filteredCodes,
  selectedCodes,
  allSelected,
  isLoading,
  isGenerating,
  isDeleting,
  activeTab,
  setActiveTab,
  currentPage,
  pageSize,
  totalCodes,
  codeType,
  setCodeType,
  expireDays,
  setExpireDays,
  formatDate,
  isCeo = false,
  onApplyFilters,
  onSelectCode,
  onSelectAll,
  onCopyCode,
  onEmailCode,
  onViewDetails,
  onViewQRCode,
  onCodeGeneration,
  onBulkGeneration,
  onAutomatedGeneration,
  onRefresh,
  onExport,
  onPrint,
  onEmailSelected,
  onDeleteSelected,
  onPageChange,
  onPageSizeChange
}) => {
  return (
    <div className="space-y-6">
      <RedemptionCodeStats stats={stats} />
      
      {!isCeo && (
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Administrator Access</AlertTitle>
          <AlertDescription>
            As an administrator, you can manage existing redemption codes, but new codes must be requested from a CEO or executive. Please use the Requests tab to submit a code generation request.
          </AlertDescription>
        </Alert>
      )}
      
      {isCeo && onCodeGeneration && onBulkGeneration && onAutomatedGeneration && (
        <CodeGenerationPanel
          onGenerateCode={onCodeGeneration}
          onBulkGenerate={onBulkGeneration}
          onAutomatedGeneration={onAutomatedGeneration}
          isGenerating={isGenerating}
          codeType={codeType}
          setCodeType={setCodeType}
          expireDays={expireDays}
          setExpireDays={setExpireDays}
        />
      )}
      
      <Card>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full p-0 bg-transparent">
            <TabsTrigger value="all" className="flex-1 rounded-none data-[state=active]:bg-background">
              All Codes ({filteredCodes.length})
            </TabsTrigger>
            <TabsTrigger value="student" className="flex-1 rounded-none data-[state=active]:bg-background">
              Student Codes ({stats.studentCodes})
            </TabsTrigger>
            <TabsTrigger value="employer" className="flex-1 rounded-none data-[state=active]:bg-background">
              Employer Codes ({stats.employerCodes})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <AllCodesTab
              codes={filteredCodes}
              selectedCodes={selectedCodes}
              allSelected={allSelected}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCodes={totalCodes}
              isLoading={isLoading}
              isDeleting={isDeleting}
              formatDate={formatDate}
              onSelectCode={onSelectCode}
              onSelectAll={onSelectAll}
              onCopyCode={onCopyCode}
              onEmailCode={onEmailCode}
              onViewDetails={onViewDetails}
              onViewQRCode={onViewQRCode}
              onRefresh={onRefresh}
              onExport={onExport}
              onPrint={onPrint}
              onEmailSelected={onEmailSelected}
              onDeleteSelected={onDeleteSelected}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </TabsContent>
          
          <TabsContent value="student" className="m-0">
            <StudentCodesTab
              codes={filteredCodes.filter(code => code.type === 'student')}
              selectedCodes={selectedCodes}
              allSelected={allSelected}
              isLoading={isLoading}
              isDeleting={isDeleting}
              formatDate={formatDate}
              onSelectCode={onSelectCode}
              onSelectAll={onSelectAll}
              onCopyCode={onCopyCode}
              onEmailCode={onEmailCode}
              onViewDetails={onViewDetails}
              onViewQRCode={onViewQRCode}
              onRefresh={onRefresh}
              onExport={onExport}
              onPrint={onPrint}
              onEmailSelected={onEmailSelected}
              onDeleteSelected={onDeleteSelected}
            />
          </TabsContent>
          
          <TabsContent value="employer" className="m-0">
            <EmployerCodesTab
              codes={filteredCodes.filter(code => code.type === 'employer')}
              selectedCodes={selectedCodes}
              allSelected={allSelected}
              isLoading={isLoading}
              isDeleting={isDeleting}
              formatDate={formatDate}
              onSelectCode={onSelectCode}
              onSelectAll={onSelectAll}
              onCopyCode={onCopyCode}
              onEmailCode={onEmailCode}
              onViewDetails={onViewDetails}
              onViewQRCode={onViewQRCode}
              onRefresh={onRefresh}
              onExport={onExport}
              onPrint={onPrint}
              onEmailSelected={onEmailSelected}
              onDeleteSelected={onDeleteSelected}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default CodesTab;
