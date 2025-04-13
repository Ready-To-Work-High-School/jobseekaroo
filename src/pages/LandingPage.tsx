
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Store, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const featureCardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animation for feature cards
    const cards = featureCardsRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('opacity-100');
        card.classList.remove('opacity-0');
      }, index * 200);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-blue-900">
      {/* Hero Section with Gradient Background */}
      <header className="bg-gradient-to-r from-cyan-400 to-pink-500 text-center py-16 px-4 md:py-24">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Empowering Teens, Connecting Employers
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-white mb-8 max-w-2xl mx-auto"
        >
          Jobs, skills, and opportunities for the next generation.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link to="/jobs">
            <Button 
              size="lg" 
              className="rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 transition-transform hover:scale-105"
            >
              Explore Jobs
            </Button>
          </Link>
          <Link to="/for-employers">
            <Button 
              size="lg" 
              className="rounded-full bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 transition-transform hover:scale-105"
            >
              Hire Now
            </Button>
          </Link>
        </motion.div>
        
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          src="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png"
          alt="Teens Working Illustration"
          className="mx-auto max-w-full md:max-w-md h-auto"
        />
      </header>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div 
          ref={featureCardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <div className="feature-card opacity-0 transition-opacity duration-500 bg-white p-6 rounded-xl shadow-md hover:-translate-y-2 transition-transform">
            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Learn Skills</h3>
            <p className="text-gray-600">Teens: Build coding, retail, or leadership skills.</p>
          </div>
          
          <div className="feature-card opacity-0 transition-opacity duration-500 bg-white p-6 rounded-xl shadow-md hover:-translate-y-2 transition-transform">
            <div className="bg-pink-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Find Talent</h3>
            <p className="text-gray-600">Employers: Hire motivated, trained teens.</p>
          </div>
          
          <div className="feature-card opacity-0 transition-opacity duration-500 bg-white p-6 rounded-xl shadow-md hover:-translate-y-2 transition-transform">
            <div className="bg-amber-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Get Certified</h3>
            <p className="text-gray-600">Earn industry-recognized credentials.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-blue-600">M</span>
              </div>
              <div>
                <h3 className="font-bold">Mia, 17</h3>
                <p className="text-gray-500 text-sm">Student</p>
              </div>
            </div>
            <p className="italic text-gray-700">"I got my first job in a week! The platform made it easy to showcase my skills."</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-pink-600">C</span>
              </div>
              <div>
                <h3 className="font-bold">Cafe XYZ</h3>
                <p className="text-gray-500 text-sm">Local Business</p>
              </div>
            </div>
            <p className="italic text-gray-700">"Amazing talent pool! We found reliable, pre-trained workers ready to make an impact."</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/sign-up">
            <Button 
              size="lg" 
              className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-bold px-8"
            >
              Sign Up Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="py-8 px-4 text-center border-t border-gray-200">
        <p className="text-gray-600">© 2025 Job Seekers 4 High Schools</p>
      </footer>
    </div>
  );
};

export default LandingPage;
