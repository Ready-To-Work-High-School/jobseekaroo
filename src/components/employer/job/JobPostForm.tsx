
import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import BasicJobDetails from './BasicJobDetails';
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';
import { JobFormData, ProhibitedJobType } from '@/types/jobs';

const initialFormData: JobFormData = {
  title: '',
  company: '',
  location: '',
  type: 'part-time',
  description: '',
  requirements: '',
  hours_per_week: 20,
  pay_rate_min: 12,
  pay_rate_max: 15,
  contactEmail: '',
  isPremium: false,
  prohibited_types: []
};

interface JobPostFormProps {
  onSuccess: (jobId: string) => void;
  onCancel: () => void;
}

const JobPostForm = ({ onSuccess, onCancel }: JobPostFormProps) => {
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, userProfile } = useAuth();
  const { toast } = useToast();

  // Prefill the company name if available in the user profile
  React.useEffect(() => {
    if (userProfile?.company_name) {
      setFormData(prev => ({ ...prev, company: userProfile.company_name || '' }));
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to post a job.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Parse location into city and state
      const locationParts = formData.location.split(',').map(part => part.trim());
      const city = locationParts[0] || '';
      const state = locationParts[1] || '';
      const zip = locationParts[2] || '';
      
      // Parse requirements into an array
      const requirementsArray = formData.requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req.length > 0);
      
      const jobData = {
        title: formData.title,
        company_name: formData.company,
        location_city: city,
        location_state: state,
        location_zip: zip,
        job_type: formData.type,
        description: formData.description,
        requirements: requirementsArray,
        hours_per_week: formData.hours_per_week,
        pay_rate_min: formData.pay_rate_min,
        pay_rate_max: formData.pay_rate_max,
        pay_rate_period: 'hourly',
        experience_level: 'entry-level',
        is_premium: formData.isPremium,
        is_featured: formData.isPremium,
        prohibited_types: formData.prohibited_types
      };
      
      console.log('Submitting job data:', jobData);
      
      const { data, error } = await supabase
        .from('jobs')
        .insert(jobData)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      console.log('Job created:', data);
      onSuccess(data.id);
      
    } catch (error: any) {
      console.error('Error creating job:', error);
      toast({
        title: "Error Creating Job",
        description: error.message || "There was an error creating your job post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicJobDetails
        title={formData.title}
        company={formData.company}
        location={formData.location}
        type={formData.type}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
      />
      
      <Separator />
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the job responsibilities and expectations"
            className="h-32"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="requirements">Skills & Requirements</Label>
          <Textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            placeholder="List skills and requirements, separated by commas"
            className="h-24"
          />
          <p className="text-xs text-muted-foreground mt-1">
            e.g. Customer service, Communication skills, Microsoft Office
          </p>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="hours_per_week">Hours Per Week</Label>
          <Input
            id="hours_per_week"
            name="hours_per_week"
            type="number"
            min="1"
            max="40"
            value={formData.hours_per_week}
            onChange={handleNumberChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleInputChange}
            placeholder="Email for applicants to contact"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pay_rate_min">Minimum Pay Rate ($/hour)</Label>
          <Input
            id="pay_rate_min"
            name="pay_rate_min"
            type="number"
            min="12"
            step="0.5"
            value={formData.pay_rate_min}
            onChange={handleNumberChange}
            required
          />
          <p className="text-xs text-muted-foreground">
            Minimum wage must be at least $12/hour
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pay_rate_max">Maximum Pay Rate ($/hour)</Label>
          <Input
            id="pay_rate_max"
            name="pay_rate_max"
            type="number"
            min="12"
            step="0.5"
            value={formData.pay_rate_max}
            onChange={handleNumberChange}
            required
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isPremium"
          checked={formData.isPremium}
          onCheckedChange={(checked) => handleSwitchChange('isPremium', checked)}
        />
        <Label htmlFor="isPremium" className="font-medium cursor-pointer">
          Make this a premium listing (featured placement, highlighted)
        </Label>
      </div>
      
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Job'}
        </Button>
      </div>
    </form>
  );
};

export default JobPostForm;
