
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Briefcase, User, Award, Heart, Video, MessageSquare } from 'lucide-react';
import FreeForStudentsBadge from '@/components/badges/FreeForStudentsBadge';

const Resources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Student Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-4">
            Tools and resources to help you prepare for and succeed in your career journey
          </p>
          <FreeForStudentsBadge variant="large" className="mt-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resume Building */}
          <Card className="hover:shadow-md transition-shadow student-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Resume Building
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Create a professional resume with our guided tools and templates</p>
              <Link to="/resume-assistant" className="text-blue-600 hover:underline">
                Resume Assistant →
              </Link>
            </CardContent>
          </Card>
          
          {/* Job Application Help */}
          <Card className="hover:shadow-md transition-shadow student-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-amber-600" />
                Job Application Help
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Tips and guidance for submitting successful job applications</p>
              <Link to="/job-help" className="text-blue-600 hover:underline">
                Application Resources →
              </Link>
            </CardContent>
          </Card>
          
          {/* Interview Preparation */}
          <Card className="hover:shadow-md transition-shadow student-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-green-600" />
                Interview Preparation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Practice interviews and learn how to answer common questions</p>
              <Link to="/interview-prep" className="text-blue-600 hover:underline">
                Interview Resources →
              </Link>
            </CardContent>
          </Card>
          
          {/* Skill Development */}
          <Card className="hover:shadow-md transition-shadow student-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-purple-600" />
                Skill Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Build essential skills that employers are looking for</p>
              <Link to="/skill-development" className="text-blue-600 hover:underline">
                Skill Resources →
              </Link>
            </CardContent>
          </Card>
          
          {/* Healthcare Pathways */}
          <Card className="hover:shadow-md transition-shadow student-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Healthcare Pathways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Discover opportunities in the healthcare industry</p>
              <Link to="/healthcare-pathways" className="text-blue-600 hover:underline">
                Healthcare Resources →
              </Link>
            </CardContent>
          </Card>
          
          {/* Communication Tools */}
          <Card className="hover:shadow-md transition-shadow student-card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
                Communication Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Learn how to communicate effectively in professional settings</p>
              <Link to="/communication" className="text-blue-600 hover:underline">
                Communication Resources →
              </Link>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto text-center p-6 bg-amber-50 rounded-lg border border-amber-100 student-section-bg">
          <h2 className="text-2xl font-bold mb-2">Free Access for All Students</h2>
          <p className="mb-4">
            All resources on this platform are provided free of charge to Westside High School students 
            enrolled in the Entrepreneurship or Nursing Academy.
          </p>
          <div className="flex justify-center">
            <FreeForStudentsBadge />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
