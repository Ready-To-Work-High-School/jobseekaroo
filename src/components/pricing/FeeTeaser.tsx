
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, DollarSign, BadgeDollarSign } from 'lucide-react';

const FeeTeaser: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/30 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 mb-2">
            <BadgeDollarSign className="h-5 w-5 text-amber-500" />
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
          </span>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your needs — whether you're an employer, a school, or a student.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 border-blue-100 dark:border-blue-900/50">
            <CardHeader>
              <CardTitle>Basic</CardTitle>
              <div className="text-3xl font-bold">$0</div>
              <CardDescription>Perfect for students</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Create student profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Apply to all jobs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Track applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Basic skills assessment</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/sign-up">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Standard Plan */}
          <Card className="border-2 border-primary relative">
            <div className="absolute -top-3 right-4">
              <Badge className="bg-amber-500 hover:bg-amber-600">Most Popular</Badge>
            </div>
            <CardHeader>
              <CardTitle>Standard</CardTitle>
              <div className="text-3xl font-bold">$29.99<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <CardDescription>For employers posting jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Post up to 10 jobs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Employer profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Advanced filtering</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Application tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Basic analytics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700" asChild>
                <Link to="/pricing">Choose Standard</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-amber-200 bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-900/10 dark:to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Premium
                <Sparkles className="h-5 w-5 text-amber-500" />
              </CardTitle>
              <div className="text-3xl font-bold">$79.99<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <CardDescription>Complete solution for employers</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Unlimited job postings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Featured job listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Applicant skills matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Premium support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50" asChild>
                <Link to="/pricing">Choose Premium</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Need a custom plan for your organization?</p>
          <Button variant="ghost" className="group" asChild>
            <Link to="/contact" className="flex items-center gap-2">
              Contact us for custom pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeeTeaser;
