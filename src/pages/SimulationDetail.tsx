import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { getJobSimulation, getSimulationTasks, getUserSimulationProgress, updateSimulationProgress } from '@/lib/supabase/simulations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SimulationHeader from '@/components/job-simulations/SimulationHeader';
import SimulationProgressBar from '@/components/job-simulations/SimulationProgressBar';
import SimulationOverview from '@/components/job-simulations/SimulationOverview';
import SimulationTasks from '@/components/job-simulations/SimulationTasks';
import SimulationGuideSidebar from '@/components/job-simulations/SimulationGuideSidebar';

const mockSimulationData = {
  "sim-001": {
    id: "sim-001",
    title: "Customer Service Representative",
    description: "Experience what it's like to work in a customer service role, handling inquiries and resolving issues.",
    category: "retail",
    difficulty: "Beginner",
    duration: "45 minutes",
    requirements: ["Communication skills", "Problem solving"],
    skills_gained: ["Customer service", "Conflict resolution", "Time management"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  "sim-002": {
    id: "sim-002",
    title: "Administrative Assistant",
    description: "Learn essential office skills through realistic scenarios in an office environment.",
    category: "office",
    difficulty: "Beginner",
    duration: "60 minutes",
    requirements: ["Basic computer skills", "Organization"],
    skills_gained: ["Email management", "Scheduling", "Document processing"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  "sim-003": {
    id: "sim-003",
    title: "Retail Sales Associate",
    description: "Practice helping customers find products, processing transactions, and managing inventory.",
    category: "retail",
    difficulty: "Beginner",
    duration: "40 minutes",
    requirements: ["Communication skills", "Basic math"],
    skills_gained: ["Sales techniques", "Point of sale systems", "Inventory management"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  "sim-004": {
    id: "sim-004",
    title: "Healthcare Assistant",
    description: "Experience patient interaction scenarios and basic healthcare procedures.",
    category: "healthcare",
    difficulty: "Intermediate",
    duration: "75 minutes",
    requirements: ["Interest in healthcare", "Attention to detail"],
    skills_gained: ["Patient care", "Medical terminology", "Record keeping"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
};

const mockTasks = {
  "sim-001": [
    {
      id: "task-001",
      simulation_id: "sim-001",
      title: "Customer Greeting",
      description: "Learn how to properly greet customers and make them feel welcome.",
      order_number: 1,
      content: {
        type: "text",
        value: "In this task, you'll learn the importance of a proper greeting. First impressions matter! A warm, friendly greeting sets the tone for the entire customer interaction."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "task-002",
      simulation_id: "sim-001",
      title: "Handling Inquiries",
      description: "Practice responding to common customer questions and requests.",
      order_number: 2,
      content: {
        type: "text",
        value: "Customers will have many questions about products, services, and policies. In this module, you'll learn techniques for answering questions efficiently and accurately."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "task-003",
      simulation_id: "sim-001",
      title: "Resolving Complaints",
      description: "Learn strategies for de-escalating situations and resolving customer issues.",
      order_number: 3,
      content: {
        type: "text",
        value: "When customers are unhappy, your response can turn a negative experience into a positive one. This module covers the LAST method: Listen, Apologize, Solve, and Thank."
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};

const SimulationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [useMockData, setUseMockData] = useState(false);

  const { data: simulation, isLoading: isLoadingSimulation } = useQuery({
    queryKey: ['simulation', id],
    queryFn: () => id ? getJobSimulation(id) : Promise.reject('No simulation ID'),
    meta: {
      onError: (error: any) => {
        console.error("Error fetching simulation:", error);
        setUseMockData(true);
      }
    }
  });

  const { data: tasks, isLoading: isLoadingTasks } = useQuery({
    queryKey: ['simulationTasks', id],
    queryFn: () => id ? getSimulationTasks(id) : Promise.reject('No simulation ID'),
    enabled: !!simulation || useMockData,
    meta: {
      onError: (error: any) => {
        console.error("Error fetching tasks:", error);
        setUseMockData(true);
      }
    }
  });

  const { data: userProgress, isLoading: isLoadingProgress } = useQuery({
    queryKey: ['userProgress', id, user?.id],
    queryFn: () => (id && user?.id) ? getUserSimulationProgress(user.id, id) : Promise.reject('Missing ID'),
    enabled: !!user && !!id,
    meta: {
      onError: (error: any) => {
        console.error("Error fetching user progress:", error);
      }
    }
  });

  useEffect(() => {
    if (userProgress) {
      setProgress(userProgress.progress_percentage);
      
      if (tasks && tasks.length > 0 && userProgress.current_task_id) {
        const index = tasks.findIndex(task => task.id === userProgress.current_task_id);
        if (index !== -1) {
          setCurrentTaskIndex(index);
        }
      }
    }
  }, [userProgress, tasks]);

  const currentSimulation = useMockData && id ? mockSimulationData[id as keyof typeof mockSimulationData] : simulation;
  const currentTasks = useMockData && id ? mockTasks[id as keyof typeof mockTasks] || [] : tasks;

  const handleTaskCompletion = async () => {
    if (!user) {
      toast.error("Please sign in to track progress");
      return;
    }
    
    if (!currentTasks || currentTasks.length === 0) return;
    
    const nextTaskIndex = currentTaskIndex + 1;
    const isLastTask = nextTaskIndex >= currentTasks.length;
    const newProgress = isLastTask ? 100 : Math.round((nextTaskIndex / currentTasks.length) * 100);
    
    setProgress(newProgress);
    
    if (isLastTask) {
      toast.success("Simulation completed! 🎉", {
        description: "You've earned a new credential for your profile."
      });
    } else {
      setCurrentTaskIndex(nextTaskIndex);
    }
    
    if (!useMockData && userProgress && id) {
      try {
        await updateSimulationProgress(userProgress.id, {
          current_task_id: isLastTask ? undefined : currentTasks[nextTaskIndex].id,
          progress_percentage: newProgress,
          completed: isLastTask
        });
      } catch (error) {
        console.error("Error updating progress:", error);
        toast.error("Failed to save progress");
      }
    }
  };

  const isLoading = isLoadingSimulation || isLoadingTasks || (!!user && isLoadingProgress);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" className="mr-4" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-12 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
              <div className="h-40 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-60 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentSimulation) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Simulation not found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the simulation you're looking for.
          </p>
          <Button onClick={() => navigate('/job-simulations')}>
            View All Simulations
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <SimulationHeader simulation={currentSimulation} />
        
        <SimulationProgressBar progress={progress} showProgress={!!user} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks & Activities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <SimulationOverview 
                  simulation={currentSimulation} 
                  setActiveTab={setActiveTab} 
                />
              </TabsContent>
              
              <TabsContent value="tasks" className="space-y-6">
                <SimulationTasks 
                  tasks={currentTasks} 
                  currentTaskIndex={currentTaskIndex}
                  handleTaskCompletion={handleTaskCompletion}
                  setActiveTab={setActiveTab}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <SimulationGuideSidebar 
              tasks={currentTasks} 
              currentTaskIndex={currentTaskIndex} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimulationDetail;
