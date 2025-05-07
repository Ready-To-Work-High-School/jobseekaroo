
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Alert } from '@/components/ui/alert';

interface VerificationFormProps {
  userId?: string;
  onSuccess?: () => void;
}

type FormData = {
  companyName: string;
  address: string;
  ein: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  hoursPerWeek: number;
  wageMin: number;
  wageMax: number;
  jobDescription: string;
};

export const VerificationForm: React.FC<VerificationFormProps> = ({ userId, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const onSubmit = async (data: FormData) => {
    if (!userId) {
      setError("Missing user information. Please try again.");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Save verification data to employer_verifications table
      const { error: insertError } = await supabase
        .from('employer_verifications')
        .insert({
          address: data.address,
          company_name: data.companyName,
          contact_email: data.contactEmail,
          contact_name: data.contactName,
          contact_phone: data.contactPhone,
          ein: data.ein,
          hours_per_week: data.hoursPerWeek,
          job_description: data.jobDescription,
          wage_range_min: data.wageMin,
          wage_range_max: data.wageMax,
          safety_pledge_accepted: true,
          status: 'pending'
        });
      
      if (insertError) throw insertError;
      
      // Update the verification_submitted flag in the profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          employer_verification_status: 'pending',
          verification_submitted_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (updateError) throw updateError;
      
      toast({
        title: "Verification submitted",
        description: "Your business verification information has been submitted for review.",
      });
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Verification submission error:', error);
      setError(error.message || 'Failed to submit verification. Please try again.');
      
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was a problem submitting your verification. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Your Company Name"
            {...register('companyName', { required: 'Company name is required' })}
          />
          {errors.companyName && (
            <p className="text-sm text-red-500">{errors.companyName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Company Address</Label>
          <Input
            id="address"
            placeholder="123 Business St, Suite 100, City, State ZIP"
            {...register('address', { required: 'Company address is required' })}
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ein">EIN (Employer Identification Number)</Label>
          <Input
            id="ein"
            placeholder="XX-XXXXXXX"
            {...register('ein', { required: 'EIN is required' })}
          />
          {errors.ein && (
            <p className="text-sm text-red-500">{errors.ein.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input
              id="contactName"
              placeholder="Your Name"
              {...register('contactName', { required: 'Contact name is required' })}
            />
            {errors.contactName && (
              <p className="text-sm text-red-500">{errors.contactName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              type="tel"
              placeholder="(555) 555-5555"
              {...register('contactPhone', { required: 'Contact phone is required' })}
            />
            {errors.contactPhone && (
              <p className="text-sm text-red-500">{errors.contactPhone.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            placeholder="contact@company.com"
            {...register('contactEmail', { 
              required: 'Contact email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.contactEmail && (
            <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hoursPerWeek">Hours per Week</Label>
            <Input
              id="hoursPerWeek"
              type="number"
              min="1"
              max="40"
              {...register('hoursPerWeek', { 
                required: 'Hours is required',
                min: {
                  value: 1,
                  message: 'Must be at least 1'
                },
                max: {
                  value: 40,
                  message: 'Cannot exceed 40'
                }
              })}
            />
            {errors.hoursPerWeek && (
              <p className="text-sm text-red-500">{errors.hoursPerWeek.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wageMin">Minimum Wage ($/hr)</Label>
            <Input
              id="wageMin"
              type="number"
              min="12"
              step="0.01"
              {...register('wageMin', { 
                required: 'Minimum wage is required',
                min: {
                  value: 12,
                  message: 'Must be at least $12/hr'
                }
              })}
            />
            {errors.wageMin && (
              <p className="text-sm text-red-500">{errors.wageMin.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wageMax">Maximum Wage ($/hr)</Label>
            <Input
              id="wageMax"
              type="number"
              min="12"
              step="0.01"
              {...register('wageMax', { 
                required: 'Maximum wage is required',
                min: {
                  value: 12,
                  message: 'Must be at least $12/hr'
                }
              })}
            />
            {errors.wageMax && (
              <p className="text-sm text-red-500">{errors.wageMax.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            placeholder="Describe the types of jobs you'll be posting and what students can expect working for your company"
            rows={5}
            {...register('jobDescription', {
              required: 'Job description is required',
              minLength: {
                value: 50,
                message: 'Please provide at least 50 characters'
              }
            })}
          />
          {errors.jobDescription && (
            <p className="text-sm text-red-500">{errors.jobDescription.message}</p>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Verification'}
      </Button>
    </form>
  );
};
