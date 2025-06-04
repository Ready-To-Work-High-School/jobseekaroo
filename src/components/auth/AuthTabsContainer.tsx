
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthSignInTab from './AuthSignInTab';
import AuthSignUpTab from './AuthSignUpTab';

const AuthTabsContainer = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (email: string, password: string) => {
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Sign in page: Starting signin process');
      const user = await signIn(email, password);
      
      console.log('Sign in page: Signin complete, checking for redirect');
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
      
      // Check for stored redirect URL
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        console.log('Redirecting to stored URL:', redirectUrl);
        setTimeout(() => navigate(redirectUrl), 500);
      } else {
        console.log('No stored redirect, going to dashboard');
        setTimeout(() => navigate('/dashboard'), 500);
      }
    } catch (err: any) {
      console.error('Sign in page error:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, firstName: string, lastName: string, userType: 'student' | 'employer') => {
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Sign up process starting');
      const user = await signUp(email, password, firstName, lastName, userType);
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Your Account</CardTitle>
        <CardDescription>
          Sign in to your existing account or create a new one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <AuthSignInTab 
              onSignIn={handleSignIn}
              error={error}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <AuthSignUpTab 
              onSignUp={handleSignUp}
              error={error}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthTabsContainer;
