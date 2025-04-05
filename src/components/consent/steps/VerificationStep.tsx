
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { verificationSchema, VerificationFormValues, ParentFormValues } from '../schemas';

interface VerificationStepProps {
  onSubmit: (values: VerificationFormValues) => void;
  onBack: () => void;
  onResend: (values: ParentFormValues) => void;
  isLoading: boolean;
  parentEmail: string;
  parentName: string;
}

const VerificationStep: React.FC<VerificationStepProps> = ({ 
  onSubmit, 
  onBack, 
  onResend, 
  isLoading, 
  parentEmail,
  parentName
}) => {
  const verificationForm = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: ""
    }
  });

  const handleResend = () => {
    if (parentEmail) {
      onResend({
        parentName,
        parentEmail,
        consentGiven: true
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Verify Parental Consent</h2>
      <p className="text-gray-600">
        A verification code has been sent to {parentEmail}. Please ask your parent/guardian
        to check their email and enter the code below.
      </p>
      
      <Form {...verificationForm}>
        <form onSubmit={verificationForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={verificationForm.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter the verification code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              type="button" 
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              type="submit"
              className="flex-1" 
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
          
          <button 
            type="button" 
            className="text-sm text-blue-600 hover:underline mx-auto block"
            onClick={handleResend}
          >
            Resend code
          </button>
        </form>
      </Form>
    </div>
  );
};

export default VerificationStep;
