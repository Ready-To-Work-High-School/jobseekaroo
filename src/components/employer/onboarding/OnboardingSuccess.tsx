
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OnboardingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
      <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Application Submitted!</h2>
        <p className="text-muted-foreground">
          Thank you for completing the employer verification process. Our team will review your information within 48 hours.
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800 max-w-md">
        <p className="font-medium">What happens next?</p>
        <ul className="list-disc pl-5 mt-2 text-left">
          <li>You'll receive a confirmation email shortly</li>
          <li>Our team will review your business information</li>
          <li>Once approved, you'll get an email with login instructions</li>
          <li>You can then start posting jobs for teens on our platform</li>
        </ul>
      </div>
      
      <div className="pt-4">
        <Button onClick={() => navigate("/")}>Return to Homepage</Button>
      </div>
    </div>
  );
};

export default OnboardingSuccess;
