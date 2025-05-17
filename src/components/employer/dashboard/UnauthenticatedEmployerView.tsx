
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Users, ChevronRight } from 'lucide-react';

const UnauthenticatedEmployerView = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Employer Portal</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with qualified high school students looking for work experience.
          Sign in or create an account to manage job postings, review applications, and more.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button asChild size="lg">
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/signup">Create Employer Account</Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Why Choose Our Platform
          </CardTitle>
          <CardDescription>
            Connect with the next generation of talent
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">Qualified Candidates</h3>
              <p className="text-sm text-muted-foreground">
                Access students specifically focused on career readiness
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">School Partnerships</h3>
              <p className="text-sm text-muted-foreground">
                Direct connection to high school career programs
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold">Simplified Recruitment</h3>
              <p className="text-sm text-muted-foreground">
                Easy-to-use tools for posting jobs and managing applications
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthenticatedEmployerView;
