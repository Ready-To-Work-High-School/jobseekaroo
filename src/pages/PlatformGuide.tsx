import { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Briefcase, School, ShieldCheck, BookOpen, Users, 
         Building2, BadgeCheck, Code2, FileText, Laptop, MessageSquare, 
         BookMarked, PieChart, ShieldAlert, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import PlatformFeatures from '@/components/guide/PlatformFeatures';
import StudentGuide from '@/components/guide/StudentGuide';
import EmployerGuide from '@/components/guide/EmployerGuide';
import SchoolGuide from '@/components/guide/SchoolGuide';
import AdminGuide from '@/components/guide/AdminGuide';
import CounselorGuide from '@/components/guide/CounselorGuide';

const PlatformGuide = () => {
  const [activeTab, setActiveTab] = useState('features');
  
  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-4">Platform Guide</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our platform connects high school students with opportunities while providing powerful tools for employers, schools, and administrators
          </p>
        </motion.div>

        <Tabs 
          defaultValue={activeTab} 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 mb-8">
            <TabsTrigger value="features" className="flex gap-2 items-center">
              <BookOpen className="h-4 w-4" />
              <span>Features</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex gap-2 items-center">
              <GraduationCap className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger value="employers" className="flex gap-2 items-center">
              <Briefcase className="h-4 w-4" />
              <span>Employers</span>
            </TabsTrigger>
            <TabsTrigger value="schools" className="flex gap-2 items-center">
              <School className="h-4 w-4" />
              <span>Schools</span>
            </TabsTrigger>
            <TabsTrigger value="administrators" className="flex gap-2 items-center">
              <ShieldCheck className="h-4 w-4" />
              <span>Administrators</span>
            </TabsTrigger>
            <TabsTrigger value="counselors" className="flex gap-2 items-center">
              <Users className="h-4 w-4" />
              <span>Counselors</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="focus-visible:outline-none focus-visible:ring-0">
            <PlatformFeatures />
          </TabsContent>
          
          <TabsContent value="students" className="focus-visible:outline-none focus-visible:ring-0">
            <StudentGuide />
          </TabsContent>
          
          <TabsContent value="employers" className="focus-visible:outline-none focus-visible:ring-0">
            <EmployerGuide />
          </TabsContent>
          
          <TabsContent value="schools" className="focus-visible:outline-none focus-visible:ring-0">
            <SchoolGuide />
          </TabsContent>
          
          <TabsContent value="administrators" className="focus-visible:outline-none focus-visible:ring-0">
            <AdminGuide />
          </TabsContent>
          
          <TabsContent value="counselors" className="focus-visible:outline-none focus-visible:ring-0">
            <CounselorGuide />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlatformGuide;
