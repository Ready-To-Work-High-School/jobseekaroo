
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProgressDemo = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Bar Demo</CardTitle>
        <CardDescription>
          Demonstrating animated gradient progress bars
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Standard Progress Bar</h3>
          <Progress value={progress} className="h-3" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Animated Gradient (Lavender, Gold, Purple)</h3>
          <Progress value={progress} className="h-3 progress-lavender-gold-purple" />
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setProgress(p => Math.max(0, p - 10))} 
            variant="outline"
            disabled={progress <= 0}
          >
            Decrease
          </Button>
          
          <Button 
            onClick={() => setProgress(p => Math.min(100, p + 10))}
            variant="default"
            disabled={progress >= 100}
          >
            Increase
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressDemo;
