
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Shield, Users, BarChart3, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmployerFeatureCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            <CardTitle>Job Postings</CardTitle>
          </div>
          <CardDescription>Create effective listings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Our platform makes it easy to post jobs appropriate for high school students:</p>
          <ul className="space-y-2">
            {["Templates designed for entry-level positions", 
              "Guidance on youth labor compliance",
              "Premium placement options for increased visibility",
              "Set required skills and qualifications"].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-full">
            <Link to="/employer-dashboard">Create Job Posting</Link>
          </Button>
        </CardContent>
      </Card>
      
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-blue-500" />
            <CardTitle>Candidate Management</CardTitle>
          </div>
          <CardDescription>Find the right talent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Efficiently review and manage applicants:</p>
          <ul className="space-y-2">
            {["AI-powered skill matching technology",
              "Verified skills and credentials",
              "Streamlined communication with candidates",
              "Application status tracking"].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="w-full">
            <Link to="/employer-dashboard">Manage Candidates</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerFeatureCards;
