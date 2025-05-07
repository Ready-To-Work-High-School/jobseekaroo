
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';

const verificationSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  contactEmail: z.string().email({ message: "Valid email is required" }),
  contactPhone: z.string().optional(),
  address: z.string().min(5, { message: "Company address is required" }),
  ein: z.string().min(9, { message: "EIN is required" }),
  website: z.string().optional(),
  jobDescription: z.string().min(20, { message: "Job description is required" }),
  wageRangeMin: z.number().min(1, { message: "Minimum wage is required" }),
  wageRangeMax: z.number().min(1, { message: "Maximum wage is required" }),
  hoursPerWeek: z.number().min(1, { message: "Hours per week is required" }),
  workersCompProvider: z.string().min(2, { message: "Workers' comp provider is required" }),
  workersCompPolicyNumber: z.string().min(2, { message: "Workers' comp policy number is required" }),
  workersCompExpiryDate: z.string().min(2, { message: "Workers' comp expiry date is required" }),
  safetyPledgeAccepted: z.boolean().refine(val => val === true, { message: "You must accept the safety pledge" })
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

interface VerificationFormProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  userId?: string;
}

export const VerificationForm = ({ 
  onSuccess, 
  onError, 
  isSubmitting, 
  setIsSubmitting,
  userId 
}: VerificationFormProps) => {
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      ein: '',
      website: '',
      jobDescription: '',
      wageRangeMin: 15,
      wageRangeMax: 20,
      hoursPerWeek: 20,
      workersCompProvider: '',
      workersCompPolicyNumber: '',
      workersCompExpiryDate: '',
      safetyPledgeAccepted: false
    }
  });

  const onSubmit = async (data: VerificationFormValues) => {
    if (!userId) {
      onError(new Error("You must be signed in to submit verification"));
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('employer_verifications')
        .insert({
          company_name: data.companyName,
          contact_name: data.contactName,
          contact_email: data.contactEmail,
          contact_phone: data.contactPhone,
          address: data.address,
          ein: data.ein,
          website: data.website,
          job_description: data.jobDescription,
          wage_range_min: data.wageRangeMin,
          wage_range_max: data.wageRangeMax,
          hours_per_week: data.hoursPerWeek,
          workers_comp_provider: data.workersCompProvider,
          workers_comp_policy_number: data.workersCompPolicyNumber,
          workers_comp_expiry_date: data.workersCompExpiryDate,
          safety_pledge_accepted: data.safetyPledgeAccepted,
          status: 'pending'
        });

      if (error) throw error;
      
      // Also update the user's profile with verification status
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          employer_verification_status: 'pending',
          company_name: data.companyName
        })
        .eq('id', userId);
        
      if (profileError) {
        console.error('Error updating profile:', profileError);
      }

      onSuccess();
    } catch (error) {
      console.error('Error submitting verification:', error);
      onError(error instanceof Error ? error : new Error('An unknown error occurred'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium">Company Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} placeholder="XX-XXXXXXX" />
                  </FormControl>
                  <FormDescription>
                    Your 9-digit Tax ID number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Street, City, State, ZIP" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Website (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://www.example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="(XXX) XXX-XXXX" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium">Job Details</h3>
          </div>
          
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Describe the types of jobs you'll be posting for high school students" rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="wageRangeMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Wage ($)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="wageRangeMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Wage ($)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hoursPerWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours Per Week</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" onChange={e => field.onChange(parseInt(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium">Workers' Compensation Insurance</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="workersCompProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Provider</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="workersCompPolicyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Policy Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="workersCompExpiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-medium">Safety Pledge</h3>
          </div>
          
          <FormField
            control={form.control}
            name="safetyPledgeAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I pledge to maintain a safe working environment for high school students in compliance with all applicable labor laws and regulations.
                  </FormLabel>
                  <FormDescription>
                    This includes providing proper training, supervision, and ensuring all safety protocols are followed.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit for Verification"}
        </Button>
      </form>
    </Form>
  );
};
