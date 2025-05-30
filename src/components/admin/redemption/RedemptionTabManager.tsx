
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodesTab from '../redemption/tabs/CodesTab';
import AnalyticsTab from '../redemption/tabs/AnalyticsTab';
import ReportsTab from '../redemption/tabs/ReportsTab';
import WizardTab from '../redemption/tabs/WizardTab';
import SchedulerTab from '../redemption/tabs/SchedulerTab';
import RequestsTab from '../redemption/tabs/RequestsTab';
import { RedemptionTabManagerProps } from './tab-manager/types';
import CeoHeader from './tab-manager/CeoHeader';

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
  handlers,
  isCeo
}) => {
  // Create a dummy school for now - this should be replaced with actual school data from context or props
  const dummySchool = {
    id: "default-school-id",
    name: "Default School",
    slug: "default-school",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  return (
    <>
      {isCeo && <CeoHeader />}
      
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
            onCodeGeneration={isCeo ? (school) => handlers.onCodeGeneration(school) : undefined}
            onBulkGeneration={isCeo ? (amount, school) => handlers.onBulkGeneration(amount, school) : undefined}
            onAutomatedGeneration={isCeo ? handlers.onAutomatedGeneration : undefined}
            onRefresh={handlers.onRefresh}
            onExport={handlers.onExport}
            onPrint={handlers.onPrint}
            onEmailSelected={() => handlers.onEmailSelected(selectedCodes)}
            onDeleteSelected={handlers.onDeleteSelected}
            onPageChange={handlers.onPageChange}
            onPageSizeChange={handlers.onPageSizeChange}
            isCeo={isCeo}
            school={dummySchool}
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
}

export default RedemptionTabManager;
