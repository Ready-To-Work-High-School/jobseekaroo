import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
const FeaturedProgramsSection = () => {
  return <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Programs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Entrepreneurship Program */}
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100">
            <CardTitle className="text-lg text-amber-800">Entrepreneurship Academy</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-center mb-4">
              <img src="/lovable-uploads/9babf5b8-1235-48d8-8e19-a555efbf5102.png" alt="ESB Certification" className="h-24 w-auto object-contain" width="120" height="120" />
            </div>
            
            <Button className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700" asChild>
              <Link to="/entrepreneurship-academy" className="flex items-center justify-center gap-2">
                <Award className="h-4 w-4" />
                Explore Program
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Nursing Academy */}
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-blue-200 transform scale-105 z-10">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-lg text-blue-800">Nursing Academy</CardTitle>
            <Badge className="bg-red-600 hover:bg-red-700">In-Demand Career</Badge>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-center mb-4">
              <img src="/lovable-uploads/32e451a9-4fe2-40b0-bfbc-15cfceea8d71.png" alt="Nursing Academy" className="h-24 w-auto object-contain" width="120" height="120" />
            </div>
            <p className="mb-4 text-sm">Prepare for healthcare careers with industry-recognized Certified Nursing Assistant credentials.</p>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700" asChild>
              <Link to="/nursing-academy" className="flex items-center justify-center gap-2">
                <Heart className="h-4 w-4" />
                Learn More
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* IBM SkillsBuild */}
        <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-indigo-200">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
            <CardTitle className="text-lg text-indigo-800">IBM SkillsBuild</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-center mb-4">
              <img src="/lovable-uploads/898ea22e-1f00-4da4-92db-b78adabc702a.png" alt="IBM SkillsBuild" className="h-24 w-auto object-contain" width="120" height="120" />
            </div>
            <p className="mb-4 text-sm">Earn digital credentials through IBM's SkillsBuild platform for in-demand technology skills.</p>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
              <Link to="/skills-build" className="flex items-center justify-center gap-2">
                <Award className="h-4 w-4" />
                Explore Credentials
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default FeaturedProgramsSection;