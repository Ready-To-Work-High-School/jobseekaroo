
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import WestsideAcademy from '@/components/programs/WestsideAcademy';
import EntrepreneurshipStoreSection from '@/components/programs/EntrepreneurshipStoreSection';
import CredentialBadges from '@/components/auth/CredentialBadges';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Briefcase, Award } from 'lucide-react';

const EntrepreneurshipAcademy = () => {
  const fadeIn = useFadeIn(300);
  const slideIn = useSlideIn(400);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={slideIn}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-blue-800">
                Entrepreneurship Academy at Westside High School
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Developing the next generation of business leaders and innovators
              </p>
            </div>
            
            <div className={fadeIn}>
              <Card className="bg-white/80 backdrop-blur border-amber-200 shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-4">
                    <div className="flex items-center gap-3 rounded-full bg-blue-50 px-4 py-2 border border-blue-100">
                      <GraduationCap className="h-5 w-5 text-blue-700" />
                      <span className="font-medium">Advanced Academy</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-full bg-amber-50 px-4 py-2 border border-amber-100">
                      <Briefcase className="h-5 w-5 text-amber-600" />
                      <span className="font-medium">Industry Certifications</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-full bg-green-50 px-4 py-2 border border-green-100">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="font-medium">College Credit</span>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    The Entrepreneurship Academy is a specialized program that provides students with real-world business experience,
                    industry-recognized certifications, and a pathway to college and career readiness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        {/* Academy Program Details */}
        <section className={fadeIn}>
          <div className="mb-12">
            <WestsideAcademy />
          </div>
        </section>
        
        <Separator className="my-16" />
        
        {/* School Store Section */}
        <section className={fadeIn}>
          <div className="mb-12">
            <EntrepreneurshipStoreSection />
          </div>
        </section>
        
        <Separator className="my-16" />
        
        {/* Credentials & Certifications */}
        <section className={fadeIn}>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Credentials & Certifications</h2>
            <CredentialBadges />
          </div>
        </section>
        
        <Separator className="my-16" />
        
        {/* Contact & Enrollment */}
        <section className={fadeIn}>
          <div className="bg-blue-50 rounded-xl p-8 mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Join Our Academy</h2>
              <p className="text-lg text-gray-700 mb-6">
                Interested in enrolling or learning more about our Entrepreneurship Academy? 
                Contact us today to schedule a visit or speak with our program coordinator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:ColemanP3@duvalschools.org" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Contact Program Coordinator
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EntrepreneurshipAcademy;
