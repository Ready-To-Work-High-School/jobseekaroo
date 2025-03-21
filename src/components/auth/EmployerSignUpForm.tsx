
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building, 
  Briefcase, 
  FileText, 
  Users, 
  Calendar, 
  MessageCircle,
  Award,
  LineChart,
  Share2 
} from "lucide-react";

const employerSignUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
});

type EmployerSignUpValues = z.infer<typeof employerSignUpSchema>;

interface EmployerSignUpFormProps {
  isLoading: boolean;
  isAppleLoading: boolean;
  handleAppleSignIn: () => Promise<void>;
}

const EmployerSignUpForm = ({
  isLoading,
  isAppleLoading,
  handleAppleSignIn,
}: EmployerSignUpFormProps) => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<EmployerSignUpValues>({
    resolver: zodResolver(employerSignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      jobTitle: "",
    },
  });

  const onSubmit = async (values: EmployerSignUpValues) => {
    try {
      // Additional employer-specific logic could go here
      await signUp(
        values.email, 
        values.password, 
        values.firstName, 
        values.lastName
      );
      toast({
        title: "Employer account created",
        description: "You have successfully created an employer account",
      });
      navigate('/');
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to create employer account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="md:col-span-3 bg-card border rounded-lg shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="First name" 
                        disabled={isLoading} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Last name" 
                        disabled={isLoading} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your company" 
                        disabled={isLoading} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Job Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. HR Manager" 
                        disabled={isLoading} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your work email" 
                      type="email" 
                      disabled={isLoading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Create a password" 
                      type="password" 
                      disabled={isLoading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up as Employer"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 mb-6">
          <Separator>
            <span className="px-2 text-xs text-muted-foreground">OR</span>
          </Separator>
        </div>
        
        <Button
          variant="outline"
          onClick={handleAppleSignIn}
          disabled={isAppleLoading}
          className="w-full flex justify-center items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5014 1C16.5432 1 16.585 1 16.627 1C16.7884 2.17614 16.3327 3.02065 15.8232 3.61139C15.3123 4.20482 14.587 4.74434 13.57 4.6572C13.4382 3.5207 13.9169 2.66545 14.4246 2.0841C14.8871 1.54604 15.7332 1.09276 16.5014 1Z" />
            <path d="M20.8271 17.4371C20.8304 17.5156 20.8337 17.5929 20.8368 17.6719C20.622 18.5427 20.2261 19.2829 19.7218 19.9256C19.2479 20.5301 18.7169 21.134 17.7857 21.134C16.9178 21.134 16.3295 20.6488 15.4615 20.6311C14.5448 20.6135 14.0134 21.0815 13.1487 21.1344C13.0701 21.1388 12.9917 21.134 12.9117 21.1216C12.9095 21.0981 12.9074 21.0747 12.9052 21.0513C12.9246 20.2922 13.1605 19.5444 13.5531 18.9411C14.0824 18.1402 14.8526 17.5264 15.7613 17.4354C16.5926 17.3503 17.2695 17.8731 18.035 17.8938C18.035 17.8938 18.1121 17.897 18.2213 17.8849C18.8068 17.83 19.3741 17.4646 19.7886 16.9524C20.1469 16.505 20.4163 15.9326 20.5501 15.1851C20.5631 15.1148 20.5748 15.0444 20.5865 14.9741C20.7072 14.2736 20.7651 13.5588 20.758 12.8484C20.751 12.1564 20.6819 11.4609 20.5505 10.7778C20.2853 9.38662 19.7805 8.08776 19.086 6.9518C18.3652 5.77103 17.4336 4.77554 16.3563 4.0449C15.8156 3.68791 15.245 3.40611 14.6493 3.20958C14.6376 3.20522 14.6258 3.20087 14.6142 3.19655C14.0409 3.00567 13.4429 2.90458 12.8384 2.90458C12.4069 2.90458 11.9797 2.95454 11.5619 3.0527C11.5192 3.06249 11.4769 3.07271 11.4345 3.08337C10.8329 3.24227 10.261 3.52166 9.7523 3.90518C8.73533 4.66066 7.85932 5.78591 7.32124 7.2062C7.26747 7.35359 7.21704 7.50241 7.16996 7.65294C6.88334 8.51566 6.7417 9.38552 6.7417 10.2576C6.7417 10.916 6.82619 11.5524 6.97788 12.1555C7.01144 12.2933 7.04854 12.4308 7.08829 12.5681C7.1318 12.7199 7.17871 12.8713 7.22809 13.0213C7.56033 14.0039 8.08764 14.8598 8.77405 15.5365C9.47223 16.2248 10.3472 16.753 11.3432 17.0243C11.4193 17.0458 11.4962 17.0661 11.5738 17.0853C11.9895 17.1821 12.4207 17.233 12.8627 17.233C13.0385 17.233 13.2123 17.2232 13.3835 17.204C13.4333 17.2002 13.4831 17.1959 13.5329 17.1911C13.7306 17.1608 13.9233 17.1205 14.1113 17.0706C14.1531 17.0604 14.1946 17.0499 14.2366 17.0394" />
          </svg>
          {isAppleLoading ? "Signing in..." : "Sign in with Apple"}
        </Button>
        
        <div className="mt-4 text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Employer Portal Access</h2>
            
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-5 w-5 text-primary" />
              <span className="font-medium">Partner with Westside High School</span>
            </div>
            
            <h3 className="font-medium mb-2">As an employer, you'll be able to:</h3>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Building className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Create Company Profile</strong> to showcase your brand and culture to students</span>
              </li>
              <li className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Post Unlimited Job Listings</strong> with detailed descriptions and requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Review Applicants</strong> through our streamlined candidate management system</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Schedule Interviews</strong> directly through our integrated calendar</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Message Candidates</strong> to coordinate hiring details</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Offer Apprenticeships</strong> and training programs to develop student talents</span>
              </li>
              <li className="flex items-start gap-2">
                <LineChart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Access Analytics</strong> on job posting performance and candidate engagement</span>
              </li>
              <li className="flex items-start gap-2">
                <Share2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Participate in Career Events</strong> and connect with promising students</span>
              </li>
            </ul>
            
            <div className="mt-6 bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm text-green-800">
                <strong>Partner with us today!</strong> Create an employer account to gain access to our talent pipeline of motivated high school students ready to contribute to your workforce.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerSignUpForm;
