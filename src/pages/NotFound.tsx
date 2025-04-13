
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Briefcase, FileText, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[50vh] flex flex-col justify-center items-center py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">404</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">Page not found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go back home
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse jobs
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View resources
            </Link>
          </div>
        </div>
      </div>
      
      {/* Job Seeker Resources Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-8 mt-8">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold mb-6 text-center">Job Seeker Resources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-medium">Resume Building</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Create professional resumes with our templates and AI assistance.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/resume-assistant">Build Your Resume</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Book className="h-5 w-5 text-amber-600" />
                  </div>
                  <h4 className="font-medium">Interview Prep</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice common interview questions and get expert tips.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/interview-prep">Prepare Now</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="font-medium">Job Search</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Browse and apply to jobs matching your skills and interests.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to="/jobs">Find Jobs</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
