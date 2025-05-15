
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

// Sample applicant data
const sampleApplicants = [
  {
    id: "1",
    name: "Michael Johnson",
    position: "Retail Associate",
    date: "2025-04-20",
    status: "reviewing",
    avatar: null
  },
  {
    id: "2",
    name: "Sarah Williams",
    position: "Customer Service Representative",
    date: "2025-04-18",
    status: "interview",
    avatar: null
  },
  {
    id: "3",
    name: "David Brown",
    position: "Administrative Assistant",
    date: "2025-04-15",
    status: "rejected",
    avatar: null
  },
  {
    id: "4",
    name: "Lisa Garcia",
    position: "Retail Associate",
    date: "2025-04-12",
    status: "hired",
    avatar: null
  }
];

const ApplicantsTab = () => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'reviewing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">Reviewing</Badge>;
      case 'interview':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100">Interview</Badge>;
      case 'hired':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">Hired</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100">Not Selected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applicants</CardTitle>
        <CardDescription>
          Review and manage applicants for your job postings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sampleApplicants.map((applicant) => (
            <div key={applicant.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4 mb-3 md:mb-0">
                <Avatar>
                  <AvatarImage src={applicant.avatar} alt={applicant.name} />
                  <AvatarFallback>{getInitials(applicant.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{applicant.name}</h3>
                  <p className="text-sm text-muted-foreground">{applicant.position}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      Applied: {new Date(applicant.date).toLocaleDateString()}
                    </span>
                    {getStatusBadge(applicant.status)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Button variant="outline" size="sm" className="w-full md:w-auto">
                  View Details
                </Button>
                <Button className="w-full md:w-auto">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicantsTab;
