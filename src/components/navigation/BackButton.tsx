
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="flex items-center text-muted-foreground hover:text-foreground"
      onClick={goBack}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      Back
    </Button>
  );
};

export default BackButton;
