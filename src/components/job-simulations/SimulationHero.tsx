
import React from 'react';
import { Badge } from '@/components/ui/badge';

const SimulationHero = () => {
  return (
    <div className="text-center mb-12">
      <Badge className="mb-2">Career Development</Badge>
      <h1 className="text-4xl font-bold mb-4">Job Simulations Platform</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Gain practical work experience through interactive simulations designed to develop 
        the skills employers are looking for in today's job market.
      </p>
    </div>
  );
};

export default SimulationHero;
