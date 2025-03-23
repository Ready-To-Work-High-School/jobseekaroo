
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import WestsideAcademy from '@/components/programs/WestsideAcademy';
import EntrepreneurshipStoreSection from '@/components/programs/EntrepreneurshipStoreSection';
import CredentialBadges from '@/components/auth/CredentialBadges';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Briefcase, Award, Sparkles, Cpu } from 'lucide-react';
import ProgramCards from '@/components/programs/ProgramCards';

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
      
      {/* New Competitive Edge Section */}
      <section className="py-12 bg-gradient-to-r from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Competitive Edge in the Workforce</h2>
                <p className="text-lg text-gray-700 mb-4">
                  Westside High School students are gaining a competitive edge in the workforce before they even graduate through an 
                  advanced-level curriculum that covers Entrepreneurship which may lead to Industry Certification curriculum.
                </p>
                <p className="text-lg text-gray-700">
                  Students also learn and earn digital credentials for emerging 21st century technology trends:
                </p>
              </div>
              
              <div className="md:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3">
                    <Cpu className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Artificial Intelligence Foundations</h3>
                      <p className="text-sm text-gray-600">Understanding AI principles and applications</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3">
                    <svg className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 16V8H17V16H7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">Blockchain</h3>
                      <p className="text-sm text-gray-600">Exploring distributed ledger technologies</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3">
                    <svg className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12C22 15.3137 19.3137 18 16 18C12.6863 18 10 15.3137 10 12C10 8.68629 12.6863 6 16 6C19.3137 6 22 8.68629 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 18C5.23858 18 3 15.7614 3 13C3 10.2386 5.23858 8 8 8C9.56719 8 10.9672 8.70142 11.8945 9.80545" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">Cloud Computing</h3>
                      <p className="text-sm text-gray-600">Learning cloud services and infrastructure</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Emerging Technologies</h3>
                      <p className="text-sm text-gray-600">Staying ahead with cutting-edge tech</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-sky-100 flex items-start gap-3 sm:col-span-2">
                    <svg className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12.5C5 11.1193 6.11929 10 7.5 10C8.88071 10 10 11.1193 10 12.5C10 13.8807 8.88071 15 7.5 15C6.11929 15 5 13.8807 5 12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16.5 6.5C16.5 5.11929 17.6193 4 19 4C20.3807 4 21.5 5.11929 21.5 6.5C21.5 7.88071 20.3807 9 19 9C17.6193 9 16.5 7.88071 16.5 6.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 12.5H14M14 12.5V8M14 12.5L9 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">Internet of Things (IoT)</h3>
                      <p className="text-sm text-gray-600">Connecting and automating the physical world through digital technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        {/* Program Cards */}
        <section className={fadeIn}>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Our Programs</h2>
            <ProgramCards />
          </div>
        </section>
        
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
