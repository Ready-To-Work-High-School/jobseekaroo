import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Compass, FileText, CheckCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import FreeForStudentsBadge from '@/components/badges/FreeForStudentsBadge';
import FirstJobToolkitContent from '@/components/students/FirstJobToolkitContent';

const FirstJobToolkit = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold mb-4">First Job Toolkit</h1>
        <p className="text-lg text-center text-muted-foreground max-w-3xl mb-4">
          Everything you need to prepare for and succeed in your first job experience.
          Build essential skills, create professional documents, and navigate workplace challenges with confidence.
        </p>
        <FreeForStudentsBadge variant="large" className="mt-2" />
      </div>

      {/* Main toolkit content */}
      <FirstJobToolkitContent />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 mt-12">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Compass className="h-6 w-6 text-indigo-600 mr-2" />
            Toolkit Components
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>Resume and cover letter templates optimized for first-time job seekers</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>Interview preparation guides with practice questions and answers</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>Workplace communication and professionalism skills training</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>First day preparation checklist and essential workplace etiquette</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BookOpen className="h-6 w-6 text-purple-600 mr-2" />
            Why This Toolkit?
          </h2>
          <p className="mb-4">
            The transition from school to your first job can be challenging. Our toolkit provides 
            step-by-step guidance developed with input from employers who regularly hire first-time 
            workers from Westside High School.
          </p>
          <p className="mb-4">
            All resources are tailored to the specific needs of high school students entering 
            the workforce for the first time, with practical advice that you can immediately apply.
          </p>
          <div className="mt-6">
            <Button className="bg-indigo-600 hover:bg-indigo-700" asChild>
              <Link to="/resources">
                Explore All Resources
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">Toolkit Sections</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="ml-3 font-semibold">Application Materials</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Create professional resumes, cover letters, and job application documents.
            </p>
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link to="/resume-assistant">Resume Builder</Link>
            </Button>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="ml-3 font-semibold">Interview Preparation</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Practice interviews, prepare answers, and build confidence for your interviews.
            </p>
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link to="/interview-prep">Interview Practice</Link>
            </Button>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Compass className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="ml-3 font-semibold">Workplace Skills</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Learn essential workplace communication, time management, and professionalism.
            </p>
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link to="/skill-development">Skill Building</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Ready to Get Started?</h2>
        <p className="text-center mb-6">
          Access all the resources you need to prepare for your first job. Our toolkit is 
          completely free for Westside High School students.
        </p>
        <div className="flex justify-center">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" asChild>
            <Link to="/resources">
              Access First Job Toolkit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FirstJobToolkit;
