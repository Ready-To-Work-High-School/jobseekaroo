
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeRequestSystem from '../CodeRequestSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Check as CheckIcon, X as CrossIcon } from 'lucide-react';

// Mock data for demonstration
const mockRequests = [
  {
    id: '1',
    requestedBy: 'John Smith',
    requestedAt: new Date(Date.now() - 86400000 * 2),
    codeType: 'student',
    amount: 15,
    schoolName: 'Westside High School',
    justification: 'For new students in the spring semester computer science program.',
    status: 'pending'
  },
  {
    id: '2',
    requestedBy: 'Sarah Johnson',
    requestedAt: new Date(Date.now() - 86400000 * 5),
    codeType: 'student',
    amount: 30,
    schoolName: 'East Valley Middle School',
    justification: 'Career day event for 8th grade students exploring tech careers.',
    status: 'approved'
  },
  {
    id: '3',
    requestedBy: 'Michael Chen',
    requestedAt: new Date(Date.now() - 86400000 * 1),
    codeType: 'employer',
    amount: 5,
    justification: 'Local businesses participating in internship program.',
    status: 'pending'
  },
  {
    id: '4',
    requestedBy: 'Lisa Rodriguez',
    requestedAt: new Date(Date.now() - 86400000 * 3),
    codeType: 'teacher',
    amount: 10,
    schoolName: 'Westside High School',
    justification: 'New teachers starting next semester need access to the platform.',
    status: 'pending'
  },
  {
    id: '5',
    requestedBy: 'David Williams',
    requestedAt: new Date(Date.now() - 86400000 * 4),
    codeType: 'admin',
    amount: 3,
    justification: 'New administrators need system access for the upcoming academic year.',
    status: 'pending'
  },
  {
    id: '6',
    requestedBy: 'Emily Taylor',
    requestedAt: new Date(Date.now() - 86400000 * 7),
    codeType: 'school',
    amount: 1,
    justification: 'Creating institutional account for Northside Academy.',
    status: 'approved'
  }
];

interface RequestsTabProps {
  isCeo?: boolean;
}

const RequestsTab: React.FC<RequestsTabProps> = ({ isCeo = false }) => {
  const [activeTab, setActiveTab] = useState('new-request');
  const [requests, setRequests] = useState(mockRequests);
  
  const { userProfile } = useAuth();
  
  const handleRequestSubmitted = () => {
    setActiveTab('your-requests');
  };
  
  const handleApproveRequest = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved' } 
          : req
      )
    );
  };
  
  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' } 
          : req
      )
    );
  };
  
  const renderRequestStatus = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const getRequestTypeDisplay = (type: string) => {
    switch (type) {
      case 'student': return 'Student';
      case 'employer': return 'Employer';
      case 'teacher': return 'Teacher';
      case 'admin': return 'Administrator';
      case 'school': return 'School';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="new-request">New Request</TabsTrigger>
          <TabsTrigger value="your-requests">Your Requests</TabsTrigger>
          {isCeo && <TabsTrigger value="pending-approvals">Pending Approvals</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="new-request">
          <CodeRequestSystem onRequestSubmitted={handleRequestSubmitted} />
        </TabsContent>
        
        <TabsContent value="your-requests">
          <Card>
            <CardHeader>
              <CardTitle>Your Code Requests</CardTitle>
              <CardDescription>
                Track the status of your redemption code requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {requests.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      You haven't made any requests yet.
                    </p>
                  ) : (
                    requests.map(request => (
                      <Card key={request.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              {request.amount} {getRequestTypeDisplay(request.codeType)} codes
                              {request.schoolName && ` for ${request.schoolName}`}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Requested on {request.requestedAt.toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            {renderRequestStatus(request.status)}
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{request.justification}</p>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {isCeo && (
          <TabsContent value="pending-approvals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approval Requests</CardTitle>
                <CardDescription>
                  Review and manage redemption code requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {requests.filter(r => r.status === 'pending').length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No pending requests to review.
                      </p>
                    ) : (
                      requests
                        .filter(r => r.status === 'pending')
                        .map(request => (
                          <Card key={request.id} className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">
                                  {request.amount} {getRequestTypeDisplay(request.codeType)} codes
                                  {request.schoolName && ` for ${request.schoolName}`}
                                </h4>
                                <p className="text-sm">
                                  Requested by: <span className="font-medium">{request.requestedBy}</span>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Requested on {request.requestedAt.toLocaleDateString()}
                                </p>
                                <p className="mt-2">{request.justification}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-red-200 hover:bg-red-50"
                                  onClick={() => handleRejectRequest(request.id)}
                                >
                                  <CrossIcon className="h-4 w-4 text-red-500 mr-1" />
                                  Reject
                                </Button>
                                <Button 
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApproveRequest(request.id)}
                                >
                                  <CheckIcon className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default RequestsTab;
