
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, Briefcase, Loader2, School } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';
import { useAuthForm, SignUpFormValues } from '@/hooks/useAuthForm';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import GoogleIcon from '@/components/icons/GoogleIcon';

const SignUp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultUserType = queryParams.get('type') === 'employer' ? 'employer' : 'student';
  
  const { 
    signUpForm, 
    handleSignUp, 
    handleSocialSignIn, 
    isSubmitting 
  } = useAuthForm();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = signUpForm;
  
  // Set default user type based on URL parameter
  useState(() => {
    setValue('userType', defaultUserType as 'student' | 'employer');
  });
  
  const userType = watch('userType');
  const fadeIn = useFadeIn(200);
  
  return (
    <Layout hideAuthLinks>
      <Helmet>
        <title>Sign Up | Jobseekaroo</title>
        <meta name="description" content="Create your Jobseekaroo account to access job opportunities, post jobs, and more." />
      </Helmet>
      
      <div className={`container max-w-md mx-auto py-8 px-4 ${fadeIn}`}>
        <Card className="border shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Account type selection */}
            <RadioGroup 
              defaultValue={userType}
              onValueChange={(value) => setValue('userType', value as 'student' | 'employer')}
              className="grid grid-cols-2 gap-4 pb-2"
            >
              <div>
                <RadioGroupItem
                  value="student"
                  id="student"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="student"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <School className="mb-3 h-6 w-6" />
                  <p>Student</p>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="employer"
                  id="employer"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="employer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Briefcase className="mb-3 h-6 w-6" />
                  <p>Employer</p>
                </Label>
              </div>
            </RadioGroup>
            
            {/* Social Sign In Options */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => handleSocialSignIn('google')}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2"
              >
                <GoogleIcon className="h-4 w-4" />
                <span>Google</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleSocialSignIn('apple')}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2"
              >
                <Apple className="h-4 w-4" />
                <span>Apple</span>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
              </div>
            </div>
            
            {/* Sign Up Form */}
            <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName" 
                    {...register('firstName')}
                    className={errors.firstName ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName" 
                    {...register('lastName')}
                    className={errors.lastName ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="name@example.com" 
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="••••••••" 
                  {...register('password')}
                  className={errors.password ? 'border-red-500' : ''}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="agreeToTerms" 
                  {...register('agreeToTerms')}
                  className={errors.agreeToTerms ? 'border-red-500' : ''}
                />
                <Label htmlFor="agreeToTerms" className="text-sm font-normal">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-xs text-red-500">{errors.agreeToTerms.message}</p>
              )}
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-muted-foreground mt-2">
              Already have an account?{' '}
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link to="/sign-in">Sign in</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUp;
