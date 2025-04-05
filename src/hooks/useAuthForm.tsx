import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';

// Define validation schemas
const signInSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

const signUpSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  userType: z.enum(['student', 'employer']),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
  }),
});

// Define form types
export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;

export function useAuthForm() {
  const { signIn, signUp, signInWithGoogle, signInWithApple } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sign In Form
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  
  // Sign Up Form
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      userType: 'student',
      agreeToTerms: false as unknown as true,
    },
  });
  
  // Handle sign in submission
  const handleSignIn: SubmitHandler<SignInFormValues> = async (values) => {
    setIsSubmitting(true);
    
    try {
      const user = await signIn(values.email, values.password);
      
      if (user) {
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
        
        if (redirectPath) {
          sessionStorage.removeItem('redirectAfterLogin');
          navigate(redirectPath);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign in failed',
        description: error.message || 'There was a problem signing in.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle sign up submission
  const handleSignUp: SubmitHandler<SignUpFormValues> = async (values) => {
    setIsSubmitting(true);
    
    try {
      const user = await signUp(
        values.email,
        values.password,
        values.firstName,
        values.lastName,
        values.userType
      );
      
      if (user) {
        toast({
          title: 'Account created!',
          description: 'Your account has been successfully created.',
        });
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      if (error.message?.includes('already registered')) {
        toast({
          variant: 'destructive',
          title: 'Email already in use',
          description: 'This email is already registered. Try signing in instead.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Sign up failed',
          description: error.message || 'There was a problem creating your account.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle social sign in
  const handleSocialSignIn = async (provider: 'google' | 'apple') => {
    setIsSubmitting(true);
    
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithApple();
      }
    } catch (error: any) {
      console.error(`${provider} sign in error:`, error);
      toast({
        variant: 'destructive',
        title: 'Sign in failed',
        description: error.message || `There was a problem signing in with ${provider}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    signInForm,
    signUpForm,
    handleSignIn,
    handleSignUp,
    handleSocialSignIn,
    isSubmitting,
  };
}
