
import React from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';

interface SimulationEmptyStateProps {
  setSelectedCategory: (category: string) => void;
}

const SimulationEmptyState = ({ setSelectedCategory }: SimulationEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <Briefcase className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium mb-2">No simulations found</h3>
      <p className="text-muted-foreground mb-4">
        We couldn't find any simulations for the selected category.
      </p>
      <Button 
        variant="outline"
        onClick={() => setSelectedCategory('all')}
      >
        View All Simulations
      </Button>
    </div>
  );
};

export default SimulationEmptyState;
