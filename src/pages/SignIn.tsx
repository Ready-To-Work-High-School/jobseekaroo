
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import Layout from "@/components/Layout";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout>
      <div className="w-full max-w-md mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your account</p>
        </div>
        <div className="bg-card border rounded-lg shadow-sm p-6">
          <ClerkSignIn 
            routing="path" 
            path="/sign-in" 
            signUpUrl="/sign-up"
            afterSignInUrl="/"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none border-none p-0",
                formButtonPrimary: "bg-primary hover:bg-primary/90",
              }
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
