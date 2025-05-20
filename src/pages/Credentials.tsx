
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, BookOpen, Check } from 'lucide-react';
import SectionSeparator from '@/components/home/SectionSeparator';

const Credentials = () => {
  const fadeIn = useFadeIn(300);

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-12 ${fadeIn}`}>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Industry-Recognized Credentials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Westside High School offers pathways to earn valuable credentials that are recognized by employers across industries.
          </p>
        </div>

        {/* Credentials Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Entrepreneurship & Small Business */}
          <Card className="shadow-md hover:shadow-lg transition-all border-amber-200">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-600" />
                Entrepreneurship & Small Business
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/9babf5b8-1235-48d8-8e19-a555efbf5102.png" 
                  alt="ESB Certification" 
                  className="h-28 w-auto object-contain"
                />
              </div>
              <p className="mb-4">Certiport's Entrepreneurship and Small Business certification demonstrates critical knowledge for developing a business plan and key business concepts.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Nationally recognized credential</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Validates business fundamentals</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* IBM SkillsBuild */}
          <Card className="shadow-md hover:shadow-lg transition-all border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                IBM SkillsBuild
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/898ea22e-1f00-4da4-92db-b78adabc702a.png" 
                  alt="IBM SkillsBuild" 
                  className="h-28 w-auto object-contain"
                />
              </div>
              <p className="mb-4">Earn digital credentials through IBM's SkillsBuild platform for in-demand technology skills.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Professional tech credentials</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Digital badges for your portfolio</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Florida Ready to Work */}
          <Card className="shadow-md hover:shadow-lg transition-all border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Florida Ready to Work
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png" 
                  alt="Florida Ready to Work" 
                  className="h-28 w-auto object-contain"
                />
              </div>
              <p className="mb-4">The Florida Ready to Work program certifies that you have the foundational skills needed to succeed in today's rapidly changing workplace.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>State-recognized workforce credential</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Validates workplace essentials</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <SectionSeparator className="my-8" />

        {/* Credential Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Benefits of Industry Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-4">For Students</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <span>Stand out to employers with verified skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <span>Gain hands-on experience in your chosen field</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <span>Access specialized job opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <span>Build a professional portfolio</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-red-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-4">For Employers</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <span>Connect with pre-trained, qualified students</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <span>Verify skills with industry-standard certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <span>Reduce training costs and onboarding time</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <span>Support educational partnerships in the community</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">Contact us to learn more about our credential programs and how to enroll.</p>
          <a href="mailto:ColemanP3@duvalschools.org" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors">
            Contact Us Today
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Credentials;
