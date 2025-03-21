
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import SignInForm from "@/components/auth/SignInForm";
import AppleSignInButton from "@/components/auth/AppleSignInButton";
import SignInBenefitsCard from "@/components/auth/SignInBenefitsCard";

const SignIn = () => {
  const { signInWithApple, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      console.log("SignIn: User already logged in, redirecting to home");
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your account</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 bg-card border rounded-lg shadow-sm p-6">
            <SignInForm />
            
            <div className="mt-6 mb-6">
              <Separator>
                <span className="px-2 text-xs text-muted-foreground">OR</span>
              </Separator>
            </div>
            
            <AppleSignInButton onSignIn={signInWithApple} />
            
            <div className="mt-4 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-primary font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <SignInBenefitsCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
