
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { useFadeIn } from '@/utils/animations';
import EarnBadgeSection from '@/components/badges/EarnBadgeSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, BookOpen, CheckCircle2, Code, FileText, Lightbulb } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const SkillDevelopment = () => {
  const fadeIn = useFadeIn(300);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'learning-paths';
  
  useEffect(() => {
    if (!['learning-paths', 'assessments', 'certificates', 'badges'].includes(activeTab)) {
      // Set default tab if invalid
      navigate('/skill-development?tab=learning-paths', { replace: true });
    }
  }, [activeTab, navigate]);
  
  const handleTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', value);
    navigate(`/skill-development?${newParams.toString()}`);
  };
  
  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <PageHeader 
          title="Skill Development" 
          description="Build your skills and earn industry-recognized badges and certifications."
          icon={<Award className="h-6 w-6" />}
        />
        
        <EarnBadgeSection />
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="assessments">Skill Assessments</TabsTrigger>
            <TabsTrigger value="certificates">Certifications</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
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
          
          <TabsContent value="badges" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">Earn badges to showcase your skills and character traits to potential employers. Complete quizzes and receive endorsements to add these credentials to your profile.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Professional Communication",
                      description: "Demonstrates effective workplace communication skills",
                      color: "bg-blue-50 border-blue-200"
                    },
                    {
                      name: "Team Collaboration",
                      description: "Shows ability to work effectively with others",
                      color: "bg-green-50 border-green-200"
                    },
                    {
                      name: "Problem Solving",
                      description: "Exhibits strong analytical thinking and solutions",
                      color: "bg-purple-50 border-purple-200"
                    },
                    {
                      name: "Digital Literacy",
                      description: "Displays proficiency with technology and software",
                      color: "bg-cyan-50 border-cyan-200"
                    },
                    {
                      name: "Workplace Ethics",
                      description: "Demonstrates integrity and ethical decision-making",
                      color: "bg-amber-50 border-amber-200"
                    },
                    {
                      name: "Reliability",
                      description: "Shows consistency, punctuality and dependability",
                      color: "bg-red-50 border-red-200"
                    }
                  ].map((badge, i) => (
                    <div key={i} className={`p-4 rounded-lg ${badge.color} border`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">{badge.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
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
