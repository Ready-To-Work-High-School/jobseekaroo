
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { School, Users, LogIn, UserPlus, GraduationCap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const SchoolAuthCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student' as 'student' | 'employer',
    schoolId: '',
    grade: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(signInData.email, signInData.password);
      toast.success("Welcome back! You have been signed in successfully.");
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(
        signUpData.email,
        signUpData.password,
        signUpData.firstName,
        signUpData.lastName,
        signUpData.userType
      );
      toast.success("Account created! Your school account has been created successfully.");
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 border-2 border-blue-200 shadow-xl">
      <CardHeader className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-green-500 rounded-full">
            <School className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-800">School Portal</CardTitle>
        <CardDescription className="text-gray-600">
          Access your school account to connect with opportunities
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signin" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="signin-email">School Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="your.name@school.edu"
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
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600" 
                disabled={isLoading}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {isLoading ? 'Signing In...' : 'Sign In to School Portal'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
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
                <Label htmlFor="signup-email">School Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.name@school.edu"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label>I am a:</Label>
                <Select 
                  value={signUpData.userType} 
                  onValueChange={(value: 'student' | 'employer') => setSignUpData({...signUpData, userType: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Student
                      </div>
                    </SelectItem>
                    <SelectItem value="employer">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        School Staff/Employer
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {signUpData.userType === 'student' && (
                <div>
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select onValueChange={(value) => setSignUpData({...signUpData, grade: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9th Grade</SelectItem>
                      <SelectItem value="10">10th Grade</SelectItem>
                      <SelectItem value="11">11th Grade</SelectItem>
                      <SelectItem value="12">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600" 
                disabled={isLoading}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {isLoading ? 'Creating Account...' : 'Create School Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <School className="h-4 w-4" />
          <span>Secure • School-Verified • Safe</span>
        </div>
        <p className="text-xs text-gray-500">
          By signing up, you agree to follow school policies and guidelines
        </p>
      </CardFooter>
    </Card>
  );
};

export default SchoolAuthCard;
