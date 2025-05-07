
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const verificationFormSchema = z.object({
  company_name: z.string().min(2, { message: "Company name is required" }),
  address: z.string().min(5, { message: "Valid address is required" }),
  contact_name: z.string().min(2, { message: "Contact name is required" }),
  contact_email: z.string().email({ message: "Valid email is required" }),
  contact_phone: z.string().min(10, { message: "Valid phone number is required" }),
  ein: z.string().min(9, { message: "Valid EIN is required" }),
  job_description: z.string().min(20, { message: "Please provide a detailed job description" }),
  hours_per_week: z.coerce.number().min(1, { message: "Hours per week is required" }),
  wage_range_min: z.coerce.number().min(1, { message: "Minimum wage is required" }),
  wage_range_max: z.coerce.number().min(1, { message: "Maximum wage is required" })
    .refine(val => val >= 1, { message: "Maximum wage must be greater than zero" }),
  workers_comp_policy_number: z.string().min(1, { message: "Workers comp policy number is required" }),
  workers_comp_provider: z.string().min(1, { message: "Workers comp provider is required" }),
  workers_comp_expiry_date: z.string().min(1, { message: "Workers comp expiry date is required" }),
  safety_pledge_accepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the safety pledge" })
  })
});

type VerificationFormValues = z.infer<typeof verificationFormSchema>;

interface VerificationFormProps {
  userId?: string;
  onSuccess?: () => void;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({ userId, onSuccess }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      company_name: '',
      address: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      ein: '',
      job_description: '',
      hours_per_week: 20,
      wage_range_min: 15,
      wage_range_max: 25,
      workers_comp_policy_number: '',
      workers_comp_provider: '',
      workers_comp_expiry_date: '',
      safety_pledge_accepted: false
    }
  });

  const onSubmit = async (data: VerificationFormValues) => {
    if (!userId && !user?.id) {
      toast({
        title: "Authentication Error",
        description: "User ID is required for verification",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('employer_verifications')
        .insert({
          ...data,
          user_id: userId || user?.id,
          status: 'pending'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Verification Submitted",
        description: "Your employer verification has been submitted and is pending review."
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Error submitting verification:', error);
      
      toast({
        title: "Submission Error",
        description: error.message || "There was an error submitting your verification",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Employer Verification</h2>
      <p className="text-muted-foreground mb-6">
        Please provide the following information to verify your employer account. 
        This helps ensure a safe environment for students.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Company Information</h3>
            
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company's legal name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Complete business address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ein"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer Identification Number (EIN)</FormLabel>
                  <FormControl>
                    <Input placeholder="XX-XXXXXXX" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your 9-digit tax ID number assigned by the IRS
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Contact Information</h3>
            
            <FormField
              control={form.control}
              name="contact_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name of primary contact" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contact_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="(XXX) XXX-XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Employment Details</h3>
            
            <FormField
              control={form.control}
              name="job_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the typical jobs you'll be posting for high school students" 
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="hours_per_week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours Per Week</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="wage_range_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Wage ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} step={0.5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="wage_range_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Wage ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} step={0.5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Insurance Information</h3>
            
            <FormField
              control={form.control}
              name="workers_comp_provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workers' Comp Provider</FormLabel>
                  <FormControl>
                    <Input placeholder="Insurance company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="workers_comp_policy_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Policy Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Policy number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="workers_comp_expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="safety_pledge_accepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Safety Pledge</FormLabel>
                  <FormDescription>
                    I certify that my company follows all applicable labor laws and safety standards 
                    for employing minors, and I agree to maintain a safe working environment.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit for Verification"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
