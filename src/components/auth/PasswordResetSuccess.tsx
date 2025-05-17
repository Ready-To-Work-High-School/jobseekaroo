
import { CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PasswordResetSuccess = () => {
  return (
    <Alert className="bg-green-50 border-green-200 text-green-800">
      <CheckCircle className="h-5 w-5 text-green-600" />
      <AlertTitle className="text-green-800 font-medium">Success!</AlertTitle>
      <AlertDescription className="text-green-700">
        Your password has been reset successfully.
        <br />
        You will be redirected to the sign-in page shortly.
      </AlertDescription>
    </Alert>
  );
};

export default PasswordResetSuccess;
