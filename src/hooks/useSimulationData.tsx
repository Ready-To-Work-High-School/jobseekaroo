
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobSimulations } from '@/lib/supabase/simulations';
import { JobSimulation } from '@/types/jobSimulation';

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

  // Fetch all job simulations
  const { data: fetchedSimulations, isLoading } = useQuery({
    queryKey: ['jobSimulations'],
    queryFn: getJobSimulations,
    meta: {
      onError: (error: any) => {
        console.error("Error fetching simulations:", error);
        setUseMockData(true);
      }
    }
  });
  
  // Handle empty data or errors with useEffect
  useEffect(() => {
    if (fetchedSimulations !== undefined) {
      if (!fetchedSimulations || fetchedSimulations.length === 0) {
        console.log("No simulations found in database, using mock data");
        setUseMockData(true);
      }
    }
  }, [fetchedSimulations]);

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
    categories
  };
};

export default useSimulationData;
