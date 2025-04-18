
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, FileText, FileOutput } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useRedemptionTableData } from '@/hooks/redemption/useRedemptionTableData';
import { useRedemptionCodeGeneration } from '@/hooks/redemption/useRedemptionCodeGeneration';
import RedemptionCodesTable from './redemption/RedemptionCodesTable';
import GenerateCodeDialog from './redemption/dialogs/GenerateCodeDialog';
import BulkGenerateDialog from './redemption/dialogs/BulkGenerateDialog';
import DeleteCodeDialog from './redemption/dialogs/DeleteCodeDialog';

const RedemptionCodesManager = () => {
  const { toast } = useToast();
  const {
    codes,
    setCodes,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    filteredCodes
  } = useRedemptionTableData();

  const {
    showGenerateDialog,
    setShowGenerateDialog,
    showBulkDialog,
    setShowBulkDialog,
    newCodeType,
    setNewCodeType,
    newCodeExpiry,
    setNewCodeExpiry,
    bulkAmount,
    setBulkAmount,
    handleGenerateCode,
    handleBulkGenerate
  } = useRedemptionCodeGeneration(codes, setCodes);

  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [codeToDelete, setCodeToDelete] = React.useState<any>(null);

  // Handle copying code to clipboard
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: "Redemption code copied to clipboard",
    });
  };

  // Handle deleting a code
  const handleDeleteCode = () => {
    if (!codeToDelete) return;
    
    setCodes(codes.filter(code => code.id !== codeToDelete.id));
    setShowDeleteDialog(false);
    setCodeToDelete(null);
    
    toast({
      title: "Code deleted",
      description: `Redemption code ${codeToDelete.code} has been deleted`,
    });
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Handle exporting codes
  const handleExportCodes = () => {
    const csvContent = [
      ['Code', 'Type', 'Status', 'Created Date', 'Expiry Date'],
      ...filteredCodes.map(code => [
        code.code,
        code.type,
        code.used ? 'Used' : 'Unused',
        formatDate(code.createdAt),
        formatDate(code.expiresAt)
      ])
    ]
    .map(row => row.join(','))
    .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'redemption_codes.csv');
    link.click();
    
    toast({
      title: "Codes exported",
      description: "Redemption codes have been exported as CSV file",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Redemption Codes Manager</CardTitle>
          <CardDescription>
            Generate and manage redemption codes for all user types
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search codes..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowGenerateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" /> Generate Code
              </Button>
              <Button variant="outline" onClick={() => setShowBulkDialog(true)}>
                <FileText className="h-4 w-4 mr-2" /> Bulk Generate
              </Button>
              <Button variant="outline" onClick={handleExportCodes}>
                <FileOutput className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Codes</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
              <TabsTrigger value="unused">Unused</TabsTrigger>
              <TabsTrigger value="used">Used</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="border rounded-md overflow-x-auto">
            <RedemptionCodesTable
              codes={filteredCodes}
              onCopyCode={handleCopyCode}
              onDeleteCode={(code) => {
                setCodeToDelete(code);
                setShowDeleteDialog(true);
              }}
              formatDate={formatDate}
            />
          </div>
        </CardContent>
      </Card>

      <GenerateCodeDialog
        open={showGenerateDialog}
        onOpenChange={setShowGenerateDialog}
        codeType={newCodeType}
        setCodeType={setNewCodeType}
        expiry={newCodeExpiry}
        setExpiry={setNewCodeExpiry}
        onGenerate={handleGenerateCode}
      />

      <BulkGenerateDialog
        open={showBulkDialog}
        onOpenChange={setShowBulkDialog}
        amount={bulkAmount}
        setAmount={setBulkAmount}
        codeType={newCodeType}
        setCodeType={setNewCodeType}
        expiry={newCodeExpiry}
        setExpiry={setNewCodeExpiry}
        onGenerate={handleBulkGenerate}
      />

      <DeleteCodeDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        code={codeToDelete}
        onConfirm={handleDeleteCode}
      />
    </div>
  );
};

export default RedemptionCodesManager;
