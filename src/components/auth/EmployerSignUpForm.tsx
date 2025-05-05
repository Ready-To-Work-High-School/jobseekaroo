
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert } from '@/components/ui/alert';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { validatePasswordStrength } from '@/contexts/auth/services/security';
import NetworkOfflineState from './diagnostic/NetworkOfflineState';

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
  isLoading: externalIsLoading,
  isAppleLoading,
  handleAppleSignIn 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { signUp, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const password = watch('password', ''); // Watch password for strength indicator
  
  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    if (isOffline) {
      setError("You appear to be offline. Please check your internet connection.");
      return;
    }

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
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = error.message || 'Failed to create account. Please try again.';
      
      // Enhance error messages for common issues
      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
        setIsOffline(true);
      } else if (errorMessage.includes('already')) {
        errorMessage = 'An account with this email already exists. Please sign in instead.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  // If offline, show network error state
  if (isOffline) {
    return (
      <div className="space-y-4">
        <NetworkOfflineState onRetry={() => setIsOffline(!navigator.onLine)} />
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <span className="ml-2">{error}</span>
          </Alert>
        )}
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span className="ml-2">{error}</span>
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
          placeholder="john.doe@company.com"
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
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 12,
                message: 'Password must be at least 12 characters',
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
      
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          placeholder="Acme Inc."
          {...register('companyName', { required: 'Company name is required' })}
        />
        {errors.companyName && (
          <p className="text-sm text-red-500">{errors.companyName.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyWebsite">Company Website</Label>
        <Input
          id="companyWebsite"
          placeholder="https://www.acme.com"
          {...register('companyWebsite', {
            required: 'Company website is required',
            pattern: {
              value: /^(http|https):\/\/[a-zA-Z0-9-\.]+\.[a-zA-Z]{2,}(\/\S*)?$/,
              message: 'Enter a valid URL',
            },
          })}
        />
        {errors.companyWebsite && (
          <p className="text-sm text-red-500">{errors.companyWebsite.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="jobTitle">Your Job Title</Label>
        <Input
          id="jobTitle"
          placeholder="Hiring Manager"
          {...register('jobTitle', { required: 'Job title is required' })}
        />
        {errors.jobTitle && (
          <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading || externalIsLoading}>
        {isLoading || externalIsLoading ? 'Creating Account...' : 'Sign Up as Employer'}
      </Button>
    </form>
  );
};

export default EmployerSignUpForm;
