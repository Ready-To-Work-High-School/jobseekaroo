
import Layout from '@/components/Layout';
import FreeForStudentsBadge from '@/components/badges/FreeForStudentsBadge';
import { Award, CheckCircle, Sparkles } from 'lucide-react';

const SkillDevelopment = () => {
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Skill Development</h1>
          <p className="text-lg mb-4 text-center max-w-3xl">
            Access to training resources and skill-building opportunities to help students prepare for the workforce.
          </p>
          <FreeForStudentsBadge variant="large" className="mt-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 student-card-hover">
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-amber-500 mr-2" />
              <h2 className="text-2xl font-semibold">What We Offer</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Interactive training modules focused on in-demand skills</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Personalized learning paths based on career interests</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Industry-recognized certifications and credentials</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>Hands-on practical exercises that build real-world experience</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 student-card-hover">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-semibold">How It Works</h2>
            </div>
            <p className="mb-4">
              Our skill development platform uses adaptive learning technology to identify your strengths and areas for improvement. 
              Based on your career interests and existing skillset, we create a customized learning journey to help you build the 
              competencies employers are looking for.
            </p>
            <div className="flex items-center mt-8">
              <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-sm font-medium flex items-center">
                <Sparkles className="h-4 w-4 mr-1.5 text-amber-600" />
                Free for Westside High School students
              </div>
            </div>
          </div>
        </div>
        
        <div className="prose max-w-none">
          <h2>Popular Skill Tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="student-card p-4 bg-blue-50 border-blue-200">
              <h3 className="text-lg font-medium text-blue-800">Communication</h3>
              <p className="text-sm text-blue-700">Professional writing, presentations, and interpersonal skills</p>
            </div>
            <div className="student-card p-4 bg-green-50 border-green-200">
              <h3 className="text-lg font-medium text-green-800">Technical Skills</h3>
              <p className="text-sm text-green-700">Software applications, data entry, and digital literacy</p>
            </div>
            <div className="student-card p-4 bg-purple-50 border-purple-200">
              <h3 className="text-lg font-medium text-purple-800">Customer Service</h3>
              <p className="text-sm text-purple-700">Client interaction, problem-solving, and service excellence</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center justify-center mb-2">
              <FreeForStudentsBadge variant="small" />
            </div>
            <p className="text-sm text-amber-800">
              All skill development resources are completely free for Westside High School students in the Entrepreneurship or Nursing Academy
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SkillDevelopment;
