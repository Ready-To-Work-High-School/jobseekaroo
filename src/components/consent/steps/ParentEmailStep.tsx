
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { parentSchema, ParentFormValues } from '../schemas';

interface ParentEmailStepProps {
  onSubmit: (values: ParentFormValues) => void;
  onBack: () => void;
  isLoading: boolean;
}

const ParentEmailStep: React.FC<ParentEmailStepProps> = ({ onSubmit, onBack, isLoading }) => {
  const parentForm = useForm<ParentFormValues>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      parentName: "",
      parentEmail: "",
      consentGiven: false
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Parent/Guardian Information</h2>
      
      <Form {...parentForm}>
        <form onSubmit={parentForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={parentForm.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent/Guardian Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Full name" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={parentForm.control}
            name="parentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent/Guardian Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="email@example.com" 
                    type="email"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  We'll send a verification code to this email address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={parentForm.control}
            name="consentGiven"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange} 
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I confirm that I am providing the correct parent/guardian email and they have agreed to
                    receive a verification message.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-2 pt-2">
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
              {isLoading ? "Sending..." : "Send Verification"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ParentEmailStep;
