
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProhibitedJobType } from "@/types/jobs";

// Form validation schema
const jobFormSchema = z.object({
  title: z.string().min(5, "Job title must be at least 5 characters"),
  company_name: z.string().min(2, "Company name is required"),
  location_city: z.string().default("Jacksonville"),
  location_state: z.string().default("FL"),
  location_zip: z.string().regex(/^\d{5}$/, "ZIP code must be 5 digits"),
  job_type: z.string(),
  pay_rate_min: z.coerce.number().min(12, "Minimum pay rate must be at least $12/hour"),
  pay_rate_max: z.coerce.number(),
  pay_rate_period: z.string().default("hourly"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  requirements: z.string(),
  experience_level: z.string(),
  hours_per_week: z.coerce.number().max(40, "Maximum 40 hours per week for teen jobs"),
  is_featured: z.boolean().default(false),
  is_premium: z.boolean().default(false),
  is_remote: z.boolean().default(false),
  is_flexible: z.boolean().default(false),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

export default function AdminJobForm() {
  const { toast } = useToast();
  
  // Initialize the form
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company_name: "",
      location_city: "Jacksonville",
      location_state: "FL",
      location_zip: "",
      job_type: "part-time",
      pay_rate_min: 15,
      pay_rate_max: 20,
      pay_rate_period: "hourly",
      description: "",
      requirements: "",
      experience_level: "entry-level",
      hours_per_week: 20,
      is_featured: false,
      is_premium: false,
      is_remote: false,
      is_flexible: true,
    },
  });
  
  // Submit handler
  async function onSubmit(values: JobFormValues) {
    try {
      const requirementsArray = values.requirements
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      if (requirementsArray.length === 0) {
        requirementsArray.push("No specific requirements listed");
      }
      
      // Check that max pay is greater than or equal to min pay
      if (values.pay_rate_max < values.pay_rate_min) {
        form.setError("pay_rate_max", { 
          type: "manual",
          message: "Maximum pay cannot be less than minimum pay"
        });
        return;
      }
      
      const jobData = {
        ...values,
        requirements: requirementsArray,
        prohibited_types: [] as ProhibitedJobType[],
      };
      
      // Insert the job into the database
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select();
        
      if (error) throw error;
      
      toast({
        title: "Job created successfully",
        description: "The job has been added to the platform",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Error creating job:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create job",
        variant: "destructive",
      });
    }
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Job</CardTitle>
        <CardDescription>
          Create a new job listing that will be visible to students
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Marketing Intern" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Company Name */}
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="location_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location_state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location_zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="32202" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Job Type and Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="job_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="apprenticeship">Apprenticeship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="no-experience">No Experience</SelectItem>
                        <SelectItem value="entry-level">Entry Level</SelectItem>
                        <SelectItem value="some-experience">Some Experience</SelectItem>
                        <SelectItem value="mid-level">Mid Level</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Pay and Hours */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="pay_rate_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Pay ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="12" step="0.5" {...field} />
                    </FormControl>
                    <FormDescription>Minimum $12/hour required</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pay_rate_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Pay ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="12" step="0.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hours_per_week"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours Per Week</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="40" step="1" {...field} />
                    </FormControl>
                    <FormDescription>Maximum 40 hours/week</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Job Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide a detailed description of the job..."
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include responsibilities, what students will learn, and any other relevant details
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Requirements */}
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter each requirement on a new line..."
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    List each requirement on a separate line
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="is_remote"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Remote Work</FormLabel>
                      <FormDescription>
                        Job can be performed remotely
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_flexible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Flexible Hours</FormLabel>
                      <FormDescription>
                        Offers flexible working hours
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            {/* Featured/Premium Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="is_featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Featured Job</FormLabel>
                      <FormDescription>
                        Highlight this job in the listings
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_premium"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Premium Listing</FormLabel>
                      <FormDescription>
                        Additional visibility and promotion
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" type="button" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit">
              Create Job Listing
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
