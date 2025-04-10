
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Book, GraduationCap, Users, Shield, Award, Clock, TrendingUp } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';
import { cn } from '@/lib/utils';

const FeaturesSection = () => {
  const fadeIn = useFadeIn(300);
  
  return (
    <section className={cn("py-16 bg-white", fadeIn)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500">
            For Students, Employers & Schools
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            JobSeekaroo brings together all parts of the career readiness ecosystem
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 md:gap-8 md:grid-cols-3 mb-12">
          {/* For Students */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                <Users className="h-5 w-5" /> For Students
              </h3>
              <p className="text-sm text-gray-700">
                A fun, safe, mobile-first app to land your first job
              </p>
            </div>
            
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-base">Safe Job Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All employers and job listings are pre-screened for safety and suitability for high school students.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-base">Skill Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn digital badges that showcase your skills and accomplishments to potential employers.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          {/* For Employers */}
          <div className="space-y-6">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <h3 className="text-xl font-bold text-amber-700 mb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5" /> For Employers
              </h3>
              <p className="text-sm text-gray-700">
                A fast lane to hire eager high schoolers with proven results
              </p>
            </div>
            
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <CardTitle className="text-base">Talent Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access a pool of motivated high school students with verified skills and credentials.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <CardTitle className="text-base">Simplified Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our platform streamlines the hiring process for part-time, seasonal, and entry-level positions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          {/* For Schools */}
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" /> For Schools
              </h3>
              <p className="text-sm text-gray-700">
                A partner tool to boost career readiness metrics
              </p>
            </div>
            
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Book className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-base">Work-Based Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complement your curriculum with real-world work experiences that reinforce classroom learning.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-base">Success Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get insights into student employment outcomes to demonstrate program effectiveness.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
