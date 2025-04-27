
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Briefcase, FileText, Clock, KanbanSquare } from 'lucide-react';

const ApplicantsTab = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>
              View and respond to candidates who have applied to your job postings
            </CardDescription>
          </div>
          <Button asChild variant="outline">
            <Link to="/employer/candidates" className="flex items-center gap-2">
              <KanbanSquare className="h-4 w-4" /> Kanban Board
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1 mb-3 md:mb-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Jane Smith</h3>
                <Badge>New</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  Retail Associate
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  Has Resume
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Applied: 10/24/2023
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                View Details
              </Button>
              <Button size="sm" className="w-full md:w-auto">
                Contact
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1 mb-3 md:mb-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Carlos Rodriguez</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  Administrative Assistant
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  Has Resume
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Applied: 10/20/2023
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="w-full md:w-auto">
                View Details
              </Button>
              <Button size="sm" className="w-full md:w-auto">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link to="/employer/candidates">
            <KanbanSquare className="mr-2 h-4 w-4" />
            Manage Candidates in Kanban Board
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicantsTab;
