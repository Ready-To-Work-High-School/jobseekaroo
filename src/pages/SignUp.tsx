
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import Layout from "@/components/Layout";

const SignUp = () => {
  return (
    <Layout>
      <div className="w-full max-w-md mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to start exploring jobs</p>
        </div>
        <div className="bg-card border rounded-lg shadow-sm p-6">
          <ClerkSignUp 
            routing="path" 
            path="/sign-up" 
            signInUrl="/sign-in"
            afterSignUpUrl="/"
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

export default SignUp;
