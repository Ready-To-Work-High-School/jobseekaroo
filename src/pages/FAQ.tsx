import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Search, Shield, Lock, Database } from 'lucide-react';
import { useFadeIn, useSlideIn } from '@/utils/animations';

const FAQ = () => {
  const headerAnimation = useSlideIn(100);
  const contentAnimation = useFadeIn(300);
  
  const studentFAQs = [
    {
      question: "Who is eligible to use this job platform?",
      answer: "This platform is specifically designed for students enrolled in Westside High School's Entrepreneurship Academy. If you're currently enrolled, you have full access to all job opportunities and resources."
    },
    {
      question: "What types of jobs can I find on this platform?",
      answer: "You can find a variety of entry-level positions suitable for high school students, including retail, customer service, office administration, food service, and more. All jobs are vetted to ensure they're appropriate for students."
    },
    {
      question: "How do I create an effective resume?",
      answer: "Use our Resume Assistant tool, which will guide you through creating a professional resume. Include your education, any credentials earned through the Entrepreneurship Academy, volunteer experience, and relevant skills."
    },
    {
      question: "Can I work while attending school?",
      answer: "Yes! Most jobs on our platform offer flexible hours that can accommodate your school schedule. Many employers specifically look for part-time student workers and understand academic commitments."
    },
    {
      question: "What credentials can I earn through the Entrepreneurship Academy?",
      answer: "Students can earn various credentials including the Entrepreneurship and Small Business certification, industry-specific certifications, and the Duval Ready Diploma designation."
    },
    {
      question: "How do I prepare for a job interview?",
      answer: "Check our Resources page for interview preparation tips. Practice common interview questions, research the company, prepare professional attire, and arrive early. The academy also offers mock interview sessions."
    }
  ];
  
  const employerFAQs = [
    {
      question: "How do I post a job opportunity?",
      answer: "Contact our Department Chair directly at Colemanp3@duvalschools.org to post a job opportunity. We'll work with you to create an effective listing that reaches our qualified students."
    },
    {
      question: "What skills do students from the Entrepreneurship Academy have?",
      answer: "Our students receive training in business fundamentals, customer service, professional communication, basic office technologies, and industry-specific skills. Many hold industry-recognized credentials that verify their competencies."
    },
    {
      question: "What are the benefits of hiring students from your program?",
      answer: "You'll access pre-trained candidates with verified skills, benefit from their fresh perspectives and enthusiasm, fulfill community engagement goals, and potentially develop long-term employees who can grow with your organization."
    },
    {
      question: "Are there any costs associated with posting jobs?",
      answer: "No, there are no costs for posting job opportunities. We offer this as a free service to connect our students with quality employment opportunities."
    },
    {
      question: "How is my data protected on this platform?",
      answer: "All employer data is protected using industry-standard encryption and security protocols. We implement strict access controls, regular security audits, and maintain compliance with educational privacy regulations to ensure your information remains secure."
    },
    {
      question: "Who can access the job information I post?",
      answer: "Only verified students and authorized staff within the Entrepreneurship Academy can access job postings. Our platform implements role-based access controls to ensure information is only visible to appropriate users."
    },
    {
      question: "Is my company's information shared with third parties?",
      answer: "No, we do not share your company information with third parties. Any data you provide is used exclusively for connecting with qualified students through our platform and for educational purposes within our program."
    },
    {
      question: "What security measures are in place to protect employer accounts?",
      answer: "We implement multiple security layers including secure password requirements, two-factor authentication options, session timeouts, and regular security monitoring to protect employer accounts from unauthorized access."
    }
  ];

  return (
    <Layout>
      <div className={headerAnimation}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our job platform, the Entrepreneurship Academy,
            and employment opportunities.
          </p>
        </div>
      </div>
      
      <div className={contentAnimation}>
        <Tabs defaultValue="students" className="max-w-3xl mx-auto mb-16">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students">For Students</TabsTrigger>
            <TabsTrigger value="employers">For Employers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Questions</CardTitle>
                <CardDescription>
                  Information for students about using the platform and finding jobs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {studentFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Employer Questions</CardTitle>
                <CardDescription>
                  Information for businesses looking to hire students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {employerFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Separator className="max-w-4xl mx-auto my-16" />
        
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <div className="flex justify-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Lock className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                <Database className="h-6 w-6" />
              </div>
            </div>
            <p className="mb-6 max-w-xl mx-auto">
              If you couldn't find the answer to your question, feel free to reach out directly
              to our Department Chair. We take data security and privacy very seriously.
            </p>
            <div className="inline-flex gap-4">
              <Button size="lg" asChild>
                <a href="mailto:support@jobseeker4hs.org" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Us
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/resources" className="gap-2">
                  <Search className="h-4 w-4" />
                  Browse Resources
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
