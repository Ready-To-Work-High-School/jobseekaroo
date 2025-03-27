
import { Alert, AlertDescription } from "@/components/ui/alert";

const PasswordResetSuccess = () => {
  return (
    <Alert className="bg-green-50 border-green-200 text-green-800">
      <AlertDescription>
        Your password has been reset successfully! You will be redirected to the sign in page.
      </AlertDescription>
    </Alert>
  );
};

export default PasswordResetSuccess;
