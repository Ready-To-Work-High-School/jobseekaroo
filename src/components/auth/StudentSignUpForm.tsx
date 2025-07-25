
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { validatePasswordStrength } from '@/contexts/auth/services/security';
import { checkEmailBreach, EmailBreachResult } from '@/lib/security/emailBreachCheck';
import EmailBreachWarning from './EmailBreachWarning';

interface StudentSignUpFormProps {
  onSuccess?: () => void;
  isLoading?: boolean;
  isAppleLoading?: boolean;
  handleAppleSignIn?: () => Promise<void>;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const StudentSignUpForm: React.FC<StudentSignUpFormProps> = ({ 
  onSuccess,
  isLoading: externalIsLoading,
  isAppleLoading,
  handleAppleSignIn 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailBreachResult, setEmailBreachResult] = useState<EmailBreachResult | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const password = watch('password', '');
  const email = watch('email', '');
  
  // Debounced email breach check
  useEffect(() => {
    if (!email || !email.includes('@')) {
      setEmailBreachResult(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingEmail(true);
      try {
        const result = await checkEmailBreach(email);
        setEmailBreachResult(result);
      } catch (error) {
        console.error('Email breach check failed:', error);
      } finally {
        setCheckingEmail(false);
      }
    }, 1000); // Check 1 second after user stops typing

    return () => clearTimeout(timer);
  }, [email]);
  
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('StudentSignUpForm: Starting signup process');
      
      // Validate password strength before submission
      const { isValid, errorMessage } = validatePasswordStrength(data.password);
      if (!isValid) {
        throw new Error(errorMessage || "Password is not strong enough");
      }
      
      // Create the user account with student user type
      const user = await signUp(
        data.email, 
        data.password,
        data.firstName,
        data.lastName,
        'student'
      );
      
      console.log('StudentSignUpForm: Signup completed, user:', user ? 'success' : 'null');

      if (user) {
        // Display success message
        toast({
          title: "Account created",
          description: "Your student account has been created successfully.",
        });
        
        // Redirect or callback
        if (onSuccess) {
          console.log('StudentSignUpForm: Calling onSuccess callback');
          onSuccess();
        } else {
          console.log('StudentSignUpForm: Redirecting to dashboard');
          setTimeout(() => navigate('/dashboard'), 500);
        }
      } else {
        throw new Error('Failed to create account');
      }
    } catch (error: any) {
      console.error('StudentSignUpForm signup error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        
        {checkingEmail && (
          <p className="text-sm text-blue-600">🔍 Checking email security status...</p>
        )}
        
        {emailBreachResult && !checkingEmail && (
          <EmailBreachWarning {...emailBreachResult} />
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        
        <PasswordStrengthIndicator password={password} />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading || externalIsLoading}>
        {isLoading || externalIsLoading ? 'Creating Account...' : 'Sign Up as Student'}
      </Button>
    </form>
  );
};

export default StudentSignUpForm;
