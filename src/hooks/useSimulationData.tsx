
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobSimulations } from '@/lib/supabase/simulations';
import { JobSimulation } from '@/types/jobSimulation';
import { supabase } from '@/integrations/supabase/client';

// Mock data removed since we now have real data in the database

export const useSimulationData = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch all job simulations with more detailed logging
  const { data: fetchedSimulations, isLoading, error } = useQuery({
    queryKey: ['jobSimulations'],
    queryFn: async () => {
      try {
        console.log('Attempting to fetch job simulations from database');
        const simulations = await getJobSimulations();
        console.log('Fetched simulations:', simulations);
        return simulations;
      } catch (err) {
        console.error('Error fetching simulations:', err);
        return [];
      }
    }
  });

  // Get unique categories
  const categories = fetchedSimulations 
    ? ['all', ...new Set(fetchedSimulations.map(sim => sim.category))]
    : ['all'];

  return { 
    simulations: fetchedSimulations || [], 
    isLoading, 
    selectedCategory, 
    setSelectedCategory,
    categories,
    error
  };
};

export default useSimulationData;
