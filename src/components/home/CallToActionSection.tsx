
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const CallToActionSection = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-amber-300" />
          <h2 className="text-3xl font-bold">Ready to Start Your Career Journey?</h2>
          <Sparkles className="h-6 w-6 text-amber-300" />
        </div>
        
        <p className="max-w-2xl mx-auto mb-8 text-blue-100">
          Join hundreds of high school students who have found valuable work experience through our platform. 
          Your first job is just a few clicks away!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/sign-up">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2 font-medium">
              Create an Account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/jobs">
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto">
              Browse Available Jobs
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 max-w-md mx-auto">
          <div className="bg-blue-700 rounded-xl p-4">
            <h3 className="text-xl font-semibold mb-2">For Employers</h3>
            <p className="text-sm text-blue-100 mb-4">
              Access our talent pool of eager high school students ready to join your workforce
            </p>
            <Link to="/for-employers">
              <Button variant="default" size="sm" className="bg-amber-500 hover:bg-amber-600 text-blue-900">
                Hire Students
              </Button>
            </Link>
          </div>
        </div>
        
        <p className="mt-8 text-sm text-blue-200">
          *Exclusive to students enrolled in Entrepreneurship or Nursing academy at Westside High School
        </p>
      </div>
    </section>
  );
};

export default CallToActionSection;
