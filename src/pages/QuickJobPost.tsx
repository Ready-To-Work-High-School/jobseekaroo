
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, CheckCircle } from 'lucide-react';
import { createJob } from '@/lib/supabase/jobs';

const quickJobSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  contact_email: z.string().email("Valid email is required"),
  job_title: z.string().min(5, "Job title must be at least 5 characters"),
  location: z.string().min(3, "Location is required"),
  job_type: z.string(),
  pay_rate_min: z.number().min(1, "Minimum pay rate is required"),
  pay_rate_max: z.number().min(1, "Maximum pay rate is required"),
  hours_per_week: z.number().min(1).max(40),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string().min(10, "Requirements are needed")
});

type QuickJobFormData = z.infer<typeof quickJobSchema>;

const QuickJobPost = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuickJobFormData>({
    resolver: zodResolver(quickJobSchema),
    defaultValues: {
      job_type: "part-time",
      pay_rate_min: 15,
      pay_rate_max: 20,
      hours_per_week: 20
    }
  });

  const onSubmit = async (data: QuickJobFormData) => {
    setIsLoading(true);
    
    try {
      // Convert requirements string to array
      const requirementsArray = data.requirements
        .split('\n')
        .filter(req => req.trim() !== '')
        .map(req => req.trim());

      // Prepare job data for submission (will need verification)
      const jobData = {
        title: data.job_title,
        company_name: data.company_name,
        location_city: data.location.split(',')[0]?.trim() || data.location,
        location_state: data.location.split(',')[1]?.trim() || 'FL',
        location_zip: '32256', // Default zip
        job_type: data.job_type,
        pay_rate_min: data.pay_rate_min,
        pay_rate_max: data.pay_rate_max,
        pay_rate_period: 'hourly',
        description: data.description,
        requirements: requirementsArray,
        experience_level: 'entry-level',
        hours_per_week: data.hours_per_week,
        is_featured: false,
        is_premium: false,
        prohibited_types: []
      };

      const job = await createJob(jobData);
      
      if (job) {
        setIsSubmitted(true);
        toast({
          title: "Job Submitted Successfully!",
          description: "Your job posting has been submitted for verification and will be reviewed within 24 hours."
        });
      }
    } catch (error: any) {
      console.error('Error creating job:', error);
      toast({
        title: "Submission Error",
        description: error.message || "Failed to submit job posting. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Job Submitted!</h2>
              <p className="text-muted-foreground mb-4">
                Thank you for submitting your job posting. Our team will review it within 24 hours and notify you once it's approved.
              </p>
              <Button onClick={() => window.location.href = '/'}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Quick Job Posting
            </CardTitle>
            <p className="text-muted-foreground">
              Fill out this simple form to post a job for high school students. All postings are verified before going live.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    {...form.register('company_name')}
                    placeholder="Your Company Name"
                  />
                  {form.formState.errors.company_name && (
                    <p className="text-sm text-red-500">{form.formState.errors.company_name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_email">Contact Email *</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    {...form.register('contact_email')}
                    placeholder="hiring@company.com"
                  />
                  {form.formState.errors.contact_email && (
                    <p className="text-sm text-red-500">{form.formState.errors.contact_email.message}</p>
                  )}
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Job Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="job_title">Job Title *</Label>
                  <Input
                    id="job_title"
                    {...form.register('job_title')}
                    placeholder="e.g. Retail Associate, Food Service Team Member"
                  />
                  {form.formState.errors.job_title && (
                    <p className="text-sm text-red-500">{form.formState.errors.job_title.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      {...form.register('location')}
                      placeholder="Jacksonville, FL"
                    />
                    {form.formState.errors.location && (
                      <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job_type">Job Type *</Label>
                    <Select onValueChange={(value) => form.setValue('job_type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part-time">Part-Time</SelectItem>
                        <SelectItem value="full-time">Full-Time</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pay_rate_min">Min Pay Rate ($/hour) *</Label>
                    <Input
                      id="pay_rate_min"
                      type="number"
                      step="0.25"
                      {...form.register('pay_rate_min', { valueAsNumber: true })}
                    />
                    {form.formState.errors.pay_rate_min && (
                      <p className="text-sm text-red-500">{form.formState.errors.pay_rate_min.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pay_rate_max">Max Pay Rate ($/hour) *</Label>
                    <Input
                      id="pay_rate_max"
                      type="number"
                      step="0.25"
                      {...form.register('pay_rate_max', { valueAsNumber: true })}
                    />
                    {form.formState.errors.pay_rate_max && (
                      <p className="text-sm text-red-500">{form.formState.errors.pay_rate_max.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hours_per_week">Hours/Week *</Label>
                    <Input
                      id="hours_per_week"
                      type="number"
                      {...form.register('hours_per_week', { valueAsNumber: true })}
                    />
                    {form.formState.errors.hours_per_week && (
                      <p className="text-sm text-red-500">{form.formState.errors.hours_per_week.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Job Description</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    {...form.register('description')}
                    placeholder="Describe the job responsibilities, work environment, and what makes this a great opportunity for high school students..."
                    rows={4}
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea
                    id="requirements"
                    {...form.register('requirements')}
                    placeholder="List requirements (one per line)&#10;- Must be 16+ years old&#10;- Reliable transportation&#10;- Available weekends"
                    rows={3}
                  />
                  {form.formState.errors.requirements && (
                    <p className="text-sm text-red-500">{form.formState.errors.requirements.message}</p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Verification Process:</strong> All job postings are reviewed by our team to ensure they meet safety standards and are appropriate for high school students. You'll receive confirmation within 24 hours.
                </p>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Submitting...' : 'Submit Job for Verification'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default QuickJobPost;
