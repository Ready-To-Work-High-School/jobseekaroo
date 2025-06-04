
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { validatePasswordStrength } from '@/contexts/auth/services/security';

interface EmployerSignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName: string;
  companyWebsite: string;
  jobTitle: string;
}

interface UseEmployerSignUpProps {
  onSuccess?: (userId: string) => void;
}

export const useEmployerSignUp = ({ onSuccess }: UseEmployerSignUpProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (data: EmployerSignUpData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate password strength before submission
      const { isValid, errorMessage } = validatePasswordStrength(data.password);
      if (!isValid) {
        throw new Error(errorMessage || "Password is not strong enough");
      }

      // Create the user account
      const user = await signUp(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        'employer'
      );
      
      // If sign-up is successful, update the profile with employer-specific details
      if (user) {
        await updateProfile({
          company_name: data.companyName,
          company_website: data.companyWebsite,
          job_title: data.jobTitle,
          employer_verification_status: 'pending'
        });
        
        // Display success message
        toast({
          title: "Account created",
          description: "Your employer account registration is complete. Please continue with the verification process.",
        });
        
        // Call onSuccess with the user ID
        if (onSuccess && user.id) {
          onSuccess(user.id);
        } else {
          // If no onSuccess callback, navigate to dashboard
          navigate('/dashboard');
        }
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignUp, isLoading, error };
};
