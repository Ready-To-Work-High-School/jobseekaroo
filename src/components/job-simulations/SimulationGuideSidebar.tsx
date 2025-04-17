
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { SimulationTask } from '@/types/jobSimulation';

interface SimulationGuideSidebarProps {
  tasks: SimulationTask[] | undefined;
  currentTaskIndex: number;
}

const SimulationGuideSidebar = ({ tasks, currentTaskIndex }: SimulationGuideSidebarProps) => {
  return (
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
            {tasks && tasks.map((task, index) => (
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
  );
};

export default SimulationGuideSidebar;
