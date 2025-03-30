
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
  Share2,
  AlertTriangle 
} from "lucide-react";
import SignUpFormShared from "./SignUpFormShared";
import SignUpBenefitCard from "./SignUpBenefitCard";
import SignUpFormFields from "./SignUpFormFields";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const employerSignUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  companyWebsite: z.string().url("Please enter a valid website URL").optional().or(z.literal('')),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

type EmployerSignUpValues = z.infer<typeof employerSignUpSchema>;

interface EmployerSignUpFormProps {
  isLoading: boolean;
  isAppleLoading: boolean;
  handleAppleSignIn: () => Promise<void>;
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
  isAppleLoading,
  handleAppleSignIn,
}: EmployerSignUpFormProps) => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);

  const form = useForm<EmployerSignUpValues>({
    resolver: zodResolver(employerSignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      jobTitle: "",
      companyWebsite: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: EmployerSignUpValues) => {
    try {
      // Sign up with employer user type
      await signUp(
        values.email, 
        values.password, 
        values.firstName, 
        values.lastName,
        'employer' // specify user type
      );
      
      toast({
        title: "Employer account created",
        description: "Your account is pending verification. You'll receive an email when approved.",
      });
      
      setShowVerificationAlert(true);
      // Don't navigate away immediately so user can see the verification message
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
      <div className="md:col-span-3">
        {showVerificationAlert ? (
          <div className="space-y-6">
            <Alert variant="default" className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <AlertTitle className="text-amber-700 dark:text-amber-300">Verification Required</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-300">
                Thank you for registering as an employer. For security and quality control, all employer accounts require verification before posting jobs.
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>We'll review your account within 1-2 business days</li>
                  <li>You'll receive an email when your account is approved</li>
                  <li>You can browse the platform while waiting for verification</li>
                </ul>
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Button onClick={() => navigate('/')} className="w-full">
                Go to Homepage
              </Button>
              <Button onClick={() => navigate('/profile')} variant="outline" className="w-full">
                Complete Your Profile
              </Button>
            </div>
          </div>
        ) : (
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
              requireTermsAcceptance={true}
              additionalFields={
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Company Website</Label>
                      <Input
                        id="companyWebsite"
                        placeholder="https://yourcompany.com"
                        {...form.register("companyWebsite")}
                      />
                      {form.formState.errors.companyWebsite && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.companyWebsite.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Alert variant="outline" className="bg-muted/50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Verification Required</AlertTitle>
                    <AlertDescription>
                      All employer accounts require verification before posting jobs. This helps maintain quality and security.
                    </AlertDescription>
                  </Alert>
                </>
              }
            />
          </SignUpFormShared>
        )}
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

// Add these missing components for the form
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
    {children}
  </label>
);

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    ref={ref}
    {...props}
  />
));

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default EmployerSignUpForm;
