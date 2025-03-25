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
      action: "Download"
    },
    {
      title: "Resume Templates for High School Students",
      description: "Ready-to-use templates designed specifically for students with limited work experience.",
      type: "Templates",
      icon: FileCheck,
      action: "Download"
    },
    {
      title: "How to List Your Credentials",
      description: "Tips for effectively showcasing your Entrepreneurship Academy credentials.",
      type: "Article",
      icon: BookOpen,
      action: "Read"
    },
    {
      title: "Resume Review Checklist",
      description: "A comprehensive checklist to ensure your resume is complete and error-free.",
      type: "Checklist",
      icon: FileCheck,
      action: "Download"
    }
  ];
  
  const interviewResources = [
    {
      title: "Common Interview Questions",
      description: "Practice answering these frequently asked questions to prepare for your interviews.",
      type: "Guide",
      icon: MessageSquare,
      action: "View"
    },
    {
      title: "Interview Preparation Video",
      description: "Watch this video for tips on how to make a great impression during your interview.",
      type: "Video",
      icon: Video,
      action: "Watch"
    },
    {
      title: "What to Wear to an Interview",
      description: "Guidelines for appropriate interview attire for different types of jobs.",
      type: "Article",
      icon: BookOpen,
      action: "Read"
    },
    {
      title: "After the Interview: Follow-up Tips",
      description: "Learn how to follow up professionally after your interview.",
      type: "Guide",
      icon: FileText,
      action: "Read"
    }
  ];
  
  const workplaceResources = [
    {
      title: "Workplace Etiquette Guide",
      description: "Essential tips for professional behavior in the workplace.",
      type: "PDF Guide",
      icon: FileText,
      action: "Download"
    },
    {
      title: "Time Management Skills",
      description: "Strategies for balancing school and work responsibilities.",
      type: "Article",
      icon: BookOpen,
      action: "Read"
    },
    {
      title: "Communication in the Workplace",
      description: "How to communicate effectively with colleagues and supervisors.",
      type: "Video",
      icon: Video,
      action: "Watch"
    },
    {
      title: "Understanding Your First Paycheck",
      description: "A guide to reading your pay stub and understanding taxes and deductions.",
      type: "Guide",
      icon: FileText,
      action: "View"
    }
  ];
  
  const credentialResources = [
    {
      title: "Entrepreneurship & Small Business Certification Guide",
      description: "Information about the ESB certification and how to prepare for it.",
      type: "Guide",
      icon: Briefcase,
      action: "View"
    },
    {
      title: "Duval Ready Diploma Requirements",
      description: "Learn what you need to do to earn the Duval Ready Diploma designation.",
      type: "Checklist",
      icon: FileCheck,
      action: "Download"
    },
    {
      title: "Industry Credentials Overview",
      description: "A comprehensive list of industry credentials available through the academy.",
      type: "List",
      icon: FileText,
      action: "View"
    },
    {
      title: "How Credentials Boost Your Career",
      description: "Understand how industry credentials can give you an advantage in the job market.",
      type: "Article",
      icon: BookOpen,
      action: "Read"
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
                    <Button variant="outline" className="gap-2">
                      {resource.action === "Download" ? <Download className="h-4 w-4" /> :
                       resource.action === "Watch" ? <Video className="h-4 w-4" /> :
                       resource.action === "Read" ? <BookOpen className="h-4 w-4" /> :
                       <ExternalLink className="h-4 w-4" />}
                      {resource.action}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </Tabs>
        
        <EducationalVideoSection />
        
        <Separator className="max-w-4xl mx-auto my-16" />
        
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            
            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
                <CardDescription>
                  External resources to help with your job search and career development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                    <a href="https://www.careeronestop.org/getmyfuture" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      CareerOneStop Youth Resources
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                    <a href="https://www.dol.gov/agencies/odep/program-areas/youth" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Youth Employment Resources
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                    <a href="https://www.mynextmove.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      My Next Move Career Exploration
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
