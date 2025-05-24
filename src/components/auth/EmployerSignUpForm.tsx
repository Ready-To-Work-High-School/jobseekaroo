
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { useEmailBreachCheck } from './hooks/useEmailBreachCheck';
import { useEmployerSignUp } from './hooks/useEmployerSignUp';
import EmployerFormFields from './employer/EmployerFormFields';
import EmailBreachWarning from './EmailBreachWarning';

interface EmployerSignUpFormProps {
  onSuccess?: (userId: string) => void;
  isLoading?: boolean;
  isAppleLoading?: boolean;
  handleAppleSignIn?: () => Promise<void>;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  companyWebsite: string;
  jobTitle: string;
};

const EmployerSignUpForm: React.FC<EmployerSignUpFormProps> = ({ 
  onSuccess,
  isLoading: externalIsLoading = false,
  isAppleLoading = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      companyName: '',
      companyWebsite: '',
      jobTitle: ''
    }
  });
  
  const email = watch('email', '');
  const { emailBreachResult, checkingEmail } = useEmailBreachCheck(email);
  const { handleSignUp, isLoading, error } = useEmployerSignUp({ onSuccess });
  
  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}
      
      <EmployerFormFields
        register={register}
        errors={errors}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      >
        {checkingEmail && (
          <p className="text-sm text-blue-600">🔍 Checking email security status...</p>
        )}
        
        {emailBreachResult && !checkingEmail && (
          <EmailBreachWarning {...emailBreachResult} />
        )}
      </EmployerFormFields>
      
      <Button type="submit" className="w-full" disabled={isLoading || externalIsLoading || isAppleLoading}>
        {isLoading || externalIsLoading ? 'Creating Account...' : 'Sign Up as Employer'}
      </Button>
    </form>
  );
};

export default EmployerSignUpForm;
