import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavigateFunction } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
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
import SignUpFormShared from "./SignUpFormShared";
import SignUpBenefitCard from "./SignUpBenefitCard";
import SignUpFormFields from "./SignUpFormFields";

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
  setIsLoading: (loading: boolean) => void;
  isAppleLoading: boolean;
  handleAppleSignIn: () => Promise<void>;
  navigate: NavigateFunction;
}

const employerBenefits = [
  {
    icon: Building,
    text: <span><strong>Create Company Profile</strong> to showcase your brand and culture to students</span>
  },
  {
    icon: FileText,
    text: <span><strong>Post Unlimited Job Listings</strong> with detailed descriptions and requirements</span>
  },
  {
    icon: Users,
    text: <span><strong>Review Applicants</strong> through our streamlined candidate management system</span>
  },
  {
    icon: Calendar,
    text: <span><strong>Schedule Interviews</strong> directly through our integrated calendar</span>
  },
  {
    icon: MessageCircle,
    text: <span><strong>Message Candidates</strong> to coordinate hiring details</span>
  },
  {
    icon: Award,
    text: <span><strong>Offer Apprenticeships</strong> and training programs to develop student talents</span>
  },
  {
    icon: LineChart,
    text: <span><strong>Access Analytics</strong> on job posting performance and candidate engagement</span>
  },
  {
    icon: Share2,
    text: <span><strong>Participate in Career Events</strong> and connect with promising students</span>
  }
];

const EmployerSignUpForm = ({
  isLoading,
  setIsLoading,
  isAppleLoading,
  handleAppleSignIn,
  navigate,
}: EmployerSignUpFormProps) => {
  const { signUp } = useAuth();
  const { toast } = useToast();

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
    setIsLoading(true);
    try {
      // Additional employer-specific logic could go here
      await signUp(
        values.email, 
        values.password, 
        values.firstName, 
        values.lastName,
        navigate
      );
      toast({
        title: "Employer account created",
        description: "You have successfully created an employer account",
      });
      // Navigation is now handled in the signUp function
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to create employer account. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="md:col-span-3">
        <SignUpFormShared 
          isLoading={isLoading}
          isAppleLoading={isAppleLoading}
          handleAppleSignIn={handleAppleSignIn}
          submitButtonText={isLoading ? "Creating account..." : "Sign Up as Employer"}
        >
          <SignUpFormFields
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            buttonText={isLoading ? "Creating account..." : "Sign Up as Employer"}
            isEmployer={true}
          />
        </SignUpFormShared>
      </div>
      
      <div className="md:col-span-2">
        <SignUpBenefitCard 
          title="Employer Portal Access"
          subtitle="Partner with Westside High School"
          titleIcon={Briefcase}
          benefits={employerBenefits}
          ctaText="Partner with us today! Create an employer account to gain access to our talent pipeline of motivated high school students ready to contribute to your workforce."
          ctaColor="green"
        />
      </div>
    </div>
  );
};

export default EmployerSignUpForm;
