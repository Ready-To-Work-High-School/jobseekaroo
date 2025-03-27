
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import PasswordResetSuccess from "@/components/auth/PasswordResetSuccess";
import PasswordResetTokenValidator from "@/components/auth/PasswordResetTokenValidator";

const ResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [isResetComplete, setIsResetComplete] = useState(false);
  const navigate = useNavigate();

  const handleTokenError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleResetSuccess = () => {
    setIsResetComplete(true);
  };

  return (
    <Layout>
      <div className="container max-w-md py-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
            <CardDescription>
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PasswordResetTokenValidator onError={handleTokenError} />
            
            {isResetComplete ? (
              <PasswordResetSuccess />
            ) : (
              <PasswordResetForm onSuccess={handleResetSuccess} />
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/sign-in")}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ResetPassword;
