
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RedemptionCode } from '@/types/redemption';
import RedemptionCodesTable from '../RedemptionCodesTable';
import RedemptionCodesPagination from './RedemptionCodesPagination';
import RedemptionCodeActions from '../RedemptionCodeActions';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Filter } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface RedemptionCodeTableProps {
  codes: RedemptionCode[];
  selectedCodes: RedemptionCode[];
  allSelected: boolean;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPage: number;
  pageSize: number;
  totalCodes: number;
  formatDate: (date?: Date | string) => string;
  onSelectCode: (code: RedemptionCode, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onCopyCode: (code: string) => void;
  onEmailCode: (code: RedemptionCode) => void;
  onViewDetails: (code: RedemptionCode) => void;
  onRefresh: () => Promise<void>;
  onExport: () => void;
  onPrint: () => void;
  onEmailSelected: () => void;
  onDeleteSelected: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const RedemptionCodeTable: React.FC<RedemptionCodeTableProps> = ({
  codes,
  selectedCodes,
  allSelected,
  isLoading,
  activeTab,
  setActiveTab,
  currentPage,
  pageSize,
  totalCodes,
  formatDate,
  onSelectCode,
  onSelectAll,
  onCopyCode,
  onEmailCode,
  onViewDetails,
  onRefresh,
  onExport,
  onPrint,
  onEmailSelected,
  onDeleteSelected,
  onPageChange,
  onPageSizeChange
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle refresh with loading state
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 500); // Show spinner for at least 500ms for UX
  };

  // Get count of codes by status for badges
  const unusedCount = codes.filter(code => !code.used).length;
  const usedCount = codes.filter(code => code.used).length;
  const studentCount = codes.filter(code => code.type === 'student').length;
  const employerCount = codes.filter(code => code.type === 'employer').length;

  return (
    <Card className="w-full bg-white shadow-sm overflow-hidden">
      <CardContent className="p-0 sm:p-6">
        <div className="space-y-6">
          {/* Mobile Actions Sheet */}
          <div className="flex md:hidden justify-between items-center p-4 border-b">
            <h3 className="text-base font-semibold">Redemption Codes</h3>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  Actions
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4">Code Actions</h3>
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="justify-start"
                    >
                      {isRefreshing ? 'Refreshing...' : 'Refresh Codes'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={onExport}
                      className="justify-start"
                    >
                      Export Codes
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={onPrint}
                      className="justify-start"
                    >
                      Print Codes
                    </Button>
                    
                    {selectedCodes.length > 0 && (
                      <>
                        <div className="h-px bg-gray-200 my-2" />
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          Selected: {selectedCodes.length} codes
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={onEmailSelected}
                          className="justify-start"
                        >
                          Email Selected
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={onDeleteSelected}
                          className="justify-start"
                        >
                          Delete Selected
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:block">
            <RedemptionCodeActions
              selectedCount={selectedCodes.length}
              onRefresh={handleRefresh}
              onExport={onExport}
              onPrint={onPrint}
              onEmailSelected={onEmailSelected}
              onDeleteSelected={onDeleteSelected}
              isRefreshing={isRefreshing}
            />
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 w-full overflow-x-auto flex-wrap sm:flex-nowrap h-auto p-1">
              <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
                All Codes
                <Badge variant="outline" className="ml-2 bg-background text-foreground">
                  {totalCodes}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unused" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
                Unused
                <Badge variant="outline" className="ml-2 bg-background text-foreground">
                  {totalCodes > 0 ? unusedCount : '—'}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="used" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
                Used
                <Badge variant="outline" className="ml-2 bg-background text-foreground">
                  {totalCodes > 0 ? usedCount : '—'}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="students" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
                Students
                <Badge variant="outline" className="ml-2 bg-background text-foreground">
                  {totalCodes > 0 ? studentCount : '—'}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="employers" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-[120px]">
                Employers
                <Badge variant="outline" className="ml-2 bg-background text-foreground">
                  {totalCodes > 0 ? employerCount : '—'}
                </Badge>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : codes.length > 0 ? (
                <RedemptionCodesTable
                  codes={codes}
                  selectedCodes={selectedCodes}
                  allSelected={allSelected}
                  isLoading={isLoading}
                  formatDate={formatDate}
                  onSelectCode={onSelectCode}
                  onSelectAll={onSelectAll}
                  onCopyCode={onCopyCode}
                  onEmailCode={onEmailCode}
                  onViewDetails={onViewDetails}
                />
              ) : (
                <Alert variant="default" className="border-dashed bg-muted/50 mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm text-muted-foreground">
                    No redemption codes found for the selected filter. Try generating some codes or changing the filter.
                  </AlertDescription>
                </Alert>
              )}
              
              {!isLoading && codes.length > 0 && (
                <RedemptionCodesPagination 
                  currentPage={currentPage}
                  pageSize={pageSize}
                  totalItems={totalCodes}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedemptionCodeTable;
