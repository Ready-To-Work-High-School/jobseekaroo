
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SignInForm from "@/components/auth/SignInForm";
import SignInBenefitsCard from "@/components/auth/SignInBenefitsCard";
import CredentialsBadgesSection from "@/components/auth/CredentialsBadgesSection";
import CredentialEducationSection from "@/components/auth/CredentialEducationSection";
import { useSearchParams } from "react-router-dom";
import { useFadeIn } from "@/utils/animations";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const redirectFrom = searchParams.get("redirectFrom");
  const [showRedirectAlert, setShowRedirectAlert] = useState(!!redirectFrom);
  const contentAnimation = useFadeIn(300);

  // Auto-hide the redirect alert after 5 seconds
  useEffect(() => {
    if (showRedirectAlert) {
      const timer = setTimeout(() => {
        setShowRedirectAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showRedirectAlert]);

  return (
    <Layout>
      <div className={`w-full max-w-4xl mx-auto py-8 px-4 md:px-0 ${contentAnimation}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your account</p>
        </div>
        
        {showRedirectAlert && (
          <Alert variant="default" className="mb-6 bg-amber-50 border-amber-200 text-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-800" />
            <AlertDescription>
              Please sign in to access {redirectFrom === "jobs" 
                ? "job listings" 
                : redirectFrom === "skills" 
                  ? "your skills dashboard" 
                  : "protected content"}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 mb-8">
          <div className="md:col-span-3">
            <SignInForm />
          </div>
          
          <div className="md:col-span-2">
            <SignInBenefitsCard />
          </div>
        </div>
        
        {/* Credential Education Section */}
        <div className="mt-12">
          <CredentialEducationSection />
        </div>
        
        {/* Industry Recognized Credentials Section */}
        <div className="mt-12 mb-4">
          <CredentialsBadgesSection />
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
