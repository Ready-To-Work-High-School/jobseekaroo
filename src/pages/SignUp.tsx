
import { useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Briefcase } from "lucide-react";
import StudentSignUpForm from "@/components/auth/StudentSignUpForm";
import EmployerSignUpForm from "@/components/auth/EmployerSignUpForm";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
  const { signInWithApple } = useAuth();
  const { toast } = useToast();
  
  const handleAppleSignIn = async () => {
    setIsAppleLoading(true);
    try {
      await signInWithApple();
      // Note: No need to show success toast or navigate since OAuth redirects
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Could not sign in with Apple",
        variant: "destructive",
      });
      setIsAppleLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to start exploring jobs</p>
        </div>
        
        <Tabs 
          defaultValue="student" 
          className="w-full mb-6"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="student">
              <GraduationCap className="h-4 w-4 mr-2" />
              Student
            </TabsTrigger>
            <TabsTrigger value="employer">
              <Briefcase className="h-4 w-4 mr-2" />
              Employer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="student" className="mt-6">
            <StudentSignUpForm 
              isLoading={isLoading}
              isAppleLoading={isAppleLoading}
              handleAppleSignIn={handleAppleSignIn}
            />
          </TabsContent>
          
          <TabsContent value="employer" className="mt-6">
            <EmployerSignUpForm 
              isLoading={isLoading}
              isAppleLoading={isAppleLoading}
              handleAppleSignIn={handleAppleSignIn}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SignUp;
