
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Key,
  FileText,
  Plus,
  Copy,
  Trash2,
  AlertTriangle,
  Search,
  Calendar,
  FileOutput
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { generateAdminRedemptionCode } from '@/lib/supabase/redemption/generateAdminCode';

// Mock data to represent redemption codes
const mockCodes = [
  { id: '1', code: 'ADMIN-XY2TR5', type: 'admin', used: false, createdAt: new Date('2025-03-15'), expiresAt: new Date('2026-03-15') },
  { id: '2', code: 'STUDENT-ABC123', type: 'student', used: true, createdAt: new Date('2025-01-10'), expiresAt: new Date('2025-07-10') },
  { id: '3', code: 'EMPLOYER-DEF456', type: 'employer', used: false, createdAt: new Date('2025-03-01'), expiresAt: new Date('2026-03-01') },
  { id: '4', code: 'ADMIN-GHI789', type: 'admin', used: false, createdAt: new Date('2025-02-20'), expiresAt: new Date('2026-02-20') }
];

const RedemptionCodesManager = () => {
  const [codes, setCodes] = useState(mockCodes);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [codeToDelete, setCodeToDelete] = useState<any>(null);
  const [newCodeType, setNewCodeType] = useState('admin');
  const [newCodeExpiry, setNewCodeExpiry] = useState('365');
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [bulkAmount, setBulkAmount] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Filter codes based on search query and active tab
  const filteredCodes = codes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'admin' && code.type === 'admin') ||
      (activeTab === 'student' && code.type === 'student') ||
      (activeTab === 'employer' && code.type === 'employer') ||
      (activeTab === 'unused' && !code.used) ||
      (activeTab === 'used' && code.used);
    
    return matchesSearch && matchesTab;
  });
  
  // Generate a single code
  const handleGenerateCode = async () => {
    try {
      // In a real application, this would call your backend service
      let newCode;
      
      if (newCodeType === 'admin') {
        // Use the actual function for admin codes
        newCode = await generateAdminRedemptionCode(parseInt(newCodeExpiry));
        
        // If the function fails, fall back to mock data
        if (!newCode) {
          throw new Error("Failed to generate admin code");
        }
      } else {
        // Mock for other code types
        const codePrefix = newCodeType.toUpperCase();
        const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
        const code = `${codePrefix}-${randomPart}`;
        
        const expDate = new Date();
        expDate.setDate(expDate.getDate() + parseInt(newCodeExpiry));
        
        newCode = {
          id: `mock-${Date.now()}`,
          code: code,
          type: newCodeType,
          used: false,
          createdAt: new Date(),
          expiresAt: expDate
        };
      }
      
      setCodes([newCode, ...codes]);
      setShowGenerateDialog(false);
      
      toast({
        title: "Code generated",
        description: `New ${newCodeType} code: ${newCode.code}`,
      });
    } catch (error) {
      console.error('Error generating code:', error);
      
      toast({
        title: "Error",
        description: "Failed to generate redemption code",
        variant: "destructive",
      });
    }
  };
  
  // Generate multiple codes in bulk
  const handleBulkGenerate = () => {
    try {
      const amount = parseInt(bulkAmount);
      if (isNaN(amount) || amount <= 0 || amount > 100) {
        toast({
          title: "Invalid amount",
          description: "Please enter a number between 1 and 100",
          variant: "destructive",
        });
        return;
      }
      
      const newCodes = Array(amount).fill(0).map((_, i) => {
        const codePrefix = newCodeType.toUpperCase();
        const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
        const code = `${codePrefix}-${randomPart}`;
        
        const expDate = new Date();
        expDate.setDate(expDate.getDate() + parseInt(newCodeExpiry));
        
        return {
          id: `mock-bulk-${Date.now()}-${i}`,
          code: code,
          type: newCodeType,
          used: false,
          createdAt: new Date(),
          expiresAt: expDate
        };
      });
      
      setCodes([...newCodes, ...codes]);
      setShowBulkDialog(false);
      
      toast({
        title: "Bulk codes generated",
        description: `Generated ${amount} new ${newCodeType} codes`,
      });
    } catch (error) {
      console.error('Error generating bulk codes:', error);
      
      toast({
        title: "Error",
        description: "Failed to generate bulk redemption codes",
        variant: "destructive",
      });
    }
  };
  
  // Delete a code
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
  
  // Copy code to clipboard
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: "Redemption code copied to clipboard",
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
  
  // Export codes as CSV
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
          <CardTitle className="text-xl flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            Redemption Codes Manager
          </CardTitle>
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
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Expires</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCodes.map((code) => (
                  <tr key={code.id} className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-mono">{code.code}</td>
                    <td className="px-4 py-3 text-sm capitalize">{code.type}</td>
                    <td className="px-4 py-3 text-sm">
                      {code.used ? (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                          Used
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">{formatDate(code.createdAt)}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(code.expiresAt)}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleCopyCode(code.code)}
                          title="Copy code"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => {
                            setCodeToDelete(code);
                            setShowDeleteDialog(true);
                          }}
                          title="Delete code"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredCodes.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No redemption codes found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Generate Code Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Redemption Code</DialogTitle>
            <DialogDescription>
              Create a new redemption code for user access
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code-type">Code Type</Label>
              <Select value={newCodeType} onValueChange={setNewCodeType}>
                <SelectTrigger id="code-type">
                  <SelectValue placeholder="Select code type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiry">Expires After (Days)</Label>
              <Select value={newCodeExpiry} onValueChange={setNewCodeExpiry}>
                <SelectTrigger id="expiry">
                  <SelectValue placeholder="Select expiry period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">365 days</SelectItem>
                  <SelectItem value="730">730 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="make-reusable" />
              <Label htmlFor="make-reusable">Make code reusable</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGenerateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateCode}>
              Generate Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Generate Dialog */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Generate Codes</DialogTitle>
            <DialogDescription>
              Create multiple redemption codes at once
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Number of Codes (1-100)</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                max="100"
                value={bulkAmount}
                onChange={(e) => setBulkAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bulk-code-type">Code Type</Label>
              <Select value={newCodeType} onValueChange={setNewCodeType}>
                <SelectTrigger id="bulk-code-type">
                  <SelectValue placeholder="Select code type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bulk-expiry">Expires After (Days)</Label>
              <Select value={newCodeExpiry} onValueChange={setNewCodeExpiry}>
                <SelectTrigger id="bulk-expiry">
                  <SelectValue placeholder="Select expiry period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">365 days</SelectItem>
                  <SelectItem value="730">730 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkGenerate}>
              Generate {bulkAmount} Codes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Code Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Redemption Code
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this code? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {codeToDelete && (
            <div className="py-4">
              <div className="p-4 border rounded-md bg-muted/50">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Code:</div>
                  <div className="font-mono">{codeToDelete.code}</div>
                  
                  <div className="font-medium">Type:</div>
                  <div className="capitalize">{codeToDelete.type}</div>
                  
                  <div className="font-medium">Status:</div>
                  <div>{codeToDelete.used ? 'Used' : 'Unused'}</div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCode}>
              Delete Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RedemptionCodesManager;

// Add missing component
function FileOutput(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M2 15h10" />
      <path d="m5 12-3 3 3 3" />
    </svg>
  );
}
