
import Layout from '@/components/Layout';
import FreeForStudentsBadge from '@/components/badges/FreeForStudentsBadge';
import { FileText, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ResumeAssistant = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-center">Resume Building Assistant</h1>
          <p className="text-lg mb-4 text-center max-w-3xl">
            Dynamic resume creation tools with multiple templates and AI-assisted content suggestions tailored for high school students.
          </p>
          <FreeForStudentsBadge variant="large" className="mt-2" />
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Start Building Your Resume</h2>
              <p className="mb-4">
                Even with limited work experience, you can create a professional resume that showcases your skills, 
                education, and extracurricular activities.
              </p>
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-amber-800 font-medium">Free for all Westside High School students</span>
              </div>
            </div>
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Link to="/resume-builder">
                <FileText className="mr-2 h-5 w-5" />
                Create Your Resume
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold">Key Features</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Pre-designed templates optimized for entry-level positions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>AI-powered content suggestions based on your experiences</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Skills inventory builder to highlight your strengths</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Action verb recommendations to make your resume stand out</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Optimized formatting for both human readers and ATS systems</span>
              </li>
            </ul>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-2xl font-semibold">How It Works</h2>
            </div>
            <p className="mb-4">
              Our Resume Assistant guides you through the process of creating a professional resume even if you have limited work experience. 
              The system helps you identify transferable skills from your academic, extracurricular, and volunteer experiences that are 
              relevant to employers.
            </p>
            <p className="mb-4">
              Simply follow the step-by-step process, and in less than 30 minutes, you'll have a polished resume ready to share with potential employers.
            </p>
            <div className="student-accent-border">
              <h3 className="font-medium mb-1">Resume Review Service</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized feedback on your resume from career counselors - completely free for students.
              </p>
            </div>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <h2>Resume Template Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="student-card p-4">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 mb-2 rounded"></div>
              <h3 className="text-lg font-medium">Modern Template</h3>
              <p className="text-sm text-muted-foreground">Clean and contemporary design with bold headings</p>
            </div>
            <div className="student-card p-4">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 mb-2 rounded"></div>
              <h3 className="text-lg font-medium">Traditional Template</h3>
              <p className="text-sm text-muted-foreground">Classic layout preferred by conservative industries</p>
            </div>
            <div className="student-card p-4">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 mb-2 rounded"></div>
              <h3 className="text-lg font-medium">Creative Template</h3>
              <p className="text-sm text-muted-foreground">Eye-catching design for creative fields</p>
            </div>
          </div>
          
          <h2>Coming Soon</h2>
          <p>
            We're currently working on enhanced features for our Resume Assistant:
          </p>
          <ul>
            <li>LinkedIn profile integration</li>
            <li>Additional industry-specific templates</li>
            <li>Cover letter builder with matching templates</li>
            <li>Mock interview preparation based on your resume</li>
          </ul>
          <p>Check back soon for updates!</p>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center justify-center mb-2">
              <FreeForStudentsBadge variant="small" />
            </div>
            <p className="text-sm text-amber-800">
              All resume building tools are completely free for Westside High School students
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAssistant;
