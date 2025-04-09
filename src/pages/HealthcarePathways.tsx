
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, FileText, ExternalLink, Download, Heart } from 'lucide-react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';

const HealthcarePathways = () => {
  const fadeIn = useFadeIn(300);

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
              Pathways into Healthcare Careers Florida Program
            </h1>
            <div className="flex items-center justify-center gap-2">
              <img 
                src="/mayoclinic-logo.png" 
                alt="Mayo Clinic Logo" 
                className="h-8 mr-2" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.log('Mayo Clinic logo failed to load');
                }}
              />
              <p className="text-lg font-semibold">
                Hosted by the Mayo Clinic School of Health Sciences
              </p>
            </div>
            <Badge className="mt-4 bg-amber-600 hover:bg-amber-700">Summer 2025</Badge>
          </div>

          {/* Program Overview */}
          <Card className="mb-8 shadow-md border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50">
              <CardTitle className="text-xl text-blue-800">Program Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">
                This immersive three-day, in-person summer program is designed to introduce students 
                to the vast world of allied healthcare careers.
              </p>

              <h3 className="font-bold text-lg mt-6 mb-3">Program Highlights:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Open to high school and college students (and career changers!) in Jacksonville, FL</li>
                <li>Exposure to a wide range of healthcare careers beyond becoming a doctor or scientist</li>
                <li>Network with Mayo Clinic faculty and current students</li>
                <li>Free meals provided; no cost to attend</li>
                <li>Hosted on the Mayo Clinic campus in Jacksonville, FL</li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-md">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Program Dates & Times
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>July 10–12, 2025</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>8:00 a.m. – 3:00 p.m. daily</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Mayo Clinic – Jacksonville, FL</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="bg-amber-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-600" />
                  Application Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4">
                  <strong>Application Period:</strong> March 1 – May 15, 2025
                </p>
                <div className="flex flex-col gap-3 mt-4">
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700" asChild>
                    <a href="https://college.mayo.edu/academics/health-sciences-education/pathways-into-healthcare-careers-program-florida" target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="gap-2 border-amber-300 text-blue-700" asChild>
                    <a href="/pdf/healthcare-pathways-program.pdf" download>
                      Download Program PDF
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Why Consider a Healthcare Career */}
          <Card className="mb-8 shadow-md border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-amber-50">
              <CardTitle className="text-xl text-blue-800">Why Consider a Healthcare Career?</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">
                Healthcare careers offer stable employment, competitive salaries, opportunities for advancement,
                and the intrinsic reward of making a difference in people's lives. The healthcare field
                encompasses numerous career paths beyond doctors and nurses, including technologists,
                therapists, administrators, and support roles.
              </p>
              <p>
                This program by Mayo Clinic provides an excellent opportunity for students interested in our
                Medical Academy pathway to explore career options and make connections in the healthcare industry.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-10">
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700" size="lg" asChild>
              <a href="https://college.mayo.edu/academics/health-sciences-education/pathways-into-healthcare-careers-program-florida" target="_blank" rel="noopener noreferrer">
                Learn More and Apply
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HealthcarePathways;
