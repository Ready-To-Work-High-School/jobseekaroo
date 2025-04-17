
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Award } from 'lucide-react';
import { JobSimulation } from '@/types/jobSimulation';

interface SimulationOverviewProps {
  simulation: JobSimulation;
  setActiveTab: (tab: string) => void;
}

const SimulationOverview = ({ simulation, setActiveTab }: SimulationOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills You'll Gain</CardTitle>
        <CardDescription>
          These are the key competencies you'll develop in this simulation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {simulation?.skills_gained.map((skill, index) => (
            <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
              {skill}
            </Badge>
          ))}
        </div>
        
        <Separator className="my-6" />
        
        <h3 className="font-medium mb-3">Requirements</h3>
        <ul className="space-y-2 mb-6">
          {simulation?.requirements.map((req, index) => (
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
  );
};

export default SimulationOverview;
