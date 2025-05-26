
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { FileText, User, Award, Briefcase, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoForm from '@/components/resume/PersonalInfoForm';
import SkillsForm from '@/components/resume/SkillsForm';
import CredentialsForm from '@/components/resume/CredentialsForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import ResumePreview from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';

const ResumeAssistant = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      objective: ''
    },
    skills: [],
    credentials: [],
    experiences: [],
    education: []
  });

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold">Resume Builder</h1>
        </div>
        
        <p className="text-lg mb-8 text-muted-foreground">
          Build a professional resume that showcases your skills, credentials, and experience. 
          Complete each section to create a comprehensive profile that stands out to employers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Builder Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Build Your Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
                    <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
                    <TabsTrigger value="credentials" className="text-xs">Credentials</TabsTrigger>
                    <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="space-y-4">
                    <PersonalInfoForm 
                      data={resumeData.personalInfo}
                      onUpdate={(data) => updateResumeData('personalInfo', data)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="skills" className="space-y-4">
                    <SkillsForm 
                      data={resumeData.skills}
                      onUpdate={(data) => updateResumeData('skills', data)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="credentials" className="space-y-4">
                    <CredentialsForm 
                      data={resumeData.credentials}
                      onUpdate={(data) => updateResumeData('credentials', data)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="experience" className="space-y-4">
                    <ExperienceForm 
                      data={resumeData.experiences}
                      onUpdate={(data) => updateResumeData('experiences', data)}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Resume Preview */}
          <div className="space-y-6">
            <ResumePreview data={resumeData} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAssistant;
