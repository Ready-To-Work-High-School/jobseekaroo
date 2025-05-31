
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobSimulations } from '@/lib/supabase/simulations';
import { JobSimulation } from '@/types/jobSimulation';
import { jobSimulations } from '@/data/jobSimulations';

export const useSimulationData = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch all job simulations with fallback to mock data
  const { data: fetchedSimulations, isLoading, error } = useQuery({
    queryKey: ['jobSimulations'],
    queryFn: async () => {
      try {
        console.log('Attempting to fetch job simulations from database');
        const simulations = await getJobSimulations();
        console.log('Fetched simulations:', simulations);
        
        // If no simulations in database, return mock data
        if (!simulations || simulations.length === 0) {
          console.log('No simulations in database, using mock data');
          return jobSimulations;
        }
        
        return simulations;
      } catch (err) {
        console.error('Error fetching simulations:', err);
        // Fallback to mock data on error
        return jobSimulations;
      }
    }
  });

  // Get unique categories
  const categories = fetchedSimulations 
    ? ['all', ...new Set(fetchedSimulations.map(sim => sim.category))]
    : ['all'];

  return { 
    simulations: fetchedSimulations || jobSimulations, 
    isLoading, 
    selectedCategory, 
    setSelectedCategory,
    categories,
    error
  };
};

export default useSimulationData;
