
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Briefcase, Apple } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useFadeIn } from '@/utils/animations';
import { useAuthForm } from '@/hooks/useAuthForm';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import GoogleIcon from '@/components/icons/GoogleIcon';
import SignUpBenefitCard from '@/components/auth/SignUpBenefitCard';
import StudentSignUpForm from '@/components/auth/StudentSignUpForm';
import EmployerSignUpForm from '@/components/auth/EmployerSignUpForm';
import AuthTroubleshooter from '@/components/troubleshooting/AuthTroubleshooter';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

const SignUp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultUserType = queryParams.get('type') === 'employer' ? 'employer' : 'student';
  
  const [userType, setUserType] = useState(defaultUserType);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { handleSocialSignIn, isSubmitting } = useAuthForm();
  const fadeIn = useFadeIn(200);
  
  const handleSignupSuccess = (userId: string) => {
    setSuccessMessage(
      userType === 'employer' 
        ? "Your employer account has been created successfully. Verification may be required before you can post jobs."
        : "Your student account has been created successfully. Welcome to Jobseekaroo!"
    );
  };

  return (
    <Layout hideAuthLinks>
      <Helmet>
        <title>Sign Up | Jobseekaroo</title>
        <meta name="description" content="Create your Jobseekaroo account to access job opportunities, post jobs, and more." />
      </Helmet>
      
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className={fadeIn}>
            <Card className="border shadow-sm">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                <CardDescription className="text-center">
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {successMessage ? (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                    <div className="mt-4">
                      <Button asChild variant="outline" className="text-green-600 border-green-300 hover:bg-green-100">
                        <Link to="/sign-in">Continue to Sign In</Link>
                      </Button>
                    </div>
                  </Alert>
                ) : (
                  <>
                    <RadioGroup 
                      defaultValue={userType}
                      onValueChange={(value) => setUserType(value as 'student' | 'employer')}
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

                    {userType === 'student' ? (
                      <StudentSignUpForm
                        isLoading={isSubmitting}
                        onSuccess={handleSignupSuccess}
                      />
                    ) : (
                      <EmployerSignUpForm
                        isLoading={isSubmitting}
                        onSuccess={handleSignupSuccess}
                      />
                    )}
                    
                    <AuthTroubleshooter initialIssue="Having trouble creating an account?" />
                  </>
                )}
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

          <div className={`space-y-6 ${fadeIn}`}>
            {userType === 'student' ? (
              <SignUpBenefitCard 
                title="Student Account Benefits"
                subtitle="Kickstart Your Career Journey"
                titleIcon={School}
                benefits={[
                  { icon: School, text: "Access to exclusive student-friendly job opportunities" },
                  { icon: School, text: "Free resume builder and career resources" },
                  { icon: School, text: "Verified student profile badge" },
                  { icon: School, text: "Safe, school-supported work opportunities" },
                  { icon: School, text: "Internship and part-time job matches" }
                ]}
                ctaText="Get started with your student account today!"
                ctaColor="blue"
              />
            ) : (
              <SignUpBenefitCard
                title="Employer Account Benefits"
                subtitle="Connect with Student Talent"
                titleIcon={Briefcase}
                benefits={[
                  { icon: Briefcase, text: "Access to verified student talent pool" },
                  { icon: Briefcase, text: "Verified employer status" },
                  { icon: Briefcase, text: "Fast-track hiring process" },
                  { icon: Briefcase, text: "Detailed analytics and reporting" },
                  { icon: Briefcase, text: "Risk-free hiring with school support" }
                ]}
                ctaText="Start hiring qualified students today!"
                ctaColor="green"
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
