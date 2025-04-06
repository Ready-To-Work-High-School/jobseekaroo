import React from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import JobHelpAI from '@/components/support/JobHelpAI';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';

const HELP_CATEGORIES = [
  {
    id: 'resume',
    title: 'Resume Help',
    prompt: "What are the key elements of a great resume for a high school student looking for their first job?",
    description: "Get guidance on crafting a resume that stands out to employers"
  },
  {
    id: 'interview',
    title: 'Interview Prep',
    prompt: "What are common interview questions for entry-level positions and how should I answer them?",
    description: "Practice answering interview questions and get feedback"
  },
  {
    id: 'application',
    title: 'Application Tips',
    prompt: "What strategies should I use when filling out job applications to increase my chances of getting an interview?",
    description: "Learn how to complete applications effectively"
  },
  {
    id: 'skills',
    title: 'Skills Development',
    prompt: "What entry-level skills are most valuable for high school students entering the workforce?",
    description: "Identify and develop key skills employers want"
  }
];

const JobHelp = () => {
  return (
    <Layout>
      <Helmet>
        <title>AI Job Help - Job Seekers 4 HS</title>
        <meta name="description" content="Get personalized AI assistance for your job search, applications, and interview preparation." />
      </Helmet>
      
      <div className="container-custom py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">AI Job Search Assistant</h1>
          <p className="text-muted-foreground">
            Get personalized guidance from our AI assistant for resumes, interviews, applications, and more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <Tabs defaultValue="resume" className="w-full">
              <ScrollArea className="w-full">
                <div className="flex px-4 py-2">
                  <TabsList>
                    {HELP_CATEGORIES.map(category => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </ScrollArea>
              
              {HELP_CATEGORIES.map(category => (
                <TabsContent key={category.id} value={category.id} className="pt-2 px-2">
                  <JobHelpAI 
                    initialPrompt={category.prompt} 
                    title={category.title}
                    description={category.description}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-4">Job Search Resources</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">Resume Templates</h4>
                    <p className="text-xs text-muted-foreground">
                      Professional templates to help you create a standout resume
                    </p>
                    <a href="/resume-assistant" className="text-xs text-primary hover:underline inline-flex items-center mt-1">
                      View Templates <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-sm">Interview Questions</h4>
                    <p className="text-xs text-muted-foreground">
                      Practice with common questions for high school students
                    </p>
                    <a href="/interview-prep" className="text-xs text-primary hover:underline inline-flex items-center mt-1">
                      Practice Now <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-sm">First Job Guide</h4>
                    <p className="text-xs text-muted-foreground">
                      Everything you need to know about landing your first job
                    </p>
                    <a href="/first-job-toolkit" className="text-xs text-primary hover:underline inline-flex items-center mt-1">
                      Read Guide <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-2">How It Works</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI assistant is trained on job search best practices specifically for high school students.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Select a category or ask any job-related question</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Get personalized guidance based on your specific needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/20 text-primary h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Follow up with more questions to get detailed help</span>
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

export default JobHelp;
