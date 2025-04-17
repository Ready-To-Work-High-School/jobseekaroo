
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SimulationTask } from '@/types/jobSimulation';

interface SimulationTasksProps {
  tasks: SimulationTask[] | undefined;
  currentTaskIndex: number;
  handleTaskCompletion: () => void;
  setActiveTab: (tab: string) => void;
}

const SimulationTasks = ({ tasks, currentTaskIndex, handleTaskCompletion, setActiveTab }: SimulationTasksProps) => {
  if (!tasks || tasks.length === 0) {
    return (
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
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Task {currentTaskIndex + 1} of {tasks.length}: {tasks[currentTaskIndex].title}
        </CardTitle>
        <CardDescription>
          {tasks[currentTaskIndex].description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <p>{tasks[currentTaskIndex].content.value || tasks[currentTaskIndex].content}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleTaskCompletion}
        >
          {currentTaskIndex < tasks.length - 1 ? "Complete & Continue" : "Complete Simulation"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimulationTasks;
