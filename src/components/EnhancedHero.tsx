
import React, { lazy, Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import { TrendingUp, Briefcase, GraduationCap } from 'lucide-react';
import { SparkleGroup } from './animations/Sparkle';
import { Divider } from './ui/divider';
import { Separator } from './ui/separator';
import { topJacksonvilleCompanies } from '@/lib/mock-data/companiesData';
import FreeForStudentsBadge from './badges/FreeForStudentsBadge';

// Lazy load components that aren't immediately visible
const PartnerLogosSection = lazy(() => import('@/components/home/PartnerLogosSection'));
const CallToActionSection = lazy(() => import('@/components/home/CallToActionSection'));
const FeaturedJobsSection = lazy(() => import('@/components/home/FeaturedJobsSection'));
const JobPlacementsSection = lazy(() => import('@/components/home/JobPlacementsSection'));
const TopEmployersSection = lazy(() => import('@/components/job/TopEmployersSection'));
const SectionSeparator = lazy(() => import('@/components/home/SectionSeparator'));
const CompanyDirectory = lazy(() => import('./resources/CompanyDirectory'));

// Loading fallback component
const SectionSkeleton = () => (
  <div className="w-full py-8">
    <div className="max-w-6xl mx-auto px-4">
      <div className="h-10 w-1/3 bg-gray-200 rounded animate-pulse mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

const EnhancedHero = () => {
  return (
    <div className="relative">
      {/* Reduced number of sparkles */}
      <SparkleGroup count={6} />
      
      {/* JS4HS Logo at the top with glow - NEW */}
      <div className="bg-blue-50 py-6 px-4 text-center border-b border-blue-100 relative">
        <div className="container mx-auto">
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-amber-400/30 to-blue-400/20 blur-2xl opacity-70"></div>
            <div className="relative logo-glow logo-accent">
              <img 
                src="/lovable-uploads/cd1a1f58-31a6-4665-a843-055feedeccc7.png" 
                alt="Job Seekers 4 High Schools Logo" 
                className="h-24 md:h-32 w-auto object-contain logo-shadow logo-3d-effect"
                width="256"
                height="128"
              />
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold mt-3 text-blue-800">Job Seekers 4 High Schools</h2>
          <p className="text-sm text-blue-700 max-w-xl mx-auto mt-1">
            Connecting students with credential-ready opportunities at Westside High School
          </p>
        </div>
      </div>
      
      {/* Free for students banner - KEPT */}
      <div className="bg-amber-50 py-3 px-4 text-center border-b border-amber-100">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <FreeForStudentsBadge variant="large" />
          </div>
          <p className="text-sm text-amber-800 mt-2">
            Exclusive to Westside High School students in Entrepreneurship or Nursing Academy
          </p>
        </div>
      </div>
      
      {/* Info banner with optimized DOM */}
      <div className="bg-blue-50 py-4 px-4 text-center">
        <div className="container mx-auto flex flex-wrap justify-center gap-4 md:gap-8">
          <div className="flex items-center">
            <TrendingUp className="text-blue-600 h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Your First Job, Made Simple.</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="text-amber-600 h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Fast lane to hire eager high schoolers</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="text-green-600 h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Partnering with schools to boost career readiness</span>
          </div>
        </div>
      </div>
      
      {/* 3-Step Job Search Process - NEW */}
      <div className="bg-white py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Find Your Dream Job In 3 Easy Steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">1</div>
              <h3 className="text-lg font-medium mb-3 mt-2">Create Your Profile</h3>
              <p className="text-sm text-gray-700">Showcase your credentials, skills and preferences to match with the right opportunities.</p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 text-center relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">2</div>
              <h3 className="text-lg font-medium mb-3 mt-2">Browse Opportunities</h3>
              <p className="text-sm text-gray-700">Explore curated job listings from verified local employers seeking your specific skills.</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">3</div>
              <h3 className="text-lg font-medium mb-3 mt-2">Apply with Confidence</h3>
              <p className="text-sm text-gray-700">Submit applications with your verified credentials and get guidance throughout the process.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Employer Section - NEW */}
      <div className="bg-blue-900 text-white py-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">Employers</h2>
          <p className="text-center max-w-2xl mx-auto mb-8">
            Post jobs and hire industry certified, credentialed students ready to contribute to your business.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3 text-amber-300">Access Verified Talent</h3>
              <p className="text-sm text-blue-50">
                Connect with students who have earned industry-recognized credentials and are ready to apply their skills in real-world settings.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3 text-amber-300">Simple Hiring Process</h3>
              <p className="text-sm text-blue-50">
                Post opportunities, review pre-screened applications, and connect directly with qualified candidates.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero section is critical for initial render, so not lazy loaded */}
      <HeroSection />
      
      {/* Top Jacksonville Employers with logos */}
      <Suspense fallback={<SectionSkeleton />}>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Top Employers in Jacksonville</h2>
          <CompanyDirectory companies={topJacksonvilleCompanies.slice(0, 6)} />
        </div>
        
        <SectionSeparator />
        
        <FeaturedJobsSection />
        <TopEmployersSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <JobPlacementsSection />
        <PartnerLogosSection />
        <CallToActionSection />
      </Suspense>
    </div>
  );
};

export default EnhancedHero;
