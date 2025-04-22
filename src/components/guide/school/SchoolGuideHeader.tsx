
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const SchoolGuideHeader = () => {
  return (
    <div className="max-w-3xl mx-auto mb-10">
      <h2 className="text-3xl font-bold mb-4">School Guide</h2>
      <p className="text-muted-foreground mb-6">
        Our platform helps schools connect students with valuable work opportunities and provide career readiness tools. Here's how your school can benefit.
      </p>
      
      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-2">Get Started in 4 Simple Steps</h3>
        <ol className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
            <span>Register your school and verify your administrator status</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
            <span>Generate access codes for students and counselors</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
            <span>Set up school profile and employer partnerships</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="bg-blue-100 dark:bg-blue-900 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
            <span>Access analytics and track student engagement</span>
          </li>
        </ol>
      </div>
      
      <div className="flex justify-center">
        <Button asChild size="lg" className="gap-2">
          <Link to="/school-landing">
            Register Your School
          </Link>
        </Button>
      </div>
    </div>
  );
};

