
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useFadeIn } from '@/utils/animations';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import SignInBenefitsCard from '@/components/auth/SignInBenefitsCard';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import { useToast } from '@/hooks/use-toast';

const SignIn = () => {
  const { 
    signInForm, 
    handleSignIn, 
    handleSocialSignIn, 
    isSubmitting,
    isGoogleLoading,
    isAppleLoading 
  } = useAuthForm();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = signInForm;

  const fadeIn = useFadeIn(200);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check for network status on load
  useEffect(() => {
    if (!navigator.onLine) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "You appear to be offline. Please check your internet connection.",
      });
    }
  }, [toast]);
  
  return (
    <Layout hideAuthLinks>
      <Helmet>
        <title>Sign In | Jobseekaroo</title>
        <meta name="description" content="Sign in to your Jobseekaroo account to access job opportunities, manage applications, and more." />
      </Helmet>
      
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Sign In Form */}
          <div className={fadeIn}>
            <Card className="border shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password to sign in
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Social Sign In Options */}
                <SocialAuthButtons 
                  onGoogleSignIn={() => handleSocialSignIn('google')}
                  onAppleSignIn={() => handleSocialSignIn('apple')}
                  isGoogleLoading={isGoogleLoading}
                  isAppleLoading={isAppleLoading}
                  isFormLoading={isSubmitting}
                />
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-card px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                  </div>
                </div>
                
                {/* Sign In Form */}
                <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      placeholder="name@example.com" 
                      type="email"
                      {...register('email')}
                      className={errors.email ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-xs font-normal p-0 h-auto"
                        asChild
                      >
                        <Link to="/reset-password">Forgot password?</Link>
                      </Button>
                    </div>
                    <Input 
                      id="password" 
                      placeholder="••••••••" 
                      type="password" 
                      {...register('password')}
                      className={errors.password ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" {...register('rememberMe')} />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Don't have an account?{' '}
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <Link to="/sign-up">Sign up</Link>
                  </Button>
                </p>
              </CardFooter>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className={`space-y-6 ${fadeIn}`}>
            <SignInBenefitsCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
