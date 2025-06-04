import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { JobSimulation } from '@/types/jobSimulation';
import { toast } from "sonner";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { startSimulation } from '@/lib/supabase/simulations';

interface SimulationCardProps {
  simulation: JobSimulation;
}

const SimulationCard = ({ simulation }: SimulationCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Handle starting a simulation
  const handleStartSimulation = async (simulation: JobSimulation) => {
    if (!user) {
      toast.error("Please sign in to start a simulation", {
        description: "You need to be signed in to track your progress"
      });
      return;
    }
    
    try {
      await startSimulation(user.id, simulation.id);
      toast.success(`Started: ${simulation.title}`, {
        description: "Your progress will be saved automatically"
      });
      navigate(`/job-simulations/${simulation.id}`);
    } catch (error) {
      console.error("Error starting simulation:", error);
      toast.error("Failed to start simulation", {
        description: "Please try again later"
      });
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="capitalize">{simulation.category}</Badge>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">{simulation.duration}</span>
            <Badge variant={simulation.difficulty === "Beginner" ? "secondary" : 
                    simulation.difficulty === "Intermediate" ? "outline" : "default"}>
              {simulation.difficulty}
            </Badge>
          </div>
        </div>
        <CardTitle className="mt-2">{simulation.title}</CardTitle>
        <CardDescription className="line-clamp-2">{simulation.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <h4 className="text-sm font-semibold mb-1">Skills you'll gain:</h4>
          <div className="flex flex-wrap gap-1">
            {simulation.skills_gained.map((skill, i) => (
              <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Practical work experience</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Self-paced learning</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Downloadable certificate</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => handleStartSimulation(simulation)}
        >
          Start Simulation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimulationCard;
