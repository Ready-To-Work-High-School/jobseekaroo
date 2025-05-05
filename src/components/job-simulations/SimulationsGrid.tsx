
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Bot, Stethoscope } from 'lucide-react';
import { JobSimulation } from '@/types/jobSimulation';
import SimulationCard from './SimulationCard';

interface SimulationsGridProps {
  simulations: JobSimulation[] | undefined;
  isLoading: boolean;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SimulationsGrid = ({ simulations, isLoading, selectedCategory, setSelectedCategory }: SimulationsGridProps) => {
  const navigate = useNavigate();

  // Filter simulations based on selected category
  const filteredSimulations = simulations?.filter(
    sim => selectedCategory === 'all' || sim.category === selectedCategory
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-3/4 mb-1" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (!filteredSimulations || filteredSimulations.length === 0) {
    return (
      <Card className="text-center p-8">
        <div className="mx-auto w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-yellow-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">No Simulations Found</h3>
        <p className="text-muted-foreground mb-6">
          {selectedCategory === 'all' 
            ? "We don't have any job simulations available at the moment." 
            : `No ${selectedCategory} simulations found. Try selecting a different category.`}
        </p>
        {selectedCategory !== 'all' && (
          <Button onClick={() => setSelectedCategory('all')}>
            View All Simulations
          </Button>
        )}
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Healthcare Simulation */}
        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Healthcare Assistant</h3>
                  <p className="text-sm text-muted-foreground">Interactive patient care simulation</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Experience the role of a healthcare assistant providing patient support and
              information in a clinical setting.
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">Patient Communication</span>
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded">Healthcare Admin</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => navigate('/healthcare-simulation')}
            >
              Try Demo
            </Button>
          </CardFooter>
        </Card>

        {/* AI Assistant Simulation */}
        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <Bot className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">Virtual AI support agent simulation</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Learn to provide exceptional customer support using AI tools and techniques in this
              interactive simulation.
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded">AI Tools</span>
              <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded">Customer Support</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              variant="outline"
              onClick={() => navigate('/job-simulations')}
            >
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
        
        {/* Map real simulations from the database */}
        {filteredSimulations.map((simulation) => (
          <SimulationCard key={simulation.id} simulation={simulation} />
        ))}
      </div>
    </div>
  );
};

export default SimulationsGrid;
