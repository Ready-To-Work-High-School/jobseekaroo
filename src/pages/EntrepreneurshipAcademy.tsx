
import { useFadeIn } from '@/utils/animations';
import Layout from '@/components/Layout';
import AcademyHeader from '@/components/programs/academy/AcademyHeader';
import AcademyDescription from '@/components/programs/academy/AcademyDescription';
import CourseCurriculum from '@/components/programs/academy/CourseCurriculum';
import ProgramBenefits from '@/components/programs/academy/ProgramBenefits';
import CredentialBadges from '@/components/auth/CredentialBadges';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Award, GraduationCap } from 'lucide-react';
import SectionSeparator from '@/components/home/SectionSeparator';

const EntrepreneurshipAcademy = () => {
  const contentAnimation = useFadeIn(300);
  
  return (
    <Layout>
      <div className={`w-full max-w-6xl mx-auto py-8 px-4 md:px-6 ${contentAnimation}`}>
        {/* Academy Header with Logo */}
        <AcademyHeader />
        
        {/* Academy Description */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
            Entrepreneurship Academy
          </h1>
          <AcademyDescription />
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <CourseCurriculum />
          <ProgramBenefits />
        </div>
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* Store Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">Entrepreneurship School Store</h2>
          <Card className="overflow-hidden border-amber-300 bg-amber-50/60">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="prose text-gray-700">
                  <p className="mb-4">
                    The Westside High School Entrepreneurship School Store provides students with real-world business experience through the management of daily operations, financial handling, and customer service.
                  </p>
                  
                  <p className="mb-4">
                    By running the store and working concessions at events, students are actively gaining valuable skills in sales, inventory management, and marketing. They are also enhancing their financial literacy by budgeting, tracking profits, and making informed business decisions.
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <Button className="bg-blue-700 hover:bg-blue-800" asChild>
                    <a href="mailto:ColemanP3@duvalschools.org">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Contact Store Manager
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Separator */}
        <SectionSeparator />
        
        {/* Industry Certifications Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
            <Award className="h-6 w-6 text-amber-500 mr-2" />
            Industry-Recognized Credentials
          </h2>
          <CredentialBadges />
        </div>
        
        {/* Contact Section */}
        <div className="mb-8">
          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <GraduationCap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Join Our Academy</h3>
                <p className="mb-4 text-gray-700">
                  Interested in applying to the Entrepreneurship Academy? Contact us to learn more about the application process and program requirements.
                </p>
                <Button className="bg-blue-700 hover:bg-blue-800" asChild>
                  <a href="mailto:ColemanP3@duvalschools.org">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Contact Academy Director
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </Layout>
  );
};

export default EntrepreneurshipAcademy;
