
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InterviewTypeSelectorProps {
  category: 'entry' | 'retail' | 'food';
  onCategoryChange: (newCategory: 'entry' | 'retail' | 'food') => void;
}

const InterviewTypeSelector: React.FC<InterviewTypeSelectorProps> = ({
  category,
  onCategoryChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Type</CardTitle>
        <CardDescription>Select the type of interview to practice</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant={category === 'entry' ? 'default' : 'outline'} 
          className="w-full justify-start"
          onClick={() => onCategoryChange('entry')}
        >
          Entry Level (General)
        </Button>
        
        <Button 
          variant={category === 'retail' ? 'default' : 'outline'} 
          className="w-full justify-start"
          onClick={() => onCategoryChange('retail')}
        >
          Retail Positions
        </Button>
        
        <Button 
          variant={category === 'food' ? 'default' : 'outline'} 
          className="w-full justify-start"
          onClick={() => onCategoryChange('food')}
        >
          Food Service
        </Button>
      </CardContent>
    </Card>
  );
};

export default InterviewTypeSelector;
