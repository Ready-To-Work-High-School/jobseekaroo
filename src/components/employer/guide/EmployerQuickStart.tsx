
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmployerQuickStart = () => {
  return (
    <div className="max-w-3xl mx-auto mb-10">
      <h2 className="text-3xl font-bold mb-4">Employer Guide</h2>
      <p className="text-muted-foreground mb-6">
        Our platform connects you with motivated high school students ready to contribute to your business. Here's how to effectively use our employer tools.
      </p>
      
      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-2">Get Started in 4 Simple Steps</h3>
        <ol className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
            <span>Create an employer account and complete verification</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
            <span>Post job opportunities tailored for entry-level candidates</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
            <span>Review applications and use AI matching to find qualified candidates</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
            <span>Schedule interviews and manage the hiring process</span>
          </li>
        </ol>
      </div>
      
      <div className="flex justify-center mb-8">
        <Button asChild size="lg" className="gap-2">
          <Link to="/employer-dashboard">
            Access Employer Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmployerQuickStart;
