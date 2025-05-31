
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SimulationTask } from '@/types/jobSimulation';
import { Clock, Target, CheckCircle } from 'lucide-react';

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

  const currentTask = tasks[currentTaskIndex];
  const taskContent = typeof currentTask.content === 'string' 
    ? currentTask.content 
    : currentTask.content?.details || currentTask.content?.value || 'Task content loading...';

  const taskScenario = typeof currentTask.content === 'object' && currentTask.content?.scenario
    ? currentTask.content.scenario
    : null;

  const taskGoal = typeof currentTask.content === 'object' && currentTask.content?.task
    ? currentTask.content.task
    : null;

  const taskType = typeof currentTask.content === 'object' && currentTask.content?.type
    ? currentTask.content.type
    : 'practical';

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Task Progress</span>
            </div>
            <Badge variant="outline">
              {currentTaskIndex + 1} of {tasks.length}
            </Badge>
          </div>
          <div className="flex gap-2 mt-2">
            {tasks.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded ${
                  index <= currentTaskIndex ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Current Task */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                {currentTask.title}
              </CardTitle>
              <CardDescription className="mt-1">
                {currentTask.description}
              </CardDescription>
            </div>
            <Badge variant={
              taskType === 'interactive' ? 'default' :
              taskType === 'educational' ? 'secondary' :
              taskType === 'practical' ? 'outline' :
              taskType === 'creative' ? 'destructive' :
              taskType === 'analytical' ? 'outline' : 'secondary'
            }>
              {taskType}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {taskScenario && (
            <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Scenario
              </h4>
              <p className="text-sm">{taskScenario}</p>
            </div>
          )}
          
          {taskGoal && (
            <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-600" />
                Your Task
              </h4>
              <p className="text-sm font-medium">{taskGoal}</p>
            </div>
          )}
          
          <div className="prose max-w-none">
            <h4 className="font-medium mb-2">Instructions</h4>
            <p className="text-sm leading-relaxed">{taskContent}</p>
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
    </div>
  );
};

export default SimulationTasks;
