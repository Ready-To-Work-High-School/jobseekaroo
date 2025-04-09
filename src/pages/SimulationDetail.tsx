
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle, Award, Clock, FileText, List, Target } from 'lucide-react';
import { 
  getJobSimulation, 
  getSimulationTasks, 
  getUserSimulationProgress,
  startSimulation,
  updateSimulationProgress,
  completeSimulation 
} from '@/lib/supabase/simulations';
import { JobSimulation, SimulationTask, UserSimulationProgress } from '@/types/jobSimulation';

const SimulationDetail = () => {
  const fadeIn = useFadeIn(300);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  // Fetch simulation details
  const { 
    data: simulation,
    isLoading: isLoadingSimulation 
  } = useQuery({
    queryKey: ['jobSimulation', id],
    queryFn: () => id ? getJobSimulation(id) : Promise.reject('No simulation ID'),
    enabled: !!id
  });

  // Fetch simulation tasks
  const { 
    data: tasks,
    isLoading: isLoadingTasks 
  } = useQuery({
    queryKey: ['simulationTasks', id],
    queryFn: () => id ? getSimulationTasks(id) : Promise.reject('No simulation ID'),
    enabled: !!id
  });

  // Fetch user progress if logged in
  const { 
    data: userProgress,
    isLoading: isLoadingProgress 
  } = useQuery({
    queryKey: ['userProgress', id, user?.id],
    queryFn: () => user && id ? getUserSimulationProgress(user.id, id) : Promise.reject('Not authenticated'),
    enabled: !!user && !!id
  });

  // Mutation to start a simulation
  const startSimulationMutation = useMutation({
    mutationFn: async () => {
      if (!user || !id || !tasks || tasks.length === 0) return null;
      return startSimulation(user.id, id, tasks[0].id);
    },
    onSuccess: (data) => {
      if (data) {
        toast.success('Simulation started!', {
          description: 'Your progress will be saved automatically.'
        });
        queryClient.invalidateQueries({ queryKey: ['userProgress', id, user?.id] });
      }
    },
    onError: (error) => {
      toast.error('Failed to start simulation', {
        description: 'Please try again later.'
      });
      console.error('Error starting simulation:', error);
    }
  });

  // Mutation to update progress
  const updateProgressMutation = useMutation({
    mutationFn: async ({ progressId, updates }: { progressId: string, updates: Partial<UserSimulationProgress> }) => {
      return updateSimulationProgress(progressId, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress', id, user?.id] });
    },
    onError: (error) => {
      toast.error('Failed to update progress', {
        description: 'Please try again later.'
      });
      console.error('Error updating progress:', error);
    }
  });

  // Mutation to complete simulation
  const completeSimulationMutation = useMutation({
    mutationFn: async (progressId: string) => {
      return completeSimulation(progressId);
    },
    onSuccess: () => {
      toast.success('Simulation completed!', {
        description: 'You have earned a credential for this simulation.'
      });
      queryClient.invalidateQueries({ queryKey: ['userProgress', id, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['userCredentials', user?.id] });
    },
    onError: (error) => {
      toast.error('Failed to complete simulation', {
        description: 'Please try again later.'
      });
      console.error('Error completing simulation:', error);
    }
  });

  // Handle task completion
  const handleCompleteTask = () => {
    if (!userProgress || !tasks) return;
    
    const nextTaskIndex = currentTaskIndex + 1;
    const isLastTask = nextTaskIndex >= tasks.length;
    
    if (isLastTask) {
      completeSimulationMutation.mutate(userProgress.id);
    } else {
      const nextTask = tasks[nextTaskIndex];
      const progressPercentage = Math.round((nextTaskIndex / tasks.length) * 100);
      
      updateProgressMutation.mutate({
        progressId: userProgress.id,
        updates: {
          current_task_id: nextTask.id,
          progress_percentage: progressPercentage
        }
      });
      
      setCurrentTaskIndex(nextTaskIndex);
    }
  };

  // Set current task index based on user progress
  useEffect(() => {
    if (userProgress && tasks && tasks.length > 0) {
      const currentTaskId = userProgress.current_task_id;
      const foundIndex = tasks.findIndex(task => task.id === currentTaskId);
      if (foundIndex !== -1) {
        setCurrentTaskIndex(foundIndex);
      }
    }
  }, [userProgress, tasks]);

  const isLoading = isLoadingSimulation || isLoadingTasks || (user && isLoadingProgress);

  // Determine if the user has completed the simulation
  const isCompleted = userProgress?.completed || false;

  // Determine if the user can start the simulation
  const canStartSimulation = !userProgress && user;

  // Get current task
  const currentTask = tasks && tasks.length > currentTaskIndex ? tasks[currentTaskIndex] : null;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="h-10 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                
                <div className="h-10 bg-gray-200 rounded w-1/4 my-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div>
                <div className="h-60 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
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
          <h1 className="text-2xl font-bold mb-4">Simulation Not Found</h1>
          <p className="mb-8">The simulation you are looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate('/job-simulations')}>
            Back to Simulations
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        {/* Back button and title */}
        <Button 
          variant="ghost" 
          className="mb-4 p-0 flex items-center gap-1 hover:bg-transparent"
          onClick={() => navigate('/job-simulations')}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Simulations</span>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{simulation.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              <Badge variant="outline" className="capitalize">{simulation.category}</Badge>
              <Badge variant={simulation.difficulty === "Beginner" ? "secondary" : 
                      simulation.difficulty === "Intermediate" ? "outline" : "default"}>
                {simulation.difficulty}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {simulation.duration}
              </span>
            </div>
          </div>

          {userProgress && (
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">{userProgress.progress_percentage}% Complete</span>
                {isCompleted && (
                  <Badge variant="success" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" /> Completed
                  </Badge>
                )}
              </div>
              <Progress value={userProgress.progress_percentage} className="w-48" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">
                  <FileText className="h-4 w-4 mr-1" /> Overview
                </TabsTrigger>
                <TabsTrigger value="tasks" disabled={!userProgress}>
                  <List className="h-4 w-4 mr-1" /> Tasks
                </TabsTrigger>
                {isCompleted && (
                  <TabsTrigger value="certificate">
                    <Award className="h-4 w-4 mr-1" /> Certificate
                  </TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="overview" className="p-4">
                <h2 className="text-xl font-semibold mb-3">About this Simulation</h2>
                <p className="mb-6">{simulation.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Skills You'll Gain</h3>
                    <ul className="space-y-1">
                      {simulation.skills_gained.map((skill, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {simulation.requirements && simulation.requirements.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Requirements</h3>
                      <ul className="space-y-1">
                        {simulation.requirements.map((req, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-blue-500" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {canStartSimulation && (
                  <Button 
                    onClick={() => startSimulationMutation.mutate()}
                    disabled={startSimulationMutation.isPending}
                  >
                    Start This Simulation
                  </Button>
                )}
              </TabsContent>

              <TabsContent value="tasks" className="p-4">
                {tasks && tasks.length > 0 ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">
                        Task {currentTaskIndex + 1} of {tasks.length}
                      </h2>
                      <div className="flex items-center">
                        <Progress value={((currentTaskIndex + (isCompleted ? 1 : 0)) / tasks.length) * 100} className="w-32 mr-2" />
                        <span className="text-sm">
                          {((currentTaskIndex + (isCompleted ? 1 : 0)) / tasks.length) * 100}%
                        </span>
                      </div>
                    </div>

                    {currentTask && !isCompleted && (
                      <Card>
                        <CardHeader>
                          <CardTitle>{currentTask.title}</CardTitle>
                          <CardDescription>{currentTask.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="prose max-w-none">
                            {/* Render task content based on the content type */}
                            <div className="p-4 border rounded bg-gray-50">
                              <h3 className="text-lg font-medium mb-2">Task Instructions</h3>
                              <p className="mb-4">This is where the detailed task instructions would be displayed. The content would be stored as structured JSON in the database and rendered appropriately based on the task type.</p>
                              <div className="bg-white p-4 border rounded">
                                <h4 className="font-medium mb-2">Sample Exercise</h4>
                                <p>Complete the following exercise to practice the skills related to this task.</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={handleCompleteTask}>
                            {currentTaskIndex === tasks.length - 1 ? 'Complete Simulation' : 'Complete Task & Continue'}
                          </Button>
                        </CardFooter>
                      </Card>
                    )}

                    {isCompleted && (
                      <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                          <Award className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">Simulation Completed!</h3>
                        <p className="text-muted-foreground mb-4">
                          Congratulations! You've successfully completed all tasks in this simulation.
                        </p>
                        <Button 
                          variant="outline"
                          onClick={() => setActiveTab('certificate')}
                        >
                          View Your Certificate
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p>No tasks found for this simulation.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="certificate" className="p-4">
                <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-lg p-8 text-center">
                  <div className="mb-6">
                    <Award className="h-16 w-16 text-blue-600 mx-auto" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Certificate of Completion</h2>
                  <Separator className="my-4 mx-auto w-24" />
                  <p className="text-lg mb-2">This certifies that</p>
                  <p className="text-xl font-bold mb-2">{user?.email?.split('@')[0] || 'Student'}</p>
                  <p className="text-lg mb-4">has successfully completed</p>
                  <p className="text-xl font-bold mb-2">{simulation.title}</p>
                  <p className="text-md text-muted-foreground mb-6">
                    Demonstrating proficiency in: {simulation.skills_gained.join(', ')}
                  </p>
                  <Separator className="my-4 mx-auto w-24" />
                  <p className="text-sm text-muted-foreground">
                    Issued on {new Date().toLocaleDateString()}
                  </p>
                  <div className="mt-8">
                    <Button>Download Certificate</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Simulation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-sm mb-1">Category</h3>
                    <p>{simulation.category}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">Difficulty</h3>
                    <p>{simulation.difficulty}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">Duration</h3>
                    <p>{simulation.duration}</p>
                  </div>
                  
                  {tasks && (
                    <div>
                      <h3 className="font-medium text-sm mb-1">Tasks</h3>
                      <p>{tasks.length} tasks to complete</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {!userProgress && !user && (
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => navigate('/sign-in')}
                  >
                    Sign In to Start
                  </Button>
                )}
                
                {userProgress && !isCompleted && (
                  <Button 
                    className="w-full"
                    onClick={() => setActiveTab('tasks')}
                  >
                    {userProgress.progress_percentage > 0 ? 'Continue Simulation' : 'Start Simulation'}
                  </Button>
                )}
                
                {isCompleted && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab('certificate')}
                  >
                    View Certificate
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimulationDetail;
