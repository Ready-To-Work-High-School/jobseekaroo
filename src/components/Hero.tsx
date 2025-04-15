
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Award, UserCheck, ArrowRight, GraduationCap } from 'lucide-react';
import { SparkleGroup } from './animations/Sparkle';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      {/* Animated sparkles */}
      <SparkleGroup count={8} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Free Badge */}
          <div className="mb-6 inline-block">
            <Badge variant="outline" className="px-4 py-1 text-lg bg-amber-50 border-amber-200 text-amber-700">
              <Award className="h-5 w-5 mr-2" />
              Free for Students
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
              Your First Job, Made Simple.
            </span>
          </h1>
          
          <p className="text-lg mb-8 text-gray-600">
            A safe, mobile-first platform connecting certified high school students with local businesses. Exclusive to Westside High School students in Entrepreneurship or Nursing Academy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <Search className="h-8 w-8 text-blue-500 mb-2 mx-auto" />
              <h3 className="font-medium">Find Jobs Fast</h3>
              <p className="text-sm text-gray-600">Local opportunities matched to your skills</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <Award className="h-8 w-8 text-amber-500 mb-2 mx-auto" />
              <h3 className="font-medium">Earn Badges</h3>
              <p className="text-sm text-gray-600">Track your achievements and grow</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
              <UserCheck className="h-8 w-8 text-green-500 mb-2 mx-auto" />
              <h3 className="font-medium">Easy Sign Up</h3>
              <p className="text-sm text-gray-600">Get started in minutes</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/sign-up">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-blue-700">
                <GraduationCap className="h-5 w-5" />
                Sign Up Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse Jobs
              </Button>
            </Link>
          </div>

          {/* Employer Section */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-8">
            <h2 className="text-2xl font-bold mb-4">For Employers</h2>
            <p className="text-gray-700 mb-4">
              Access our talent pool of certified high school students ready to contribute to your business.
            </p>
            <Link to="/for-employers">
              <Button variant="secondary" size="lg" className="gap-2">
                Hire Students
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
