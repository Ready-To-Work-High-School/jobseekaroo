
import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { useFadeIn } from '@/utils/animations';
import EarnBadgeSection from '@/components/badges/EarnBadgeSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, BookOpen, CheckCircle2, Code, FileText, Lightbulb } from 'lucide-react';

const SkillDevelopment = () => {
  const fadeIn = useFadeIn(300);
  
  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <PageHeader 
          title="Skill Development" 
          description="Build your skills and earn industry-recognized badges and certifications."
          icon={<Award className="h-6 w-6" />}
        />
        
        <EarnBadgeSection />
        
        <Tabs defaultValue="learning-paths" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="assessments">Skill Assessments</TabsTrigger>
            <TabsTrigger value="certificates">Certifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="learning-paths" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Career Readiness",
                  icon: <Lightbulb className="h-5 w-5 text-amber-600" />,
                  skills: ["Resume Building", "Interview Skills", "Professional Communication", "Workplace Ethics"]
                },
                {
                  title: "Digital Literacy",
                  icon: <Code className="h-5 w-5 text-blue-600" />,
                  skills: ["Basic Computing", "Internet Safety", "Digital Communication", "MS Office Skills"]
                },
                {
                  title: "Financial Skills",
                  icon: <FileText className="h-5 w-5 text-green-600" />,
                  skills: ["Personal Finance", "Budgeting", "Banking Basics", "Financial Planning"]
                },
                {
                  title: "Healthcare Skills",
                  icon: <BookOpen className="h-5 w-5 text-red-600" />,
                  skills: ["Patient Interaction", "Healthcare Ethics", "Medical Terminology", "Safety Protocols"]
                }
              ].map((path, index) => (
                <Card key={index} className="shadow-sm hover:shadow transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      {path.icon}
                      <CardTitle>{path.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {path.skills.map((skill, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="assessments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Take assessments to test your skills and knowledge in various areas.</p>
                <ul className="space-y-4">
                  {[
                    "Professional Communication Assessment",
                    "Digital Literacy Assessment",
                    "Problem-Solving Assessment",
                    "Teamwork and Collaboration Assessment"
                  ].map((assessment, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      <span>{assessment}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">These industry-recognized certifications can boost your resume and career prospects.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Entrepreneurship & Small Business",
                      provider: "Certiport"
                    },
                    {
                      name: "Microsoft Office Specialist",
                      provider: "Microsoft"
                    },
                    {
                      name: "Career Readiness Certificate",
                      provider: "WorkKeys"
                    },
                    {
                      name: "Certified Nursing Assistant",
                      provider: "State of Florida"
                    }
                  ].map((cert, i) => (
                    <div key={i} className="border rounded-md p-3 bg-gray-50">
                      <h3 className="font-medium">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">Provider: {cert.provider}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SkillDevelopment;
