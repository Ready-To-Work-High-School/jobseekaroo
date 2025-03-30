
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle, Clock, Search, XCircle, ExternalLink, UserCheck, UserX, MailCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logSecurityEvent } from '@/contexts/auth/services/auditService';

interface EmployerProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company_name?: string;
  company_website?: string;
  created_at: string;
  employer_verification_status: 'pending' | 'approved' | 'rejected';
  verification_notes?: string;
  avatar_url?: string;
}

const EmployerVerification: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployer, setSelectedEmployer] = useState<EmployerProfile | null>(null);
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get employers based on verification status
  const { data: employers, isLoading, error } = useQuery({
    queryKey: ['employers', selectedTab],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          email,
          created_at,
          employer_verification_status,
          verification_notes,
          avatar_url,
          company_name,
          company_website
        `)
        .eq('user_type', 'employer')
        .eq('employer_verification_status', selectedTab)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as EmployerProfile[];
    }
  });
  
  // Update employer verification status
  const updateVerificationStatus = useMutation({
    mutationFn: async ({ 
      employerId, 
      status, 
      notes 
    }: { 
      employerId: string; 
      status: 'pending' | 'approved' | 'rejected'; 
      notes?: string;
    }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          employer_verification_status: status,
          verification_notes: notes
        })
        .eq('id', employerId);
      
      if (error) throw error;
      
      // Log this admin action
      await logSecurityEvent('employer_verification', undefined, {
        employer_id: employerId,
        status,
        has_notes: !!notes
      });
      
      // Send notification email if checkbox is checked
      if (sendEmail) {
        const employer = employers?.find(e => e.id === employerId);
        
        if (employer) {
          await supabase.functions.invoke('send-email', {
            body: {
              to: employer.email,
              subject: `Employer Account ${status === 'approved' ? 'Approved' : 'Verification Update'}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Career Platform Employer Account Update</h2>
                  <p>Dear ${employer.first_name},</p>
                  ${status === 'approved' 
                    ? `<p>Congratulations! Your employer account has been verified and approved. You can now post job listings and access all employer features.</p>
                       <p><a href="${window.location.origin}/employer-dashboard" style="color: #007bff;">Go to your Employer Dashboard</a></p>`
                    : status === 'rejected'
                      ? `<p>We've reviewed your employer account application and unfortunately we cannot approve it at this time.</p>
                         ${notes ? `<p>Reason: ${notes}</p>` : ''}`
                      : `<p>There has been an update to your employer account verification status. Please log in to check the details.</p>`
                  }
                  <p>If you have any questions, please contact our support team.</p>
                  <p>Thank you,<br/>The Career Platform Team</p>
                </div>
              `,
            },
          });
        }
      }
      
      return { employerId, status };
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['employers'] });
      setVerificationDialogOpen(false);
      
      toast({
        title: "Verification status updated",
        description: `Employer account has been ${selectedTab === 'approved' ? 'approved' : 'updated'}.`,
      });
    },
    onError: (error) => {
      console.error('Error updating verification status:', error);
      toast({
        title: "Error updating status",
        description: "An error occurred while updating the verification status.",
        variant: "destructive",
      });
    }
  });
  
  // Filter employers based on search query
  const filteredEmployers = employers?.filter(employer => {
    const fullName = `${employer.first_name} ${employer.last_name}`.toLowerCase();
    const companyName = (employer.company_name || '').toLowerCase();
    const email = employer.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    return fullName.includes(query) || 
           companyName.includes(query) || 
           email.includes(query);
  });
  
  const handleVerifyEmployer = (employer: EmployerProfile, status: 'approved' | 'rejected') => {
    setSelectedEmployer(employer);
    setVerificationNotes(employer.verification_notes || '');
    setSelectedTab(status);
    setVerificationDialogOpen(true);
  };
  
  const confirmVerification = () => {
    if (!selectedEmployer) return;
    
    updateVerificationStatus.mutate({
      employerId: selectedEmployer.id,
      status: selectedTab as 'approved' | 'rejected',
      notes: verificationNotes
    });
  };
  
  // Status badge component
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    switch(status) {
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employer Verification</CardTitle>
          <CardDescription>
            Review and verify employer accounts before they can post jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="pending" className="flex gap-2">
                  <Clock className="h-4 w-4" /> Pending
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex gap-2">
                  <CheckCircle className="h-4 w-4" /> Approved
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex gap-2">
                  <XCircle className="h-4 w-4" /> Rejected
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          {isLoading ? (
            <div className="py-10 text-center">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading employer accounts...</p>
            </div>
          ) : error ? (
            <div className="py-10 text-center">
              <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
              <p className="text-destructive">Error loading employers. Please try again.</p>
            </div>
          ) : filteredEmployers && filteredEmployers.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employer</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployers.map((employer) => (
                    <TableRow key={employer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employer.avatar_url || ''} alt={`${employer.first_name} ${employer.last_name}`} />
                            <AvatarFallback>{`${employer.first_name[0]}${employer.last_name[0]}`}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{`${employer.first_name} ${employer.last_name}`}</p>
                            <p className="text-xs text-muted-foreground">
                              Joined {new Date(employer.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{employer.company_name || 'Not specified'}</p>
                          {employer.company_website && (
                            <a 
                              href={employer.company_website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-primary flex items-center"
                            >
                              {employer.company_website.replace(/^https?:\/\//, '')}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <a href={`mailto:${employer.email}`} className="text-primary hover:underline">
                          {employer.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={employer.employer_verification_status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {selectedTab === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                                onClick={() => handleVerifyEmployer(employer, 'approved')}
                              >
                                <UserCheck className="h-4 w-4" /> Approve
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                                onClick={() => handleVerifyEmployer(employer, 'rejected')}
                              >
                                <UserX className="h-4 w-4" /> Reject
                              </Button>
                            </>
                          )}
                          {selectedTab !== 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 gap-1"
                              onClick={() => handleVerifyEmployer(employer, 'pending')}
                            >
                              <Clock className="h-4 w-4" /> Set Pending
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-10 text-center border rounded-md">
              <p className="text-muted-foreground">No {selectedTab} employer accounts found.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Verification Dialog */}
      <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedTab === 'approved' 
                ? 'Approve Employer Account' 
                : selectedTab === 'rejected'
                  ? 'Reject Employer Account'
                  : 'Update Verification Status'
              }
            </DialogTitle>
            <DialogDescription>
              {selectedTab === 'approved'
                ? 'Approving will allow this employer to post jobs and contact students.'
                : selectedTab === 'rejected'
                  ? 'Please provide a reason for rejecting this employer account.'
                  : 'Update the verification status of this employer account.'
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployer && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedEmployer.avatar_url || ''} alt={`${selectedEmployer.first_name} ${selectedEmployer.last_name}`} />
                  <AvatarFallback>{`${selectedEmployer.first_name[0]}${selectedEmployer.last_name[0]}`}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{`${selectedEmployer.first_name} ${selectedEmployer.last_name}`}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmployer.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="verification-notes">Notes {selectedTab === 'rejected' && '(required)'}</Label>
                <Textarea
                  id="verification-notes"
                  placeholder={selectedTab === 'rejected' 
                    ? "Please explain why this account is being rejected..." 
                    : "Add any notes about this verification..."}
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  required={selectedTab === 'rejected'}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="send-email" checked={sendEmail} onCheckedChange={(checked) => setSendEmail(!!checked)} />
                <Label htmlFor="send-email" className="flex items-center gap-1">
                  <MailCheck className="h-4 w-4" /> Send email notification
                </Label>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setVerificationDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button"
              onClick={confirmVerification}
              disabled={selectedTab === 'rejected' && !verificationNotes.trim()}
              variant={selectedTab === 'approved' ? 'default' : selectedTab === 'rejected' ? 'destructive' : 'default'}
            >
              {selectedTab === 'approved' 
                ? 'Approve Account' 
                : selectedTab === 'rejected'
                  ? 'Reject Account'
                  : 'Update Status'
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployerVerification;
