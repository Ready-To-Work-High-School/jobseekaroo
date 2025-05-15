
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

const JobPostingCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Position</CardTitle>
        <CardDescription>
          Complete the form below to post a job opportunity for our students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 text-center">
          <p className="text-amber-800 font-medium">
            Use our employer dashboard to post job opportunities for our students.
            The dashboard lets you manage applications and communicate with candidates.
          </p>
        </div>
        <div className="text-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/employer-dashboard">
              Access Employer Dashboard
              <ExternalLink className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostingCard;
