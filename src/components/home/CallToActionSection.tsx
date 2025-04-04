
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career Journey?</h2>
        <p className="max-w-2xl mx-auto mb-8 text-blue-100">
          Join hundreds of high school students who have found valuable work experience through our platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/sign-up">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Create an Account
            </Button>
          </Link>
          <Link to="/jobs">
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto">
              Browse Available Jobs
            </Button>
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-blue-200">
          *Exclusive to students enrolled in the Westside High School Entrepreneurship Academy
        </p>
      </div>
    </section>
  );
};

export default CallToActionSection;
