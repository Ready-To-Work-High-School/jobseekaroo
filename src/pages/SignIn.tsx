
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, WifiOff } from 'lucide-react';
import { useAuthForm } from '@/hooks/useAuthForm';
import { useFadeIn } from '@/utils/animations';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import SignInBenefitsCard from '@/components/auth/SignInBenefitsCard';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import AuthTroubleshooter from '@/components/troubleshooting/AuthTroubleshooter';
import ConnectionTroubleshooter from '@/components/auth/ConnectionTroubleshooter';

const SignIn = () => {
  const [searchParams] = useSearchParams();
  const { 
    signInForm, 
    handleSignIn, 
    handleSocialSignIn, 
    isSubmitting,
    isGoogleLoading,
    isAppleLoading,
    networkStatus 
  } = useAuthForm();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = signInForm;

  const fadeIn = useFadeIn(200);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showTroubleshooter, setShowTroubleshooter] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [networkTestComplete, setNetworkTestComplete] = useState(false);
  const [bypassNetworkCheck, setBypassNetworkCheck] = useState(
    searchParams.get('bypass') === 'network'
  );
  
  // Monitor network status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast({
        title: "Connection Restored",
        description: "Your internet connection has been restored.",
      });
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "You appear to be offline. Please check your internet connection.",
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);
  
  // Check for network status on load
  useEffect(() => {
    if (!navigator.onLine && !bypassNetworkCheck) {
      setIsOffline(true);
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "You appear to be offline. Please check your internet connection.",
      });
    } else {
      setNetworkTestComplete(true);
    }
  }, [toast, bypassNetworkCheck]);
  
  const handleRetryConnection = () => {
    // Test if we can reach the server
    fetch('/api/health-check', { 
      method: 'HEAD',
      cache: 'no-cache'
    })
      .then(() => {
        toast({
          title: "Connection Successful",
          description: "Connection to the server has been restored.",
        });
        window.location.reload();
      })
      .catch(err => {
        console.error('Connection retry failed:', err);
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: "Still unable to connect. Please check your internet connection.",
        });
      });
  };
  
  const shouldDisableForm = (isOffline && !bypassNetworkCheck) || isSubmitting;
  
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
                {isOffline && !bypassNetworkCheck ? (
                  <Alert variant="destructive" className="mb-4">
                    <WifiOff className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex flex-col space-y-2">
                        <span>You appear to be offline. Please check your internet connection.</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleRetryConnection}
                          className="mt-2 w-fit"
                        >
                          Retry Connection
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ) : null}
                
                {bypassNetworkCheck && (
                  <Alert className="mb-4 bg-yellow-50 border-yellow-200">
                    <AlertDescription>
                      Network check bypassed. You can try signing in, but authentication might fail if you're offline.
                    </AlertDescription>
                  </Alert>
                )}
                
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
                      disabled={shouldDisableForm}
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
                      disabled={shouldDisableForm}
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" {...register('rememberMe')} disabled={shouldDisableForm} />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={shouldDisableForm}
                  >
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
                
                {/* Add Troubleshooter */}
                <div className="w-full mt-4">
                  {isOffline && !bypassNetworkCheck ? (
                    <ConnectionTroubleshooter onRetryConnection={handleRetryConnection} />
                  ) : (
                    <AuthTroubleshooter
                      initialIssue="Having trouble signing in? We can help diagnose the issue."
                    />
                  )}
                </div>
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
