import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const applicationSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  status: z.enum(['applied', 'interviewing', 'offer', 'rejected']),
  appliedDate: z.string().min(1, 'Applied date is required'),
  notes: z.string().optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void;
  isLoading?: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit, isLoading = false }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const status = watch('status');

  const handleFormSubmit = (data: ApplicationFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be signed in to track applications",
        variant: "destructive",
      });
      return;
    }
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track New Application</CardTitle>
        <CardDescription>
          Add a job application to track your progress
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              {...register('jobTitle')}
              placeholder="Enter job title"
            />
            {errors.jobTitle && (
              <p className="text-sm text-red-500 mt-1">{errors.jobTitle.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              {...register('company')}
              placeholder="Enter company name"
            />
            {errors.company && (
              <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Application Status</Label>
            <Select onValueChange={(value) => setValue('status', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="offer">Offer Received</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="appliedDate">Date Applied</Label>
            <Input
              id="appliedDate"
              type="date"
              {...register('appliedDate')}
            />
            {errors.appliedDate && (
              <p className="text-sm text-red-500 mt-1">{errors.appliedDate.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Add any notes about this application..."
              rows={3}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Adding Application...' : 'Add Application'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ApplicationForm;
