
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle, Building, Users, BarChart3, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import EmployerBenefits from '../EmployerBenefits';
import EmployerPremiumServices from '../premium/EmployerPremiumServices';
import LazyImage from '@/components/LazyImage';
import { getImageSizes } from '@/utils/imageUtils';
import EmployerKeyFeatures from './EmployerKeyFeatures';
import EmployerDirectAccessSection from './EmployerDirectAccessSection';

const UnauthenticatedEmployerView = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
        <p className="text-lg text-muted-foreground mb-2">Connect with qualified students and post job opportunities</p>
        <Badge variant="outline" className="bg-blue-50">Best-in-class talent matching platform</Badge>
      </div>
      
      <Card className="mb-10 border-primary/20 shadow-lg bg-gradient-to-b from-white to-blue-50">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="text-2xl text-center">Access Your Employer Dashboard</CardTitle>
          <CardDescription className="text-center">Sign in to access all employer features</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
            <Card className="bg-muted/50 border-blue-100 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Existing Employers</CardTitle>
                <CardDescription>Sign in to access your dashboard</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pb-8">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Resume matching technology</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Student skill assessments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Advanced analytics dashboard</span>
                  </li>
                </ul>
                <Button asChild size="lg" className="mt-2 w-full">
                  <Link to="/sign-in">Sign In</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5 border-primary/30 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>New Employers</CardTitle>
                  <Badge className="bg-amber-500 hover:bg-amber-500">Recommended</Badge>
                </div>
                <CardDescription>Create an account to get started</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pb-8">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>All standard features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>First job posting free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Premium analytics trial</span>
                  </li>
                </ul>
                <Button asChild size="lg" className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-700">
                  <Link to="/sign-up">Sign Up Free</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <EmployerKeyFeatures />
      
      <Separator className="my-10" />
      
      <EmployerDirectAccessSection />
      
      <EmployerBenefits />
    </div>
  );
};

export default UnauthenticatedEmployerView;
