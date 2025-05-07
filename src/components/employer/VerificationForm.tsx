
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
  userId: string;
  onSuccess: () => void;
}

type FormData = {
  companyAddress: string;
  businessRegistrationNumber: string;
  contactPhone: string;
  businessDescription: string;
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
        .insert([{
          user_id: userId,
          company_address: data.companyAddress,
          business_registration_number: data.businessRegistrationNumber,
          contact_phone: data.contactPhone,
          business_description: data.businessDescription,
          verification_status: 'pending',
          submitted_at: new Date().toISOString()
        }]);
      
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
      
      onSuccess();
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
          <Label htmlFor="companyAddress">Company Address</Label>
          <Input
            id="companyAddress"
            placeholder="123 Business St, Suite 100, City, State ZIP"
            {...register('companyAddress', { required: 'Company address is required' })}
          />
          {errors.companyAddress && (
            <p className="text-sm text-red-500">{errors.companyAddress.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="businessRegistrationNumber">Business Registration Number</Label>
          <Input
            id="businessRegistrationNumber"
            placeholder="Business license, EIN, or registration number"
            {...register('businessRegistrationNumber', { required: 'Business registration number is required' })}
          />
          {errors.businessRegistrationNumber && (
            <p className="text-sm text-red-500">{errors.businessRegistrationNumber.message}</p>
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
        
        <div className="space-y-2">
          <Label htmlFor="businessDescription">Business Description</Label>
          <Textarea
            id="businessDescription"
            placeholder="Tell us about your business, including how long you've been operating, what services/products you provide, and why you're interested in employing students."
            rows={5}
            {...register('businessDescription', {
              required: 'Business description is required',
              minLength: {
                value: 50,
                message: 'Please provide at least 50 characters'
              }
            })}
          />
          {errors.businessDescription && (
            <p className="text-sm text-red-500">{errors.businessDescription.message}</p>
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
