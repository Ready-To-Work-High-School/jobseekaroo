
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const RedemptionCodeManager: React.FC = () => {
  const [codes, setCodes] = useState<RedemptionCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [codeType, setCodeType] = useState<'student' | 'employer'>('student');
  const [expireDays, setExpireDays] = useState<number>(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redemption Codes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Generate Code Section */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-3">Generate New Code</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                {isGenerating ? 'Generating...' : 'Generate Code'}
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {codes.map((code) => (
                        <TableRow key={code.id}>
                          <TableCell className="font-mono font-medium">{code.code}</TableCell>
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
                          <TableCell>{formatDate(code.createdAt?.toString())}</TableCell>
                          <TableCell>{formatDate(code.expiresAt?.toString())}</TableCell>
                          <TableCell>{code.usedBy || 'N/A'}</TableCell>
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
  );
};

export default RedemptionCodeManager;
