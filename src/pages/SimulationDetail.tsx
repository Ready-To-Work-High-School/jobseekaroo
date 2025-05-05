
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

// Import needed components and utilities
import SimulationHeader from '@/components/job-simulations/SimulationHeader';
import SimulationOverview from '@/components/job-simulations/SimulationOverview';
import SimulationTasks from '@/components/job-simulations/SimulationTasks';
import { 
  getJobSimulation, 
  getSimulationTasks, 
  getUserSimulationProgress,
  updateSimulationProgress,
  startSimulation,
  createSimulationCredential
} from '@/lib/supabase/simulations';
import { awardBadge } from '@/utils/badge-utils';

const SimulationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fadeIn = useFadeIn(300);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [progressId, setProgressId] = useState<string | null>(null);

  // Fetch the simulation details
  const { data: simulation, isLoading: simulationLoading } = useQuery({
    queryKey: ['simulation', id],
    queryFn: () => id ? getJobSimulation(id) : null,
    enabled: !!id
  });

  // Fetch simulation tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['simulationTasks', id],
    queryFn: () => id ? getSimulationTasks(id) : [],
    enabled: !!id
  });

  // Fetch user progress if signed in
  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ['simulationProgress', id, user?.id],
    queryFn: async () => {
      if (!user || !id) return null;
      
      // Try to get existing progress
      const existingProgress = await getUserSimulationProgress(user.id, id);
      
      // If no progress exists, create a new progress record
      if (!existingProgress) {
        try {
          await startSimulation(user.id, id);
          return await getUserSimulationProgress(user.id, id);
        } catch (error) {
          console.error("Error starting simulation:", error);
          return null;
        }
      }
      
      return existingProgress;
    },
    enabled: !!id && !!user
  });

  // Set up the current task index based on progress
  useEffect(() => {
    if (progress && tasks && tasks.length > 0) {
      // If there's a current task ID, find its index
      if (progress.current_task_id) {
        const index = tasks.findIndex(task => task.id === progress.current_task_id);
        if (index >= 0) {
          setCurrentTaskIndex(index);
        }
      }
      
      // Save progress ID for updates
      if (progress.id) {
        setProgressId(progress.id);
      }
      
      // If completed, show tasks tab
      if (progress.completed) {
        setActiveTab('tasks');
      }
    }
  }, [progress, tasks]);

  // Handle task completion
  const handleTaskCompletion = async () => {
    if (!user) {
      toast.error("Please sign in to track your progress");
      navigate('/sign-in');
      return;
    }
    
    if (!progressId || !tasks || tasks.length === 0 || !simulation) {
      toast.error("Unable to update progress");
      return;
    }
    
    try {
      const isLastTask = currentTaskIndex >= tasks.length - 1;
      const nextIndex = isLastTask ? currentTaskIndex : currentTaskIndex + 1;
      const progressPercentage = Math.round(((nextIndex + 1) / tasks.length) * 100);
      
      // Update progress in database
      await updateSimulationProgress(progressId, {
        current_task_id: isLastTask ? null : tasks[nextIndex].id,
        progress_percentage: progressPercentage,
        completed: isLastTask
      });
      
      // If this is the last task, award a credential and badge
      if (isLastTask) {
        // Generate a unique certificate ID
        const certificateId = `CERT-${Date.now().toString(36).toUpperCase()}`;
        
        // Create a simulation credential
        await createSimulationCredential(user.id, simulation.id, certificateId);
        
        // Award a badge for completing the simulation
        const badgeId = `simulation_${simulation.id.split('-')[0]}`;
        const badgeName = `${simulation.title} Specialist`;
        await awardBadge(user.id, badgeId, badgeName);
        
        toast.success("Congratulations! You've completed this simulation", {
          description: "You've earned a credential and badge for your profile"
        });
        
        // Navigate to credentials page
        navigate('/credentials');
      } else {
        setCurrentTaskIndex(nextIndex);
        toast.success(`Task ${currentTaskIndex + 1} completed!`, {
          description: `${tasks.length - (currentTaskIndex + 1)} tasks remaining`
        });
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Failed to update progress");
    }
  };

  if (simulationLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-1/2 mb-4" />
          <Skeleton className="h-6 w-full mb-8" />
          <Skeleton className="h-64 w-full rounded-md" />
        </div>
      </Layout>
    );
  }

  if (!simulation) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Simulation Not Found</h1>
          <p className="mb-8">We couldn't find the simulation you're looking for.</p>
          <Button onClick={() => navigate('/job-simulations')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Simulations
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        {/* Simulation Header */}
        <SimulationHeader simulation={simulation} />
        
        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <SimulationOverview simulation={simulation} setActiveTab={setActiveTab} />
          </TabsContent>
          
          {/* Tasks Tab */}
          <TabsContent value="tasks" className="mt-6">
            {tasksLoading ? (
              <Card>
                <CardContent className="pt-6">
                  <Skeleton className="h-8 w-1/3 mb-4" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-2/3 mb-6" />
                  <Skeleton className="h-32 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ) : (
              <SimulationTasks 
                tasks={tasks} 
                currentTaskIndex={currentTaskIndex}
                handleTaskCompletion={handleTaskCompletion}
                setActiveTab={setActiveTab}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SimulationDetail;
