
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import SampleCandidatePipeline from '@/components/auth/SampleCandidatePipeline';
import { LogIn, UserPlus, Briefcase, Users } from 'lucide-react';

const SignIn = () => {
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    userType: 'student' as 'student' | 'employer' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Sign in page: Starting signin process');
      const user = await signIn(signInData.email, signInData.password);
      
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      console.log('Sign up process starting');
      const user = await signUp(
        signUpData.email, 
        signUpData.password, 
        signUpData.firstName, 
        signUpData.lastName,
        signUpData.userType
      );
      
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
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join JobSeekers4HS</h1>
            <p className="text-muted-foreground">
              Connecting high school students with meaningful work opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Authentication Forms */}
            <div className="space-y-6">
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
                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                          <span className="block sm:inline">{error}</span>
                        </div>
                      )}
                      
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                          <Label htmlFor="signin-email">Email address</Label>
                          <Input
                            id="signin-email"
                            type="email"
                            value={signInData.email}
                            onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="signin-password">Password</Label>
                          <Input
                            id="signin-password"
                            type="password"
                            value={signInData.password}
                            onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                            required
                          />
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          <LogIn className="h-4 w-4 mr-2" />
                          {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="signup" className="space-y-4">
                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                          <span className="block sm:inline">{error}</span>
                        </div>
                      )}
                      
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={signUpData.firstName}
                              onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={signUpData.lastName}
                              onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="signup-email">Email address</Label>
                          <Input
                            id="signup-email"
                            type="email"
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="signup-password">Password</Label>
                          <Input
                            id="signup-password"
                            type="password"
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label>Account Type</Label>
                          <div className="flex gap-4 mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="userType"
                                value="student"
                                checked={signUpData.userType === 'student'}
                                onChange={(e) => setSignUpData({...signUpData, userType: 'student'})}
                              />
                              <Users className="h-4 w-4" />
                              Student
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="userType"
                                value="employer"
                                checked={signUpData.userType === 'employer'}
                                onChange={(e) => setSignUpData({...signUpData, userType: 'employer'})}
                              />
                              <Briefcase className="h-4 w-4" />
                              Employer
                            </label>
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sample Candidate Pipeline */}
            <div>
              <SampleCandidatePipeline />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
