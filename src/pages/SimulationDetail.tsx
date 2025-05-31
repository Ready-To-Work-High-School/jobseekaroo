
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
import { jobSimulations, simulationTasks } from '@/data/jobSimulations';

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
    queryFn: async () => {
      if (!id) return null;
      
      try {
        const dbSimulation = await getJobSimulation(id);
        if (dbSimulation) return dbSimulation;
        
        // Fallback to mock data
        const mockSimulation = jobSimulations.find(sim => sim.id === id);
        if (mockSimulation) {
          setUseMockData(true);
          return mockSimulation;
        }
        
        return null;
      } catch (error) {
        console.error("Error fetching simulation:", error);
        // Try mock data on error
        const mockSimulation = jobSimulations.find(sim => sim.id === id);
        if (mockSimulation) {
          setUseMockData(true);
          return mockSimulation;
        }
        return null;
      }
    }
  });

  const { data: tasks, isLoading: isLoadingTasks } = useQuery({
    queryKey: ['simulationTasks', id],
    queryFn: async () => {
      if (!id) return [];
      
      try {
        if (useMockData || !simulation) {
          // Use mock task data
          return simulationTasks[id] || [];
        }
        
        const dbTasks = await getSimulationTasks(id);
        if (dbTasks && dbTasks.length > 0) return dbTasks;
        
        // Fallback to mock tasks
        return simulationTasks[id] || [];
      } catch (error) {
        console.error("Error fetching tasks:", error);
        return simulationTasks[id] || [];
      }
    },
    enabled: !!simulation || !!id
  });

  const { data: userProgress, isLoading: isLoadingProgress } = useQuery({
    queryKey: ['userProgress', id, user?.id],
    queryFn: () => (id && user?.id) ? getUserSimulationProgress(user.id, id) : Promise.reject('Missing ID'),
    enabled: !!user && !!id && !useMockData,
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

  const handleTaskCompletion = async () => {
    if (!user) {
      toast.error("Please sign in to track progress");
      return;
    }
    
    if (!tasks || tasks.length === 0) return;
    
    const nextTaskIndex = currentTaskIndex + 1;
    const isLastTask = nextTaskIndex >= tasks.length;
    const newProgress = isLastTask ? 100 : Math.round((nextTaskIndex / tasks.length) * 100);
    
    setProgress(newProgress);
    
    if (isLastTask) {
      toast.success("Simulation completed! 🎉", {
        description: "You've earned a new credential for your profile."
      });
    } else {
      setCurrentTaskIndex(nextTaskIndex);
    }
    
    // Only update database if not using mock data
    if (!useMockData && userProgress && userProgress.id) {
      try {
        await updateSimulationProgress(userProgress.id, {
          current_task_id: isLastTask ? undefined : tasks[nextTaskIndex].id,
          progress_percentage: newProgress,
          completed: isLastTask
        });
      } catch (error) {
        console.error("Error updating progress:", error);
        toast.error("Failed to save progress");
      }
    }
  };

  const isLoading = isLoadingSimulation || isLoadingTasks || (!!user && !useMockData && isLoadingProgress);

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

  if (!simulation) {
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
        <SimulationHeader simulation={simulation} />
        
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
                  simulation={simulation} 
                  setActiveTab={setActiveTab} 
                />
              </TabsContent>
              
              <TabsContent value="tasks" className="space-y-6">
                <SimulationTasks 
                  tasks={tasks} 
                  currentTaskIndex={currentTaskIndex}
                  handleTaskCompletion={handleTaskCompletion}
                  setActiveTab={setActiveTab}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <SimulationGuideSidebar 
              tasks={tasks} 
              currentTaskIndex={currentTaskIndex} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimulationDetail;
