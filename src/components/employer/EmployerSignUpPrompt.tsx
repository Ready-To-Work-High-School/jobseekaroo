
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const EmployerSignUpPrompt = () => {
  const { user } = useAuth();

  // Don't show if user is already logged in
  if (user) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 my-12">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
        <CardDescription className="text-lg">
          Sign up now to access our student talent pool and start posting jobs today
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 max-w-md mx-auto">
          <Button asChild size="lg" className="gap-2">
            <Link to="/signup?type=employer">
              <UserPlus className="h-4 w-4" />
              Sign Up Now
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/sign-in">
              <LogIn className="h-4 w-4" />
              Already Have Account?
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Free to get started</span>
          <ArrowRight className="h-3 w-3" />
          <span>No setup fees</span>
          <ArrowRight className="h-3 w-3" />
          <span>Immediate access</span>
        </div>
        
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          By signing up, you agree to our terms of service and privacy policy. 
          All employers are verified to ensure student safety.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmployerSignUpPrompt;
