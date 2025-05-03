
import React from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Calendar, MapPin, Clock, CheckCircle, ExternalLink } from 'lucide-react';

const MacquarieExternship = () => {
  return (
    <Layout>
      <Helmet>
        <title>Macquarie Leads Externship Program | Job Seekers 4 High Schools</title>
        <meta name="description" content="Apply to the competitive Macquarie Leads Externship Program for high school students interested in finance and investment banking careers." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center shadow-sm">
              <img 
                src="/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png" 
                alt="Macquarie Group Logo" 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Macquarie Leads Externship Program</h1>
              <p className="text-muted-foreground">A premier finance industry experience for high school students</p>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Program Overview</h2>
                  <p className="mb-4">
                    The Macquarie Leads Externship is a competitive program offering students a 1-2 week observational 
                    experience at Macquarie Group. Participants shadow professionals in finance, investment banking, 
                    and related fields.
                  </p>
                  <p>
                    The program provides valuable industry insights, networking opportunities, and potential 
                    pathways to future internships and careers in the financial sector.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Program Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span>July 15 - July 30, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span>Monday-Friday, 9:00 AM - 3:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span>Macquarie Group, Jacksonville Financial District</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-green-600" />
                      <span>Unpaid, observation-focused externship</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-4">What You'll Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-5">
                <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
                <h3 className="font-semibold mb-2">Shadow Financial Professionals</h3>
                <p className="text-sm text-muted-foreground">
                  Observe daily operations of investment managers, analysts, and bankers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
                <h3 className="font-semibold mb-2">Market Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about financial markets, investment strategies, and business models
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
                <h3 className="font-semibold mb-2">Career Exposure</h3>
                <p className="text-sm text-muted-foreground">
                  Discover various career paths in finance and requirements for each
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Eligibility Requirements</h2>
          <Card className="mb-8">
            <CardContent className="p-6">
              <ul className="list-disc pl-5 space-y-2">
                <li>Currently enrolled in Westside High School Entrepreneurship Academy</li>
                <li>Completed at least one business or finance course</li>
                <li>Minimum 3.0 GPA</li>
                <li>Interest in finance, business, or economics</li>
                <li>Available for the full duration of the program</li>
              </ul>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
            <p className="mb-6 max-w-xl mx-auto">
              Applications are reviewed on a rolling basis. Early application is recommended as spots are limited.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <a href="https://extern.com/externships/macquarie-leads" className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                Submit Application <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Application deadline: May 31, 2025
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MacquarieExternship;
