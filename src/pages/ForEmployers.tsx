
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import CredentialBadges from '@/components/auth/CredentialBadges';
import { 
  Building, 
  Briefcase, 
  Medal, 
  FileCheck, 
  Phone, 
  Calendar, 
  Mail, 
  ExternalLink,
  FileText,
  Users,
  MessageCircle,
  Award,
  LineChart,
  Share2
} from 'lucide-react';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import { useIsMobile } from '@/hooks/use-mobile';

const ForEmployers = () => {
  const [activeTab, setActiveTab] = useState("benefits");
  const isMobile = useIsMobile();
  const headerAnimation = useSlideIn(100);
  const contentAnimation = useFadeIn(300);
  
  const benefits = [
    {
      title: "Pre-trained Workforce",
      description: "Access students with verified skills and industry-recognized credentials.",
      icon: Medal
    },
    {
      title: "Specialized Training",
      description: "Students have received education in business fundamentals, entrepreneurship, and professional skills.",
      icon: FileCheck
    },
    {
      title: "Ready to Work",
      description: "Students can start immediately with flexible schedules around their education.",
      icon: Calendar
    },
    {
      title: "Direct Connection",
      description: "Work directly with the academy to find the best candidates for your positions.",
      icon: Phone
    }
  ];
  
  const employerBenefits = [
    {
      title: "Company Profile",
      description: "Create and customize your company profile to showcase your brand and culture to students.",
      icon: Building
    },
    {
      title: "Job Listings",
      description: "Post unlimited job listings with detailed descriptions and requirements.",
      icon: FileText
    },
    {
      title: "Applicant Management",
      description: "Review applicants through our streamlined candidate management system.",
      icon: Users
    },
    {
      title: "Interview Scheduling",
      description: "Schedule interviews directly through our integrated calendar.",
      icon: Calendar
    },
    {
      title: "Candidate Messaging",
      description: "Message candidates to coordinate hiring details.",
      icon: MessageCircle
    },
    {
      title: "Apprenticeship Programs",
      description: "Offer apprenticeships and training programs to develop student talents.",
      icon: Award
    },
    {
      title: "Performance Analytics",
      description: "Access analytics on job posting performance and candidate engagement.",
      icon: LineChart
    },
    {
      title: "Career Events",
      description: "Participate in career events and connect with promising students.",
      icon: Share2
    }
  ];

  return (
    <Layout>
      <div className={headerAnimation}>
        <div className="text-center mb-12">
          <Badge variant="outline" className="border-amber-500 text-amber-700 mb-4">
            For Businesses & Organizations
          </Badge>
          <h1 className="text-4xl font-bold mb-6">
            Hire Trained Students with Verified Skills
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with Westside High School's Entrepreneurship Academy to find pre-trained students
            with industry-recognized credentials who are ready to join your workforce.
          </p>
          
          <div className="mt-8">
            <Button asChild size="lg" className="gap-2">
              <Link to="/employer-dashboard">
                Access Employer Dashboard
                <ExternalLink className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Post jobs and manage applications in one place
            </p>
          </div>
        </div>
      </div>
      
      <div className={contentAnimation}>
        <Tabs defaultValue="benefits" className="max-w-4xl mx-auto mb-16" onValueChange={setActiveTab}>
          <TabsList className={`grid grid-cols-${isMobile ? '2' : '3'} mb-8`}>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="post-job">Post a Job</TabsTrigger>
            {!isMobile && <TabsTrigger value="contact">Contact Us</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="benefits" className="space-y-8">
            {/* What You'll Get Access To Section */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">What You'll Get Access To</CardTitle>
                <CardDescription>
                  Our employer portal provides powerful tools to find and hire qualified students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {employerBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <benefit.icon className="h-6 w-6 text-blue-700" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Credential Badges Section - Replacing Industries Section */}
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <CardTitle className="text-blue-800">Student Credentials & Certifications</CardTitle>
                <CardDescription>
                  Our students earn industry-recognized credentials that validate their skills and knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <CredentialBadges />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="post-job">
            <Card>
              <CardHeader>
                <CardTitle>Post a Position</CardTitle>
                <CardDescription>
                  Complete the form below to post a job opportunity for our students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 text-center">
                  <p className="text-amber-800 font-medium">
                    Use our employer dashboard to post job opportunities for our students.
                    The dashboard lets you manage applications and communicate with candidates.
                  </p>
                </div>
                <div className="text-center">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/employer-dashboard">
                      Access Employer Dashboard
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
                <CardDescription>
                  Contact us to learn more about our program and how to connect with our students.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Building className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Westside High School Entrepreneurship Academy</h4>
                    <p className="text-muted-foreground">Jacksonville, Florida</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Mail className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:Colemanp3@duvalschools.org" className="text-blue-600 hover:underline">
                      Colemanp3@duvalschools.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Briefcase className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Program Director</h4>
                    <p className="text-muted-foreground">Ms. Pamela Coleman</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Separator className="my-16" />
      
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Ready to Connect with Our Students?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Our students are eager to apply their skills and learning in real-world settings.
          Connect with us today to find your next great hire.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/employer-dashboard" className="gap-2">
              <Briefcase className="h-4 w-4" />
              Post a Job
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="mailto:Colemanp3@duvalschools.org" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact Us
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ForEmployers;
