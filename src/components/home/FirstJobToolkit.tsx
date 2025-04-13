
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

const FirstJobToolkit = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl mb-8">
      <h2 className="text-3xl font-bold text-center mb-6">First Job Toolkit</h2>
      <div className="max-w-3xl mx-auto">
        <p className="text-center mb-6 text-gray-700">
          Resources and tools to help you prepare for and succeed in your first job.
          Learn essential skills, prepare for interviews, and build your professional profile.
        </p>
        <div className="flex justify-center">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300" asChild>
            <Link to="/first-job-toolkit" className="flex items-center justify-center gap-2">
              <Compass className="h-5 w-5" />
              Explore Toolkit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FirstJobToolkit;
