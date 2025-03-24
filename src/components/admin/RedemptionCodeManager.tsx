
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  generateRedemptionCode, 
  listRedemptionCodes 
} from '@/lib/supabase/redemption';
import { RedemptionCode } from '@/types/redemption';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Download, Filter, Info, Printer, RefreshCcw, Copy, UserCircle, Briefcase, AlertCircle, CheckCircle, CalendarIcon } from 'lucide-react';

const RedemptionCodeManager: React.FC = () => {
  const [codes, setCodes] = useState<RedemptionCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [codeType, setCodeType] = useState<'student' | 'employer'>('student');
  const [expireDays, setExpireDays] = useState<number>(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCode, setSelectedCode] = useState<RedemptionCode | null>(null);
  const [showCodeDetails, setShowCodeDetails] = useState(false);
  const [bulkGenerateAmount, setBulkGenerateAmount] = useState<number>(5);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Statistics
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
      
      // Calculate statistics
      const allCodes = await listRedemptionCodes();
      const usedCodesCount = allCodes.filter(code => code.used).length;
      const studentCodesCount = allCodes.filter(code => code.type === 'student').length;
      const employerCodesCount = allCodes.filter(code => code.type === 'employer').length;
      
      // Codes expiring this month
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

  const handleGenerateCode = async () => {
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

  const handleBulkGenerate = async () => {
    setIsGenerating(true);
    setShowBulkDialog(false);
    
    try {
      const newCodes: RedemptionCode[] = [];
      
      // Generate multiple codes
      for (let i = 0; i < bulkGenerateAmount; i++) {
        const code = await generateRedemptionCode(codeType, expireDays);
        if (code) newCodes.push(code);
        // Short delay to avoid rate limiting
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied!',
      description: 'Redemption code copied to clipboard',
    });
  };

  const handleViewDetails = (code: RedemptionCode) => {
    setSelectedCode(code);
    setShowCodeDetails(true);
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
    // Create CSV content
    const csvContent = [
      // Header row
      ['Code', 'Type', 'Status', 'Created', 'Expires', 'Used By', 'Used At'].join(','),
      // Data rows
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
    
    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `redemption-codes-${new Date().toISOString().slice(0,10)}.csv`);
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Codes</p>
                <h3 className="text-2xl font-bold">{stats.totalCodes}</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Used Codes</p>
                <h3 className="text-2xl font-bold">{stats.usedCodes}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.totalCodes > 0 ? Math.round((stats.usedCodes / stats.totalCodes) * 100) : 0}% of total
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <UserCircle className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Student Codes</p>
                <h3 className="text-2xl font-bold">{stats.studentCodes}</h3>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <UserCircle className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employer Codes</p>
                <h3 className="text-2xl font-bold">{stats.employerCodes}</h3>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Briefcase className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Redemption Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Generate Code Section */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium mb-3">Generate New Code</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Select 
                    value={codeType} 
                    onValueChange={(value) => setCodeType(value as 'student' | 'employer')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Code Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    type="number"
                    value={expireDays.toString()}
                    onChange={(e) => setExpireDays(parseInt(e.target.value) || 30)}
                    placeholder="Expires in days"
                    min={1}
                  />
                </div>
                <Button onClick={handleGenerateCode} disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Generate Single Code'}
                </Button>
                <Button onClick={() => setShowBulkDialog(true)} variant="outline" disabled={isGenerating}>
                  Bulk Generate
                </Button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={fetchCodes}>
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={exportCodes}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>

            {/* Code List Section */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Codes</TabsTrigger>
                <TabsTrigger value="unused">Unused</TabsTrigger>
                <TabsTrigger value="used">Used</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="employers">Employers</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center p-4">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                ) : codes.length === 0 ? (
                  <div className="text-center p-4 text-gray-500">
                    No redemption codes found
                  </div>
                ) : (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Expires</TableHead>
                          <TableHead>Used By</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {codes.map((code) => (
                          <TableRow key={code.id}>
                            <TableCell className="font-mono font-medium">
                              <div className="flex items-center gap-1">
                                {code.code}
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-6 w-6" 
                                  onClick={() => handleCopyCode(code.code)}
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={code.type === 'student' ? 'default' : 'outline'}>
                                {code.type === 'student' ? 'Student' : 'Employer'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={code.used ? 'destructive' : 'success'}>
                                {code.used ? 'Used' : 'Available'}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(code.createdAt)}</TableCell>
                            <TableCell>{formatDate(code.expiresAt)}</TableCell>
                            <TableCell>{code.usedBy || 'N/A'}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleViewDetails(code)}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Generate Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Generate Codes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Number of Codes</Label>
              <Input
                id="amount"
                type="number"
                value={bulkGenerateAmount}
                onChange={(e) => setBulkGenerateAmount(parseInt(e.target.value) || 5)}
                min={1}
                max={50}
              />
              <p className="text-sm text-muted-foreground">Generates up to 50 codes at once</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkDialog(false)}>Cancel</Button>
            <Button onClick={handleBulkGenerate} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Codes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Code Details Dialog */}
      <Dialog open={showCodeDetails} onOpenChange={setShowCodeDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Redemption Code Details</DialogTitle>
          </DialogHeader>
          {selectedCode && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Code</p>
                  <p className="font-mono font-medium">{selectedCode.code}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <Badge variant={selectedCode.type === 'student' ? 'default' : 'outline'}>
                    {selectedCode.type === 'student' ? 'Student' : 'Employer'}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={selectedCode.used ? 'destructive' : 'success'}>
                    {selectedCode.used ? 'Used' : 'Available'}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p>{formatDate(selectedCode.createdAt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Expires</p>
                  <p>{formatDate(selectedCode.expiresAt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Used By</p>
                  <p>{selectedCode.usedBy || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Used At</p>
                  <p>{formatDate(selectedCode.usedAt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">ID</p>
                  <p className="text-xs text-muted-foreground truncate">{selectedCode.id}</p>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleCopyCode(selectedCode.code)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RedemptionCodeManager;
