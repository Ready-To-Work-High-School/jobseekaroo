
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const SimulationLoadingSkeleton = () => {
  return (
    <Card className="animate-pulse">
      <CardHeader className="pb-2">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-2/3"></div>
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </CardContent>
      <CardFooter>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </CardFooter>
    </Card>
  );
};

export default SimulationLoadingSkeleton;
