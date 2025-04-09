
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import StudentSuccessSection from '@/components/programs/entrepreneurship/StudentSuccessSection';
import CredentialsBadges from '@/components/programs/CredentialsBadges';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Award, Briefcase, Heart, BookOpen, ChevronRight, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const StudentSuccess = () => {
  const fadeIn = useFadeIn(300);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'stories';

  const handleTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', value);
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  // Career Pathways Data
  const careerPathways = [
    {
      title: "Business & Entrepreneurship",
      icon: <Briefcase className="h-10 w-10 text-amber-600" />,
      description: "Launch your career in business management, marketing, finance, or start your own company.",
      skills: ["Financial Literacy", "Marketing", "Business Operations", "Leadership"],
      credentials: ["Entrepreneurship & Small Business (ESB)", "Microsoft Office Specialist"],
      color: "border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100"
    },
    {
      title: "Healthcare & Nursing",
      icon: <Heart className="h-10 w-10 text-red-600" />,
      description: "Prepare for careers in nursing, patient care, and other healthcare positions.",
      skills: ["Patient Care", "Medical Terminology", "Healthcare Ethics", "Clinical Skills"],
      credentials: ["Certified Nursing Assistant (CNA)", "CPR & First Aid"],
      color: "border-red-200 bg-gradient-to-br from-red-50 to-red-100"
    },
    {
      title: "Technology & Digital Skills",
      icon: <BookOpen className="h-10 w-10 text-blue-600" />,
      description: "Develop skills for careers in IT, software development, and digital marketing.",
      skills: ["Digital Literacy", "Computing Basics", "Data Analysis", "Web Skills"],
      credentials: ["Microsoft Technology Associate", "IBM Digital Badges"],
      color: "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100"
    }
  ];

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-red-600 to-amber-600 bg-clip-text text-transparent">
            Student Success Pathways
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore success stories, academic pathways, and credential opportunities available to our students.
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="max-w-4xl mx-auto mb-10"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Success Stories</span>
              <span className="sm:hidden">Stories</span>
            </TabsTrigger>
            <TabsTrigger value="entrepreneur" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Entrepreneurship</span>
              <span className="sm:hidden">Business</span>
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Medical Academy</span>
              <span className="sm:hidden">Medical</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Credentials & Badges</span>
              <span className="sm:hidden">Badges</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="mt-6">
            <StudentSuccessSection />
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <a href="/success-stories">View More Success Stories</a>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="entrepreneur" className="mt-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-amber-700 dark:text-amber-500">Entrepreneurship Academy</h2>
              <p className="mb-4">
                The Entrepreneurship Academy prepares students for success in the business world through 
                specialized courses, industry certifications, and real-world experiences.
              </p>
              
              {/* New Career Pathway Cards */}
              <div className="mt-8 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-amber-700">Career Pathways</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-amber-800">Business Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {["Business Administration", "Human Resources", "Operations Management"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-amber-800">Entrepreneurship</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {["Small Business Ownership", "Startup Development", "E-commerce & Digital Business"].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Button asChild>
                  <a href="/entrepreneurship-academy">Explore Entrepreneurship Academy</a>
                </Button>
              </div>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mt-6">
                <iframe 
                  src="https://www.youtube.com/embed/bjjLKdTgl6g" 
                  title="Entrepreneurship Program Overview" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="medical" className="mt-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-red-700 dark:text-red-500">Medical & Nursing Academy</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4">
                    Students in our Certified Nursing Assistant Career Pathway develop the skills needed to become
                    competent healthcare professionals, preparing for careers in nursing and medical fields.
                  </p>
                  
                  {/* New Medical Career Paths */}
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-red-700 mb-2">Healthcare Career Pathways</h4>
                    <ul className="space-y-2">
                      {["Certified Nursing Assistant", "Patient Care Technician", "Medical Administrative Assistant"].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* New Mayo Clinic Program Card */}
                  <Card className="bg-blue-50 border border-blue-100 mb-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Upcoming Opportunity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-bold text-blue-800">Mayo Clinic Pathways Program</h4>
                      <p className="text-sm mb-2">3-day immersive healthcare careers program</p>
                      <p className="text-xs text-gray-600 mb-3">July 10-12, 2025 • Jacksonville, FL</p>
                      <Button size="sm" asChild className="w-full">
                        <a href="/healthcare-pathways">Learn More</a>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <div className="text-center mt-6">
                    <Button variant="outline" asChild>
                      <a href="mailto:Colemanp3@duvalschools.org">Contact Program Coordinator</a>
                    </Button>
                  </div>
                </div>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe 
                    src="https://www.youtube.com/embed/niuASx8o_TA" 
                    title="Certified Nursing Assistant Program" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <CredentialsBadges />
          </TabsContent>
        </Tabs>
        
        {/* New Career Pathways Section */}
        <div className="max-w-5xl mx-auto my-12">
          <div className="text-center mb-8">
            <Badge variant="outline" className="text-blue-700 bg-blue-50 mb-2">Explore Options</Badge>
            <h2 className="text-3xl font-bold mb-2">Career Pathways</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our academic programs are designed to prepare students for various career paths through specialized training and industry-recognized credentials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {careerPathways.map((pathway, index) => (
              <Card key={index} className={`shadow-md hover:shadow-lg transition-shadow ${pathway.color}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-4">
                    {pathway.icon}
                  </div>
                  <CardTitle className="text-xl text-center">{pathway.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{pathway.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pathway.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Available Credentials:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pathway.credentials.map((credential, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{credential}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-1">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Getting Started Section */}
        <div className="max-w-4xl mx-auto mt-16 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Ready to Start Your Journey?</h2>
            <p className="text-gray-600">Follow these steps to join one of our career pathways and start building your future.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Explore Programs",
                description: "Review our available pathways and decide which aligns with your interests and goals.",
                icon: <BookOpen className="h-6 w-6 text-blue-600" />
              },
              {
                step: 2,
                title: "Meet with Counselor",
                description: "Schedule a meeting with a school counselor to discuss your pathway choice.",
                icon: <GraduationCap className="h-6 w-6 text-blue-600" />
              },
              {
                step: 3,
                title: "Enroll & Begin",
                description: "Complete enrollment and start your journey toward earning credentials and building skills.",
                icon: <CheckCircle2 className="h-6 w-6 text-blue-600" />
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  {step.icon}
                </div>
                <h3 className="font-bold mb-1">Step {step.step}: {step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild>
              <a href="/contact">Contact Us to Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentSuccess;
