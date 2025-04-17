
import React from 'react';
import { useAuth } from '@/contexts/auth';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import useSimulationData from '@/hooks/useSimulationData';

// Import our newly created components
import SimulationHero from '@/components/job-simulations/SimulationHero';
import HowItWorks from '@/components/job-simulations/HowItWorks';
import CategoryFilter from '@/components/job-simulations/CategoryFilter';
import SimulationsGrid from '@/components/job-simulations/SimulationsGrid';
import AdaptiveLearning from '@/components/job-simulations/AdaptiveLearning';
import CallToAction from '@/components/job-simulations/CallToAction';

const JobSimulations = () => {
  const fadeIn = useFadeIn(300);
  const { 
    simulations, 
    isLoading, 
    selectedCategory, 
    setSelectedCategory,
    categories 
  } = useSimulationData();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        {/* Hero Section */}
        <SimulationHero />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Individual Simulations Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Available Simulations</h2>
          </div>

          <SimulationsGrid 
            simulations={simulations}
            isLoading={isLoading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Skill Development Section */}
        <AdaptiveLearning />

        {/* CTA Section */}
        <CallToAction scrollToTop={scrollToTop} />
      </div>
    </Layout>
  );
};

export default JobSimulations;
