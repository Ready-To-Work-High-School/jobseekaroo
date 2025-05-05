
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobSimulations } from '@/lib/supabase/simulations';
import { JobSimulation } from '@/types/jobSimulation';

export const useSimulationData = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch all job simulations with more detailed logging
  const { data: simulations, isLoading, error } = useQuery({
    queryKey: ['jobSimulations'],
    queryFn: async () => {
      try {
        console.log('Attempting to fetch job simulations from database');
        const simulations = await getJobSimulations();
        console.log('Fetched simulations:', simulations);
        return simulations;
      } catch (err) {
        console.error('Error fetching simulations:', err);
        throw err;
      }
    }
  });

  // Get unique categories
  const categories = simulations 
    ? ['all', ...new Set(simulations.map(sim => sim.category))]
    : ['all'];

  return { 
    simulations: simulations || [], 
    isLoading, 
    selectedCategory, 
    setSelectedCategory,
    categories,
    error
  };
};

export default useSimulationData;
