
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { getJobSimulation, getSimulationTasks, getUserSimulationProgress, updateSimulationProgress } from '@/lib/supabase/simulations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle, Clock, Award } from 'lucide-react';

// Mock data for the simulation detail page if needed
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

  // Fetch simulation details
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

  // Fetch simulation tasks
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

  // Fetch user progress if logged in
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
      
      // Find the current task index based on the current_task_id
      if (tasks && tasks.length > 0 && userProgress.current_task_id) {
        const index = tasks.findIndex(task => task.id === userProgress.current_task_id);
        if (index !== -1) {
          setCurrentTaskIndex(index);
        }
      }
    }
  }, [userProgress, tasks]);

  // Use mock data if needed
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
    
    // Update progress in database if not using mock data
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

  // Loading state
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

  // Error state - if simulation doesn't exist
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
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate('/job-simulations')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Simulations
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">{currentSimulation?.category}</Badge>
            <Badge variant="secondary">
              <Clock className="h-3 w-3 mr-1" />
              {currentSimulation?.duration}
            </Badge>
            <Badge variant={
              currentSimulation?.difficulty === "Beginner" ? "secondary" : 
              currentSimulation?.difficulty === "Intermediate" ? "outline" : 
              "default"
            }>
              {currentSimulation?.difficulty}
            </Badge>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{currentSimulation?.title}</h1>
          <p className="text-muted-foreground">{currentSimulation?.description}</p>
        </div>

        {/* Progress bar */}
        {user && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Your progress</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks & Activities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills You'll Gain</CardTitle>
                    <CardDescription>
                      These are the key competencies you'll develop in this simulation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentSimulation?.skills_gained.map((skill, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="font-medium mb-3">Requirements</h3>
                    <ul className="space-y-2 mb-6">
                      {currentSimulation?.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <div className="text-center">
                      <Award className="h-12 w-12 mx-auto text-amber-500 mb-4" />
                      <h3 className="font-medium mb-2">Earn a Certificate</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Complete this simulation to earn a digital certificate you can add to your profile and resume.
                      </p>
                      <Button onClick={() => setActiveTab('tasks')}>Start Simulation</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tasks" className="space-y-6">
                {currentTasks && currentTasks.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        Task {currentTaskIndex + 1} of {currentTasks.length}: {currentTasks[currentTaskIndex].title}
                      </CardTitle>
                      <CardDescription>
                        {currentTasks[currentTaskIndex].description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p>{currentTasks[currentTaskIndex].content.value || currentTasks[currentTaskIndex].content}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={handleTaskCompletion}
                      >
                        {currentTaskIndex < currentTasks.length - 1 ? "Complete & Continue" : "Complete Simulation"}
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <p className="mb-4">No tasks available for this simulation yet.</p>
                        <Button variant="outline" onClick={() => setActiveTab('overview')}>
                          Return to Overview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Simulation Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">How to complete this simulation:</h3>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2 pl-4">
                    <li>Read through each task carefully</li>
                    <li>Complete the activities for each section</li>
                    <li>Mark tasks complete when you're done</li>
                    <li>Receive your credential after completing all tasks</li>
                  </ol>
                </div>
                
                <Separator />
                
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Task List:</h3>
                  <div className="space-y-2">
                    {currentTasks && currentTasks.map((task, index) => (
                      <div key={task.id} className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          index < currentTaskIndex 
                            ? "bg-green-100 text-green-700 border border-green-200" 
                            : index === currentTaskIndex
                              ? "bg-blue-100 text-blue-700 border border-blue-200"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}>
                          {index < currentTaskIndex ? <CheckCircle className="h-4 w-4" /> : index + 1}
                        </div>
                        <span className={`text-sm ${
                          index === currentTaskIndex ? "font-medium" : "text-muted-foreground"
                        }`}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimulationDetail;
