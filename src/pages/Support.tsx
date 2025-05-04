
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, ShieldCheck, Briefcase, GraduationCap, AlertTriangle, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SupportFooter from '@/components/consent/SupportFooter';
import { useSlideIn, useFadeIn } from '@/utils/animations';

const Support = () => {
  const headerAnimation = useSlideIn(100);
  const contentAnimation = useFadeIn(300);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className={headerAnimation}>
          <h1 className="text-4xl font-bold mb-2 text-center">Support Center</h1>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Get help with your account, job applications, or technical issues. Our team is here to support you.
          </p>
        </div>

        <div className={contentAnimation}>
          <Tabs defaultValue="general" className="max-w-3xl mx-auto mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General Support</TabsTrigger>
              <TabsTrigger value="students">For Students</TabsTrigger>
              <TabsTrigger value="employers">For Employers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Support</CardTitle>
                  <CardDescription>
                    Get help with the platform, technical issues, or general questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-blue-100">
                      <Mail className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Email Support</h4>
                      <p className="text-muted-foreground mb-2">Our support team typically responds within 24 hours.</p>
                      <a 
                        href="mailto:support@jobseeker4hs.org" 
                        className="text-blue-600 hover:underline font-medium"
                      >
                        support@jobseeker4hs.org
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-blue-100">
                      <ShieldCheck className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Legal & Privacy Inquiries</h4>
                      <p className="text-muted-foreground mb-2">Questions about data privacy, terms, or legal matters.</p>
                      <a 
                        href="mailto:legal@jobseeker4hs.org" 
                        className="text-blue-600 hover:underline font-medium"
                      >
                        legal@jobseeker4hs.org
                      </a>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mt-6">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-yellow-800">Report an Issue</h5>
                        <p className="text-sm text-yellow-700">
                          If you encounter any technical issues, security concerns, or inappropriate content, 
                          please report it immediately to our support team.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="students" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Support</CardTitle>
                  <CardDescription>
                    Get help with your student account, applications, or program questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-blue-100">
                      <GraduationCap className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">School Program Support</h4>
                      <p className="text-muted-foreground mb-2">Questions about academy programs, eligibility, or school coordination.</p>
                      <a 
                        href="mailto:school@jobseeker4hs.org" 
                        className="text-blue-600 hover:underline font-medium"
                      >
                        school@jobseeker4hs.org
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-blue-100">
                      <ClipboardCheck className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Application Assistance</h4>
                      <p className="text-muted-foreground mb-2">Need help with your job applications? Our team can guide you.</p>
                      <a 
                        href="mailto:support@jobseeker4hs.org" 
                        className="text-blue-600 hover:underline font-medium"
                      >
                        support@jobseeker4hs.org
                      </a>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-2">
                    <h5 className="font-medium text-green-800 flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4" /> 
                      Academy Resources
                    </h5>
                    <p className="text-sm text-green-700 mt-1">
                      Remember that you can also reach out to your academy instructors and career counselors 
                      at Westside High School for additional support.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="employers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employer Support</CardTitle>
                  <CardDescription>
                    Get help with recruiting, posting jobs, or connecting with our programs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-blue-100">
                      <Briefcase className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Employer Relations</h4>
                      <p className="text-muted-foreground mb-2">For businesses looking to hire students or partner with our academies.</p>
                      <a 
                        href="mailto:hire@jobseeker4hs.org" 
                        className="text-blue-600 hover:underline font-medium"
                      >
                        hire@jobseeker4hs.org
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-full bg-blue-100">
                      <ShieldCheck className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Account Verification</h4>
                      <p className="text-muted-foreground mb-2">Need help verifying your employer account? Contact our team.</p>
                      <a 
                        href="mailto:support@jobseeker4hs.org" 
                        className="text-blue-600 hover:underline font-medium"
                      >
                        support@jobseeker4hs.org
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="max-w-3xl mx-auto">
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="grid gap-4 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How quickly can I expect a response?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our team typically responds to all inquiries within 24-48 hours during school days.
                    For urgent matters related to account security, please indicate "URGENT" in your email subject.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What information should I include when contacting support?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Please include your full name, student ID (if applicable), a detailed description of your issue,
                    and any relevant screenshots or error messages to help us assist you more efficiently.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is there in-person support available?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, students can seek in-person assistance through the Entrepreneurship Academy office 
                    at Westside High School during regular school hours.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-8 text-center mb-8">
              <h3 className="text-xl font-bold mb-4">Still Need Help?</h3>
              <p className="mb-6 max-w-xl mx-auto">
                If you couldn't find the information you need, please don't hesitate to reach out directly.
                Our team is committed to ensuring you have a positive experience with our platform.
              </p>
              <Button asChild>
                <a href="mailto:support@jobseeker4hs.org" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </a>
              </Button>
            </div>
            
            <SupportFooter />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
