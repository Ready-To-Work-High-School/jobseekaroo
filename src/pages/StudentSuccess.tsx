
import React from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import StudentSuccessSection from '@/components/programs/entrepreneurship/StudentSuccessSection';
import CredentialsBadges from '@/components/programs/CredentialsBadges';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Award, Briefcase, Heart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

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
                <a href="/entrepreneurship-academy">Learn more about our Academies</a>
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
                  <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>Hands-on clinical experience</li>
                    <li>Industry-recognized CNA certification pathway</li>
                    <li>Healthcare career exploration</li>
                    <li>Professional skills development</li>
                  </ul>
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
      </div>
    </Layout>
  );
};

export default StudentSuccess;
