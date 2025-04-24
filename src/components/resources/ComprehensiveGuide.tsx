
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ComprehensiveGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: [
        { 
          question: 'What is Job Seekers 4 HS?',
          answer: 'Job Seekers 4 HS is a platform designed to connect high school students with job opportunities, career resources, and skill development tools. It helps students prepare for their future careers while providing employers with access to young talent.'
        },
        { 
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Sign Up" button in the navigation bar. You\'ll need to provide your email address, create a password, and specify whether you\'re a student, employer, teacher, or school administrator. Follow the verification steps to complete your registration.'
        },
        { 
          question: 'What user types are available?',
          answer: 'The platform supports multiple user types including students, employers, teachers, school administrators, and counselors. Each user type has access to different features tailored to their specific needs.'
        },
        { 
          question: 'Is the platform free to use?',
          answer: 'The platform is completely free for students. Schools have access to basic features for free, while premium features require a subscription. Employers can post basic job listings for free, with premium features available for enhanced visibility and analytics.'
        }
      ]
    },
    {
      id: 'student-features',
      title: 'Student Features',
      content: [
        { 
          question: 'How do I search for jobs?',
          answer: 'Use the job search functionality on the homepage or navigate to the Jobs page. You can filter by location (ZIP code), distance, job type, and other criteria to find opportunities that match your preferences.'
        },
        { 
          question: 'How do I build a resume?',
          answer: 'Navigate to the Resume Assistant in the Resources section. The AI-powered tool will guide you through creating a professional resume tailored for high school students. You can select templates, add your skills and experiences, and export your completed resume.'
        },
        { 
          question: 'How do I track job applications?',
          answer: 'Go to the Applications page from your dashboard to view and manage all your job applications. You can see their status (applied, interviewing, offered, accepted, rejected), add notes, and track your progress.'
        },
        { 
          question: 'How do I develop my skills?',
          answer: 'Visit the Skill Development section to assess your current skills, identify skill gaps, and access learning resources. The platform offers guides, tutorials, and courses to help you develop career-ready skills.'
        },
        { 
          question: 'How do I prepare for interviews?',
          answer: 'Access the Interview Preparation resources in the Resources section. You\'ll find practice questions, video tutorials on interview techniques, and interactive mock interview simulations to help you prepare confidently.'
        },
        { 
          question: 'How do I get career guidance?',
          answer: 'Take the Career Quiz to discover career paths that match your interests and strengths. Explore industry insights and job simulations to get hands-on experience with different career options.'
        }
      ]
    },
    {
      id: 'employer-features',
      title: 'Employer Features',
      content: [
        { 
          question: 'How do I post a job?',
          answer: 'From your Employer Dashboard, click on "Post a New Job." Fill out the job details form including title, description, requirements, location, and other relevant information. Review and publish your listing to make it visible to students.'
        },
        { 
          question: 'How do I get verified as an employer?',
          answer: 'After creating an employer account, you\'ll need to complete the verification process. Provide your company details, business documentation, and contact information for review. Verification helps ensure a safe environment for students.'
        },
        { 
          question: 'How do I view applicants?',
          answer: 'Access the Applications tab in your Employer Dashboard to view all applications for your job postings. You can filter by job listing, sort by qualification metrics, and manage candidate communications.'
        },
        { 
          question: 'What analytics are available?',
          answer: 'Premium employer accounts have access to detailed analytics including application rates, demographic insights, engagement metrics, and performance comparisons to industry benchmarks.'
        },
        { 
          question: 'How do I communicate with applicants?',
          answer: 'Use the secure messaging system to communicate with applicants. Messages are moderated for safety, and you can schedule interviews, send updates, and provide feedback directly through the platform.'
        }
      ]
    },
    {
      id: 'school-features',
      title: 'School Features',
      content: [
        { 
          question: 'How do schools integrate with the platform?',
          answer: 'School administrators can integrate the platform with existing school systems through the School Integration page. This allows for class roster synchronization, assignment tracking, and student progress monitoring.'
        },
        { 
          question: 'How do teachers use the platform?',
          answer: 'Teachers can access the Teacher Dashboard to create and manage career development assignments, track student progress, and incorporate job readiness into their curriculum. Lesson plans and resources are available to support career education.'
        },
        { 
          question: 'What tools do counselors have?',
          answer: 'School counselors have specialized tools for career guidance, including student progress reports, career path recommendations based on student interests, and bulk account management for student onboarding.'
        },
        { 
          question: 'How do schools monitor student activity?',
          answer: 'The Analytics Dashboard provides insights into student engagement, skill development progress, application submission rates, and other metrics to help schools measure career readiness outcomes.'
        }
      ]
    },
    {
      id: 'safety-compliance',
      title: 'Safety & Compliance',
      content: [
        { 
          question: 'How does the platform ensure student safety?',
          answer: 'The platform incorporates multiple safety measures including employer verification, age-appropriate job filtering, parental consent requirements for younger students, and message moderation to ensure a safe experience.'
        },
        { 
          question: 'What privacy protections are in place?',
          answer: 'Student privacy is protected through FERPA and COPPA compliant data practices, controlled information sharing with employers, and transparent privacy settings that allow students and parents to manage their data.'
        },
        { 
          question: 'How are employers verified?',
          answer: 'Employers undergo a verification process that includes business documentation review, background checks for representatives interacting with students, and ongoing monitoring to ensure compliance with platform policies.'
        },
        { 
          question: 'What moderation policies are in effect?',
          answer: 'All job listings, messages, and content are subject to moderation policies designed to ensure appropriateness for high school students. Reporting mechanisms allow users to flag concerning content for review.'
        }
      ]
    },
    {
      id: 'technical-support',
      title: 'Technical Support',
      content: [
        { 
          question: 'How do I get help with technical issues?',
          answer: 'If you encounter technical difficulties, click on the Help icon in the navigation bar to access troubleshooting guides, submit a support ticket, or contact our support team directly.'
        },
        { 
          question: 'Can I use the platform on mobile devices?',
          answer: 'Yes, the platform is fully responsive and works on smartphones and tablets. You can access all features through your mobile browser without needing to install an app.'
        },
        { 
          question: 'What browsers are supported?',
          answer: 'The platform supports modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend keeping your browser updated to the latest version.'
        },
        { 
          question: 'How are system updates handled?',
          answer: 'System updates and maintenance are typically scheduled during low-usage periods and announced in advance. Critical security updates may occasionally be applied immediately to protect user data.'
        }
      ]
    },
    {
      id: 'premium-features',
      title: 'Premium Features',
      content: [
        { 
          question: 'What premium features are available for employers?',
          answer: 'Premium employer features include enhanced job visibility, detailed analytics, candidate matching algorithms, bulk job posting, branded company profiles, and priority support.'
        },
        { 
          question: 'What premium features are available for schools?',
          answer: 'Schools can access premium features including custom branding, API integrations with school information systems, advanced analytics, bulk student account management, and custom curriculum tools.'
        },
        { 
          question: 'How do I upgrade to a premium account?',
          answer: 'Navigate to the Premium Services page and select the appropriate plan for your needs. You\'ll be guided through the payment process and can immediately access premium features once the upgrade is complete.'
        }
      ]
    }
  ];
  
  // Filter sections and content based on search term
  const filteredSections = searchTerm.length > 0 
    ? sections.map(section => ({
        ...section,
        content: section.content.filter(item => 
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(section => section.content.length > 0)
    : sections;

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <h1 className="text-3xl font-bold mb-6">Complete Platform Guide</h1>
      <p className="text-muted-foreground mb-8">
        This comprehensive guide covers all features and functionalities of our platform, 
        designed to help you navigate and make the most of the available tools.
      </p>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search the guide..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="getting-started" className="mb-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex w-full mb-6 overflow-x-auto pb-2 justify-start">
            {sections.map(section => (
              <TabsTrigger key={section.id} value={section.id} className="whitespace-nowrap">
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {filteredSections.map(section => (
          <TabsContent key={section.id} value={section.id} className="focus-visible:outline-none focus-visible:ring-0">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {section.content.map((item, index) => (
                  <AccordionItem key={index} value={`${section.id}-item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm text-center text-muted-foreground">
          Can't find what you're looking for? Contact our support team at support@jobseekers4hs.com
        </p>
      </div>
    </div>
  );
};

export default ComprehensiveGuide;
