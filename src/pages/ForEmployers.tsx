
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Building, Briefcase, Medal, FileCheck, Phone, Calendar, Mail } from 'lucide-react';
import { useFadeIn, useSlideIn } from '@/utils/animations';

const ForEmployers = () => {
  const [activeTab, setActiveTab] = useState("benefits");
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
  
  const industries = [
    { name: "Retail", color: "bg-blue-100 text-blue-800" },
    { name: "Office Administration", color: "bg-amber-100 text-amber-800" },
    { name: "Food Service", color: "bg-green-100 text-green-800" },
    { name: "Customer Service", color: "bg-purple-100 text-purple-800" },
    { name: "Technology", color: "bg-red-100 text-red-800" },
    { name: "Healthcare", color: "bg-sky-100 text-sky-800" },
    { name: "Hospitality", color: "bg-pink-100 text-pink-800" },
    { name: "Logistics", color: "bg-indigo-100 text-indigo-800" }
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
        </div>
      </div>
      
      <div className={contentAnimation}>
        <Tabs defaultValue="benefits" className="max-w-4xl mx-auto mb-16" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="post-job">Post a Job</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>
          
          <TabsContent value="benefits" className="space-y-8">
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
            
            <div className="bg-secondary/30 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold mb-4">Industries Our Students Are Trained For</h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry, index) => (
                  <Badge key={index} className={industry.color}>
                    {industry.name}
                  </Badge>
                ))}
              </div>
            </div>
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
                    To post a job on our platform, please contact us directly. We'll work with you to create
                    a posting that attracts the right candidates for your position.
                  </p>
                </div>
                <div className="text-center">
                  <Button size="lg" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Contact to Post a Job
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
        <Button size="lg" asChild>
          <a href="mailto:Colemanp3@duvalschools.org" className="gap-2">
            <Mail className="h-4 w-4" />
            Contact Program Director
          </a>
        </Button>
      </div>
    </Layout>
  );
};

export default ForEmployers;
