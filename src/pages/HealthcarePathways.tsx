
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Calendar, MapPin, Clock, CheckCircle, ExternalLink, Award, GraduationCap, Heart } from 'lucide-react';

const HealthcarePathways = () => {
  return (
    <Layout>
      <Helmet>
        <title>Healthcare Pathways Programs | Job Seekers 4 High Schools</title>
        <meta name="description" content="Explore healthcare career pathways for high school students including Mayo Clinic Summer Program and Baptist Health Scholar Program." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Healthcare Pathways Programs</h1>
          <p className="text-muted-foreground mb-8">Exclusive opportunities for Westside High School students interested in healthcare careers.</p>
          
          {/* Mayo Clinic Section */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center shadow-sm">
                <img 
                  src="/lovable-uploads/e55c32f3-210d-417c-944a-dbdc67106fa5.png" 
                  alt="Mayo Clinic Logo" 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Mayo Clinic Summer Program</h2>
                <p className="text-muted-foreground">A prestigious summer experience at one of the world's leading healthcare organizations</p>
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Program Overview</h3>
                    <p className="mb-4">
                      The Mayo Clinic Summer Program offers Westside High School students a unique opportunity to gain hands-on healthcare experience at Mayo Clinic's Jacksonville campus. This paid internship is designed specifically for students in the Nursing Academy pathway.
                    </p>
                    <p>
                      Students will rotate through different departments, shadow healthcare professionals, and participate in educational workshops designed to build healthcare skills and knowledge.
                    </p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Program Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-amber-600" />
                        <span>June 15 - August 15, 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-600" />
                        <span>Monday-Friday, 8:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-amber-600" />
                        <span>Mayo Clinic, Jacksonville, FL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-amber-600" />
                        <span>Paid internship ($15/hour)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-bold mb-4">What You'll Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-5">
                  <CheckCircle className="h-6 w-6 text-amber-500 mb-2" />
                  <h4 className="font-semibold mb-2">Clinical Rotations</h4>
                  <p className="text-sm text-muted-foreground">
                    Experience various departments including emergency, pediatrics, and general care
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <CheckCircle className="h-6 w-6 text-amber-500 mb-2" />
                  <h4 className="font-semibold mb-2">Hands-on Training</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn essential healthcare skills under the guidance of experienced professionals
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <CheckCircle className="h-6 w-6 text-amber-500 mb-2" />
                  <h4 className="font-semibold mb-2">Research Exposure</h4>
                  <p className="text-sm text-muted-foreground">
                    Observe and assist in ongoing medical research projects at Mayo Clinic
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                <a href="/jobs/mayo-summer-program" className="flex items-center gap-2">
                  Apply Now <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Application deadline: May 1, 2025
              </p>
            </div>
          </div>
          
          <Separator className="my-16" />
          
          {/* Baptist Health Section */}
          <div id="baptist" className="pt-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center shadow-sm">
                <img 
                  src="/lovable-uploads/ffe236ca-51e1-4cd8-a3ff-c40be0234760.png" 
                  alt="Baptist Health Logo" 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Baptist Health Scholar Program</h2>
                <p className="text-muted-foreground">A year-long academic and clinical program with scholarship opportunities</p>
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Program Overview</h3>
                    <p className="mb-4">
                      The Baptist Health Scholar Program is designed for dedicated health academy students looking to build a long-term career in healthcare. This comprehensive program combines classroom learning with clinical exposure and mentorship over the course of the academic year.
                    </p>
                    <p>
                      Selected scholars receive a $5,000 scholarship applicable toward college education in a healthcare-related field, along with preferred consideration for Baptist Health's college internship programs.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Program Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span>September 1, 2025 - May 30, 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <span>After school and weekend sessions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span>Baptist Medical Center Jacksonville</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        <span>$5,000 college scholarship available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-bold mb-4">Program Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-5">
                  <GraduationCap className="h-6 w-6 text-blue-500 mb-2" />
                  <h4 className="font-semibold mb-2">College Scholarship</h4>
                  <p className="text-sm text-muted-foreground">
                    $5,000 scholarship for students pursuing healthcare degrees
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Heart className="h-6 w-6 text-blue-500 mb-2" />
                  <h4 className="font-semibold mb-2">Mentorship Program</h4>
                  <p className="text-sm text-muted-foreground">
                    One-on-one guidance from Baptist Health professionals
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <Briefcase className="h-6 w-6 text-blue-500 mb-2" />
                  <h4 className="font-semibold mb-2">Job Shadowing</h4>
                  <p className="text-sm text-muted-foreground">
                    Rotate through multiple healthcare specialties and departments
                  </p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-bold mb-4">Eligibility Requirements</h3>
            <Card className="mb-8">
              <CardContent className="p-6">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Currently enrolled in Westside High School Health Academy</li>
                  <li>Minimum 3.2 GPA</li>
                  <li>Letter of recommendation from a teacher</li>
                  <li>Demonstrated interest in pursuing a healthcare career</li>
                  <li>Available for scheduled program activities throughout the year</li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <a href="https://baptisthealth.com/education/high-school-programs" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                  Submit Application <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Application deadline: July 15, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HealthcarePathways;
