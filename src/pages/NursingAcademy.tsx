
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import WestsideAcademy from '@/components/programs/WestsideAcademy';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Award, Clock, Calendar, Check, MapPin, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionSeparator from '@/components/home/SectionSeparator';

const NursingAcademy = () => {
  const fadeIn = useFadeIn(300);
  const slideIn = useSlideIn(400);

  return (
    <Layout>
      {/* Hero Section */}
      <div className={`w-full bg-gradient-to-r from-red-600 via-red-500 to-pink-500 text-white py-16 ${slideIn}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Nursing Academy</h1>
            <p className="text-xl md:text-2xl mb-8">
              Prepare for a rewarding career in healthcare with industry-recognized nursing credentials
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                <Link to="/contact" className="flex items-center gap-2">
                  Enroll Now
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="#program-details" className="flex items-center gap-2">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Academy Information */}
      <section className={fadeIn}>
        <div className="container mx-auto px-4 py-12">
          <WestsideAcademy />
        </div>
      </section>
      
      {/* Program Details */}
      <section id="program-details" className={`py-16 bg-gray-50 ${fadeIn}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Program Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Certified Nursing Assistant (CNA) Pathway</h3>
              <p className="mb-6">
                Our Nursing Academy prepares students for careers in healthcare by providing comprehensive 
                training in nursing fundamentals, anatomy, physiology, and patient care. Students will have 
                the opportunity to earn their Certified Nursing Assistant (CNA) credential, which is highly 
                valued in the healthcare industry.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Program Duration</h4>
                    <p>1-2 years, depending on pathway selection</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Schedule</h4>
                    <p>Integrated into regular school curriculum with additional clinical hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p>Westside High School with partner healthcare facilities</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/32e451a9-4fe2-40b0-bfbc-15cfceea8d71.png" 
                alt="Nursing Academy Certification" 
                className="max-h-80 w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-red-500" />
                  Hands-on Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Gain practical experience through supervised clinical rotations at local 
                  healthcare facilities and our state-of-the-art simulation lab.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-red-500" />
                  Industry Certification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Prepare for and take the CNA certification exam, which is recognized 
                  across healthcare settings nationwide.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Career Pathways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Create a foundation for advanced nursing careers including LPN, RN, or 
                  specialized medical roles through our education partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Career Opportunities */}
      <section className={`py-16 ${fadeIn}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Career Opportunities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-xl mb-3 text-red-800">Hospitals</h3>
              <p>Work in various hospital departments providing direct patient care alongside registered nurses and physicians.</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-xl mb-3 text-red-800">Long-term Care</h3>
              <p>Assist elderly or chronically ill patients in nursing homes and rehabilitation centers with daily activities.</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-xl mb-3 text-red-800">Home Healthcare</h3>
              <p>Provide one-on-one care for patients in their homes, helping with medical needs and activities of daily living.</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-xl mb-3 text-red-800">Assisted Living</h3>
              <p>Support residents in assisted living facilities with medications, mobility, and healthcare monitoring.</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-xl mb-3 text-red-800">Clinics</h3>
              <p>Work in doctor's offices and outpatient clinics assisting with patient intake, vital signs, and procedures.</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-xl mb-3 text-red-800">Advanced Education</h3>
              <p>Use your CNA experience as a foundation to pursue advanced nursing degrees like LPN or RN.</p>
            </div>
          </div>
        </div>
      </section>
      
      <SectionSeparator className="my-4" />
      
      {/* Application & Enrollment */}
      <section className={`py-16 ${fadeIn}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Healthcare Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Applications for our Nursing Academy are now open. Contact us to learn more about 
            enrollment requirements and the application process.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
              <Link to="/contact" className="flex items-center gap-2">
                Apply Now
              </Link>
            </Button>
            
            <Button size="lg" variant="outline">
              <a href="mailto:ColemanP3@duvalschools.org" className="flex items-center gap-2">
                Contact Program Director
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NursingAcademy;
