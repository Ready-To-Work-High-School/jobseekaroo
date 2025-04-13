
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Compass } from 'lucide-react';

const QuickAccessButtons = () => {
  return (
    <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-center gap-4">
      <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
        <Link to="/entrepreneurship-academy">
          <Award className="h-5 w-5" />
          Explore Our Program
        </Link>
      </Button>
      
      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
        <Link to="/first-job-toolkit">
          <Compass className="h-5 w-5" />
          First Job Toolkit
        </Link>
      </Button>
    </div>
  );
};

export default QuickAccessButtons;
