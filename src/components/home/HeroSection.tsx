
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Find Your Perfect Job for High School Students
          </h1>
          <p className="text-lg mb-8 text-gray-700">
            Connect with employers looking for motivated high school students. Start your career journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jobs">
              <Button size="lg" className="gap-2">
                Browse Jobs <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/resources">
              <Button size="lg" variant="outline">
                Student Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
