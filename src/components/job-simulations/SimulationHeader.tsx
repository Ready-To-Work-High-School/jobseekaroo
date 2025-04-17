
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowLeft } from 'lucide-react';
import { JobSimulation } from '@/types/jobSimulation';
import { useNavigate } from 'react-router-dom';

interface SimulationHeaderProps {
  simulation: JobSimulation;
}

const SimulationHeader = ({ simulation }: SimulationHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" onClick={() => navigate('/job-simulations')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            All Simulations
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">{simulation?.category}</Badge>
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            {simulation?.duration}
          </Badge>
          <Badge variant={
            simulation?.difficulty === "Beginner" ? "secondary" : 
            simulation?.difficulty === "Intermediate" ? "outline" : 
            "default"
          }>
            {simulation?.difficulty}
          </Badge>
        </div>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{simulation?.title}</h1>
        <p className="text-muted-foreground">{simulation?.description}</p>
      </div>
    </>
  );
};

export default SimulationHeader;
