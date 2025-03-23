
import Layout from "@/components/Layout";
import SignInForm from "@/components/auth/SignInForm";
import SignInBenefitsCard from "@/components/auth/SignInBenefitsCard";

const SignIn = () => {
  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your account</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <SignInForm />
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
