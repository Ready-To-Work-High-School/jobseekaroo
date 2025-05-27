
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';
import SchoolAuthHeader from './school/SchoolAuthHeader';
import SchoolAuthFooter from './school/SchoolAuthFooter';
import SchoolSignInForm from './school/SchoolSignInForm';
import SchoolSignUpForm from './school/SchoolSignUpForm';
import { useSchoolAuth } from './school/hooks/useSchoolAuth';

const SchoolAuthCard = () => {
  const { isLoading, error, handleSignIn, handleSignUp } = useSchoolAuth();

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 via-white to-green-50 border-2 border-blue-200 shadow-xl">
      <SchoolAuthHeader />

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
            <SchoolSignInForm onSubmit={handleSignIn} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <SchoolSignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </CardContent>

      <SchoolAuthFooter />
    </Card>
  );
};

export default SchoolAuthCard;
