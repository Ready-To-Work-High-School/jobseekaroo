
import React from 'react';
import { JobSimulation } from '@/types/jobSimulation';
import SimulationCard from './SimulationCard';
import SimulationEmptyState from './SimulationEmptyState';
import SimulationLoadingSkeleton from './SimulationLoadingSkeleton';

interface SimulationsGridProps {
  simulations: JobSimulation[] | undefined;
  isLoading: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SimulationsGrid = ({ 
  simulations, 
  isLoading, 
  selectedCategory, 
  setSelectedCategory 
}: SimulationsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <SimulationLoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!simulations || simulations.length === 0) {
    return <SimulationEmptyState setSelectedCategory={setSelectedCategory} />;
  }

  // Filter simulations by category
  const filteredSimulations = selectedCategory === 'all' 
    ? simulations 
    : simulations.filter(sim => sim.category === selectedCategory);

  if (filteredSimulations.length === 0) {
    return <SimulationEmptyState setSelectedCategory={setSelectedCategory} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredSimulations.map((simulation) => (
        <SimulationCard 
          key={simulation.id} 
          simulation={simulation}
        />
      ))}
    </div>
  );
};

export default SimulationsGrid;
