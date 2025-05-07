
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Briefcase, Star, Users, GraduationCap, MapPin, Info } from 'lucide-react';

interface CareerCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  jobCount: number;
  fields: string[];
}

const careerCategories: CareerCategory[] = [
  {
    id: 'retail',
    name: 'Retail & Customer Service',
    description: 'Work directly with customers in shops, restaurants, and service businesses',
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    jobCount: 28,
    fields: ['Sales Associate', 'Cashier', 'Customer Service', 'Retail Manager']
  },
  {
    id: 'tech',
    name: 'Technology',
    description: 'Jobs involving computers, software, and digital services',
    icon: <GraduationCap className="h-6 w-6 text-cyan-600" />,
    jobCount: 15,
    fields: ['IT Support', 'Software Testing', 'Data Entry', 'Social Media']
  },
  {
    id: 'office',
    name: 'Office & Administrative',
    description: 'Support roles in office environments including data entry and clerical work',
    icon: <Briefcase className="h-6 w-6 text-blue-600" />,
    jobCount: 22,
    fields: ['Administrative Assistant', 'Receptionist', 'Office Clerk', 'Data Entry']
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Wellness',
    description: 'Entry-level positions supporting healthcare services',
    icon: <Info className="h-6 w-6 text-emerald-600" />,
    jobCount: 17,
    fields: ['Medical Assistant', 'Patient Transport', 'Dietary Aide', 'Front Desk']
  }
];

const CareerExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };
  
  return (
    <div className="py-12 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">Explore Career Pathways</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover career options that match your interests and see potential pathways from entry-level positions
          </p>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="categories">Career Categories</TabsTrigger>
              <TabsTrigger value="interests">Match By Interest</TabsTrigger>
              <TabsTrigger value="pathways">Career Pathways</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careerCategories.map((category) => (
                  <motion.div 
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-200 h-full ${
                        selectedCategory === category.id ? 'border-primary shadow-md' : 'hover:border-gray-300'
                      }`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {category.icon}
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                          </div>
                          <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {category.jobCount} jobs
                          </span>
                        </div>
                        <CardDescription className="mt-2">{category.description}</CardDescription>
                      </CardHeader>
                      
                      {selectedCategory === category.id && (
                        <CardContent>
                          <h4 className="text-sm font-medium mb-2 text-gray-700">Common entry-level fields:</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.fields.map((field) => (
                              <span 
                                key={field} 
                                className="bg-slate-100 px-2 py-1 rounded-full text-xs text-slate-700"
                              >
                                {field}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      )}
                      
                      <CardFooter>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary"
                          asChild
                        >
                          <Link to={`/jobs?category=${category.id}`}>
                            View Jobs in {category.name}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="interests">
              <div className="bg-white rounded-lg p-4 border min-h-[300px] flex flex-col items-center justify-center">
                <Star className="h-12 w-12 text-amber-400 mb-4 opacity-60" />
                <h3 className="text-lg font-medium mb-2">Interest Matching Coming Soon</h3>
                <p className="text-gray-500 text-center max-w-md">
                  Take a quick assessment to discover careers that match your interests, skills, and preferences.
                </p>
                <Button variant="outline" className="mt-4" disabled>Coming Soon</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="pathways">
              <div className="bg-white rounded-lg p-4 border min-h-[300px] flex flex-col items-center justify-center">
                <MapPin className="h-12 w-12 text-blue-400 mb-4 opacity-60" />
                <h3 className="text-lg font-medium mb-2">Career Pathway Explorer Coming Soon</h3>
                <p className="text-gray-500 text-center max-w-md">
                  See how entry-level positions can lead to advanced careers through interactive pathway visualization.
                </p>
                <Button variant="outline" className="mt-4" disabled>Coming Soon</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex items-center justify-center mt-8">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg shadow-sm max-w-md">
            <div className="flex gap-3 items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Search className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium">Need more detailed exploration?</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Use our advanced career exploration tools to find the perfect job match based on your skills, interests, and goals.
            </p>
            <div className="flex justify-between">
              <Button asChild variant="outline">
                <Link to="/jobs">Search All Jobs</Link>
              </Button>
              <Button asChild>
                <Link to="/career-quiz">Take Career Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerExplorer;
