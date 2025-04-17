import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobSimulations } from '@/lib/supabase/simulations';
import { JobSimulation } from '@/types/jobSimulation';
import { supabase } from '@/integrations/supabase/client';

// Mock data for simulations
const mockSimulations: JobSimulation[] = [
  {
    id: "sim-001",
    title: "Customer Service Representative",
    description: "Experience what it's like to work in a customer service role, handling inquiries and resolving issues.",
    category: "retail",
    difficulty: "Beginner",
    duration: "45 minutes",
    thumbnail_url: "",
    requirements: ["Communication skills", "Problem solving"],
    skills_gained: ["Customer service", "Conflict resolution", "Time management"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sim-002",
    title: "Administrative Assistant",
    description: "Learn essential office skills through realistic scenarios in an office environment.",
    category: "office",
    difficulty: "Beginner",
    duration: "60 minutes",
    thumbnail_url: "",
    requirements: ["Basic computer skills", "Organization"],
    skills_gained: ["Email management", "Scheduling", "Document processing"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sim-003",
    title: "Retail Sales Associate",
    description: "Practice helping customers find products, processing transactions, and managing inventory.",
    category: "retail",
    difficulty: "Beginner",
    duration: "40 minutes",
    thumbnail_url: "",
    requirements: ["Communication skills", "Basic math"],
    skills_gained: ["Sales techniques", "Point of sale systems", "Inventory management"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "sim-004",
    title: "Healthcare Assistant",
    description: "Experience patient interaction scenarios and basic healthcare procedures.",
    category: "healthcare",
    difficulty: "Intermediate",
    duration: "75 minutes",
    thumbnail_url: "",
    requirements: ["Interest in healthcare", "Attention to detail"],
    skills_gained: ["Patient care", "Medical terminology", "Record keeping"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const useSimulationData = () => {
  const [useMockData, setUseMockData] = useState<boolean>(false);
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
        setUseMockData(true);
        return [];
      }
    },
    meta: {
      onError: (error: any) => {
        console.error("Error in job simulations query:", error);
        setUseMockData(true);
      }
    }
  });
  
  // Log when mock data is being used
  useEffect(() => {
    if (useMockData) {
      console.log('Using mock simulations due to database fetch failure');
    }
  }, [useMockData]);

  // Use mock data if no simulations are returned from the database
  const simulations = useMockData ? mockSimulations : fetchedSimulations;

  // Get unique categories
  const categories = simulations 
    ? ['all', ...new Set(simulations.map(sim => sim.category))]
    : ['all'];

  return { 
    simulations, 
    isLoading, 
    useMockData, 
    selectedCategory, 
    setSelectedCategory,
    categories,
    error // Add error to the return object for debugging
  };
};

export default useSimulationData;
