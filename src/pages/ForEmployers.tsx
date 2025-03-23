
import Layout from '@/components/Layout';
import { Separator } from "@/components/ui/separator";
import EmployerHeader from '@/components/employer/EmployerHeader';
import EmployerTabs from '@/components/employer/EmployerTabs';
import CallToAction from '@/components/employer/CallToAction';
import { useFadeIn } from '@/utils/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Bot, Cloud, Database, Cpu, Globe } from 'lucide-react';

const ForEmployers = () => {
  const contentAnimation = useFadeIn(300);
  const curriculumAnimation = useFadeIn(500);
  
  return (
    <Layout>
      <EmployerHeader />
      
      <div className={contentAnimation}>
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8 border-blue-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Advanced Student Curriculum</h2>
              <p className="text-gray-700 mb-6">
                Westside High School students are gaining a competitive edge in the workforce before they even graduate through an advanced-level curriculum that covers Artificial Intelligence Foundations, Blockchain, Cloud Computing, Emerging Technologies, and the Internet of Things (IoT).
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Bot className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-center">AI Foundations</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Database className="h-6 w-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-center">Blockchain</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Cloud className="h-6 w-6 text-sky-600 mb-2" />
                  <span className="text-sm font-medium text-center">Cloud Computing</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Cpu className="h-6 w-6 text-indigo-600 mb-2" />
                  <span className="text-sm font-medium text-center">Emerging Tech</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Globe className="h-6 w-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-center">IoT</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Digital Credentials</h3>
              <p className="text-gray-700 mb-4">
                As they complete each learning path, students earn digital credentials from leading platforms, including:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">IBM</h4>
                    <p className="text-sm text-gray-600">Digital badges validating skills in emerging technologies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Everfi</h4>
                    <p className="text-sm text-gray-600">Certifications in financial literacy, data science, and workplace skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Florida Ready to Work</h4>
                    <p className="text-sm text-gray-600">Four credentials showcasing job readiness and employability skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium">Industry Certification in ESB</h4>
                    <p className="text-sm text-gray-600">Demonstrating expertise in business management and marketing</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700">
                By mastering these in-demand skills and earning industry-recognized credentials, students develop a strong foundation in current technology trends and gain practical, real-world expertise. Their hands-on experience and proven competencies make them highly valuable to employers, ready to contribute effectively and drive innovation from day one.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <EmployerTabs />
      </div>
      
      <Separator className="my-16" />
      
      <CallToAction />
    </Layout>
  );
};

export default ForEmployers;
