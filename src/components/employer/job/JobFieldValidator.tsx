
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { type JobFormData } from '@/types/jobs';

interface JobFieldValidatorProps {
  formData: JobFormData;
  showValidation: boolean;
}

const JobFieldValidator = ({ formData, showValidation }: JobFieldValidatorProps) => {
  if (!showValidation) return null;

  const missingFields = [];
  
  if (!formData.pay_rate_min || formData.pay_rate_min < 12) {
    missingFields.push("Minimum wage (must be at least $12/hour)");
  }
  
  if (!formData.pay_rate_max || formData.pay_rate_max < formData.pay_rate_min) {
    missingFields.push("Maximum wage (must be at least equal to minimum wage)");
  }
  
  if (!formData.hours_per_week || formData.hours_per_week <= 0 || formData.hours_per_week > 40) {
    missingFields.push("Hours per week (must be between 1 and 40)");
  }

  if (missingFields.length === 0) return null;

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Missing or Invalid Fields</AlertTitle>
      <AlertDescription>
        <p>Please address the following issues:</p>
        <ul className="list-disc pl-5 mt-2">
          {missingFields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export default JobFieldValidator;
