
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, GraduationCap } from "lucide-react";
import SignUpFormShared from "./SignUpFormShared";
import SignUpBenefitCard from "./SignUpBenefitCard";

const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpValues = z.infer<typeof signUpSchema>;

interface StudentSignUpFormProps {
  isLoading: boolean;
  isAppleLoading: boolean;
  handleAppleSignIn: () => Promise<void>;
}

const studentBenefits = [
  {
    icon: CheckCircle2,
    text: <span><strong>Personalized Job Recommendations</strong> based on your skills and interests</span>
  },
  {
    icon: CheckCircle2,
    text: <span><strong>Career Development Tools</strong> to help you build professional skills</span>
  },
  {
    icon: CheckCircle2,
    text: <span><strong>Interview Preparation</strong> resources and practice sessions</span>
  },
  {
    icon: CheckCircle2,
    text: <span><strong>Saved Job Tracking</strong> to keep your opportunities organized</span>
  },
  {
    icon: CheckCircle2,
    text: <span><strong>Success Stories</strong> from other students who found employment</span>
  }
];

const StudentSignUpForm = ({
  isLoading,
  isAppleLoading,
  handleAppleSignIn,
}: StudentSignUpFormProps) => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    try {
      await signUp(
        values.email, 
        values.password, 
        values.firstName, 
        values.lastName
      );
      toast({
        title: "Account created",
        description: "You have successfully created a student account",
      });
      navigate('/');
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="md:col-span-3">
        <SignUpFormShared 
          isLoading={isLoading}
          isAppleLoading={isAppleLoading}
          handleAppleSignIn={handleAppleSignIn}
          submitButtonText={isLoading ? "Creating account..." : "Sign Up"}
        >
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
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
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </Form>
        </SignUpFormShared>
      </div>
      
      <div className="md:col-span-2">
        <SignUpBenefitCard
          title="Join Our Platform"
          subtitle="Exclusive for Westside High School Students"
          titleIcon={GraduationCap}
          benefits={studentBenefits}
          ctaText="Get started today! Create your account to access all features of Job Seekers 4 High Schools and launch your career journey."
          ctaColor="blue"
        />
      </div>
    </div>
  );
};

export default StudentSignUpForm;
