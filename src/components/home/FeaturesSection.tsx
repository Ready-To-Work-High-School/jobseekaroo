
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Book, GraduationCap, Users } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Features for Student Success</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Resources and tools designed specifically for high school students entering the workforce.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Entry-Level Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Find positions specifically designed for students with little to no work experience.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-amber-600" />
              </div>
              <CardTitle>Skills Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access resources to build important workplace skills that employers value.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Career Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get advice on career paths that align with your interests and academic goals.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Employer Network</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with businesses that are actively looking to hire high school students.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
