
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, Video, Download, ExternalLink, FileCheck, Briefcase, MessageSquare } from 'lucide-react';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import { cn } from '@/lib/utils';
import EducationalVideoSection from '@/components/resources/EducationalVideoSection';
import { useLocation } from 'react-router-dom';

const Resources = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam === 'credentials' ? "credentials" : "resume");
  const headerAnimation = useSlideIn(100);
  const contentAnimation = useFadeIn(300);
  
  useEffect(() => {
    if (tabParam === 'credentials') {
      setActiveTab("credentials");
    }
  }, [tabParam]);
  
  const resumeResources = [
    {
      title: "Resume Writing Guide",
      description: "Learn how to create a professional resume that highlights your skills and experience.",
      type: "PDF Guide",
      icon: FileText,
      action: "Download",
      url: "" // Added empty url
    },
    {
      title: "Resume Templates for High School Students",
      description: "Ready-to-use templates designed specifically for students with limited work experience.",
      type: "Templates",
      icon: FileCheck,
      action: "Download",
      url: "" // Added empty url
    },
    {
      title: "How to List Your Credentials",
      description: "Tips for effectively showcasing your Entrepreneurship Academy credentials.",
      type: "Article",
      icon: BookOpen,
      action: "Read",
      url: "" // Added empty url
    },
    {
      title: "Resume Review Checklist",
      description: "A comprehensive checklist to ensure your resume is complete and error-free.",
      type: "Checklist",
      icon: FileCheck,
      action: "Download",
      url: "" // Added empty url
    }
  ];
  
  const interviewResources = [
    {
      title: "Interview Preparation Video",
      description: "Essential tips and strategies to help you prepare for job interviews and make a great impression.",
      type: "Video",
      icon: Video,
      action: "Watch",
      url: "https://www.youtube.com/watch?v=ytckc4Gljlo"
    },
    {
      title: "Google Interview Warmup",
      description: "Practice interviewing with an interactive tool from Google that helps you prepare for interviews.",
      type: "Interactive Tool",
      icon: MessageSquare,
      action: "Use Tool",
      url: "https://grow.google/certificates/interview-warmup/"
    },
    {
      title: "Common Interview Questions",
      description: "Practice answering these frequently asked questions to prepare for your interviews.",
      type: "Guide",
      icon: MessageSquare,
      action: "View",
      url: "" // Added empty url
    },
    {
      title: "What to Wear to an Interview",
      description: "Guidelines for appropriate interview attire for different types of jobs.",
      type: "Article",
      icon: BookOpen,
      action: "Read",
      url: "" // Added empty url
    }
  ];
  
  const workplaceResources = [
    {
      title: "Workplace Etiquette Guide",
      description: "Essential tips for professional behavior in the workplace.",
      type: "PDF Guide",
      icon: FileText,
      action: "Download",
      url: "" // Added empty url
    },
    {
      title: "Time Management Skills",
      description: "Strategies for balancing school and work responsibilities.",
      type: "Article",
      icon: BookOpen,
      action: "Read",
      url: "" // Added empty url
    },
    {
      title: "Florida Ready to Work",
      description: "Learn essential employability skills to enhance your career readiness.",
      type: "External Resource",
      icon: ExternalLink,
      action: "Visit",
      url: "https://www.floridareadytowork.com/employability-skills"
    },
    {
      title: "Understanding Your First Paycheck",
      description: "A guide to reading your pay stub and understanding taxes and deductions.",
      type: "Guide",
      icon: FileText,
      action: "View",
      url: "" // Added empty url
    }
  ];
  
  const credentialResources = [
    {
      title: "What is ESB Certification?",
      description: "Learn about the Entrepreneurship & Small Business certification and its benefits.",
      type: "Video",
      icon: Video,
      action: "Watch",
      url: "https://www.youtube.com/watch?v=bjjLKdTgl6g"
    },
    {
      title: "Entrepreneurship & Small Business Certification Guide",
      description: "Information about the ESB certification and how to prepare for it.",
      type: "Guide",
      icon: Briefcase,
      action: "View",
      url: "" // Added empty url
    },
    {
      title: "Duval Ready Diploma Requirements",
      description: "Learn what you need to do to earn the Duval Ready Diploma designation.",
      type: "Checklist",
      icon: FileCheck,
      action: "Download",
      url: "" // Added empty url
    },
    {
      title: "Industry Credentials Overview",
      description: "A comprehensive list of industry credentials available through the academy.",
      type: "List",
      icon: FileText,
      action: "View",
      url: "" // Added empty url
    }
  ];

  const getActiveResources = () => {
    switch(activeTab) {
      case "resume": return resumeResources;
      case "interview": return interviewResources;
      case "workplace": return workplaceResources;
      case "credentials": return credentialResources;
      default: return resumeResources;
    }
  };

  return (
    <Layout>
      <div className={headerAnimation}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">
            Student Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access tools, guides, and resources to help you prepare for and succeed in your job search and career.
          </p>
        </div>
      </div>
      
      <div className={contentAnimation}>
        <Tabs defaultValue={activeTab} value={activeTab} className="max-w-5xl mx-auto mb-16" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto">
            <TabsTrigger value="resume">Resume Writing</TabsTrigger>
            <TabsTrigger value="interview">Interview Prep</TabsTrigger>
            <TabsTrigger value="workplace">Workplace Readiness</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{activeTab === "resume" ? "Resume Resources" : 
                activeTab === "interview" ? "Interview Resources" : 
                activeTab === "workplace" ? "Workplace Readiness" : 
                "Credential Resources"}</h2>
              
              {activeTab === "resume" && (
                <Button asChild>
                  <a href="/resume-assistant">Go to Resume Assistant</a>
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getActiveResources().map((resource, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-blue-100 mt-1">
                          <resource.icon className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{resource.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-4">
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0">
                    {resource.url ? (
                      <Button variant="outline" className="gap-2" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          {resource.action === "Download" ? <Download className="h-4 w-4" /> :
                           resource.action === "Watch" ? <Video className="h-4 w-4" /> :
                           resource.action === "Read" ? <BookOpen className="h-4 w-4" /> :
                           <ExternalLink className="h-4 w-4" />}
                          {resource.action}
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="gap-2">
                        {resource.action === "Download" ? <Download className="h-4 w-4" /> :
                         resource.action === "Watch" ? <Video className="h-4 w-4" /> :
                         resource.action === "Read" ? <BookOpen className="h-4 w-4" /> :
                         <ExternalLink className="h-4 w-4" />}
                        {resource.action}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </Tabs>
        
        <EducationalVideoSection />
        
        <Separator className="max-w-4xl mx-auto my-16" />
        
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Schedule a Meeting</CardTitle>
              <CardDescription>
                Get personalized assistance with your job search or career questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Schedule a one-on-one meeting with Ms. Coleman, our Entrepreneurship Academy director,
                for personalized guidance on your career path.
              </p>
              <Button variant="default" asChild>
                <a href="mailto:Colemanp3@duvalschools.org">
                  Request a Meeting
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
