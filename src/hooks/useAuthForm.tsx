import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';
import { useAuth } from '@/contexts/auth/useAuth';
import { validatePasswordStrength } from '@/contexts/auth/services/security';

// Define form validation schema for sign up with simplified password validation
export const signUpSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
  }),
  userType: z.enum(['student', 'employer']),
  age: z.number().optional().transform(val => val ? Number(val) : undefined),
});

// Define form validation schema for sign in
export const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional().default(false),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;

export const useAuthForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>(
    navigator.onLine ? 'online' : 'offline'
  );
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, signInWithApple } = useAuth();
  
  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Initialize react-hook-form with simplified zod validation for sign up
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      agreeToTerms: false as true, // Type assertion to bypass the TypeScript check
      userType: 'student',
    },
    mode: 'onChange', // Validate on change for better user experience
  });

  // Initialize react-hook-form with zod validation for sign in
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Sign up handler with password strength feedback and network checks
  const handleSignUp = async (data: SignUpFormValues) => {
    if (networkStatus === 'offline') {
      toast({
        variant: 'destructive',
        title: 'Network Error',
        description: 'You appear to be offline. Please check your internet connection.',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Basic validation for password
      const passwordCheck = validatePasswordStrength(data.password);
      if (!passwordCheck.isValid) {
        throw new Error(passwordCheck.errorMessage || 'Password is not strong enough');
      }

      // Determine if parental consent is needed
      const requiresParentalConsent = data.userType === 'student' && 
        data.age && data.age < 18;
      
      // Pass only the expected arguments to match the signUp function signature
      const user = await signUp(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.userType
      );
      
      if (!user) {
        throw new Error('Failed to create account');
      }

      toast({
        title: 'Account created',
        description: 'Your account has been created successfully',
      });
      
      // If student is under 18, redirect to parental consent page
      if (requiresParentalConsent) {
        navigate('/parental-consent');
      } else {
        navigate(data.userType === 'student' ? '/student-dashboard' : '/dashboard');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      // Enhanced error handling
      let errorMessage = error.message || 'Failed to create account. Please try again.';
      
      if (!navigator.onLine || errorMessage.includes('network') || errorMessage.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
        setNetworkStatus('offline');
      } else if (errorMessage.includes('already')) {
        errorMessage = 'An account with this email already exists. Please sign in instead.';
      }
      
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Sign in handler with network checks
  const handleSignIn = async (data: SignInFormValues) => {
    if (networkStatus === 'offline') {
      toast({
        variant: 'destructive',
        title: 'Network Error',
        description: 'You appear to be offline. Please check your internet connection.',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const user = await signIn(data.email, data.password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      toast({
        title: 'Welcome back!',
        description: 'You have been signed in successfully',
      });
      
      // Redirect based on user type
      if (user.user_metadata?.user_type === 'student') {
        navigate('/student-dashboard');
      } else if (user.user_metadata?.user_type === 'employer') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Enhanced error handling
      let errorMessage = error.message || 'Failed to sign in. Please check your credentials.';
      
      if (!navigator.onLine || errorMessage.includes('network') || errorMessage.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
        setNetworkStatus('offline');
      }
      
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Social sign-in handler with network checks
  const handleSocialSignIn = async (provider: 'google' | 'apple') => {
    if (networkStatus === 'offline') {
      toast({
        variant: 'destructive',
        title: 'Network Error',
        description: 'You appear to be offline. Social authentication requires an internet connection.',
      });
      return;
    }
    
    try {
      if (provider === 'google') {
        setIsGoogleLoading(true);
        console.log('Starting Google sign-in process...');
        await signInWithGoogle();
      } else {
        setIsAppleLoading(true);
        console.log('Starting Apple sign-in process...');
        await signInWithApple();
      }
      // The redirect is handled by the auth provider
    } catch (error: any) {
      console.error(`${provider} sign in error:`, error);
      
      // Enhanced error handling
      let errorMessage = error.message || `Failed to sign in with ${provider}. Please try again.`;
      
      if (!navigator.onLine || errorMessage.includes('network') || errorMessage.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
        setNetworkStatus('offline');
      }
      
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    } finally {
      if (provider === 'google') {
        setIsGoogleLoading(false);
      } else {
        setIsAppleLoading(false);
      }
    }
  };
  
  return {
    signUpForm,
    signInForm,
    handleSignUp,
    handleSignIn,
    handleSocialSignIn,
    isSubmitting,
    isGoogleLoading,
    isAppleLoading,
    networkStatus,
  };
};
