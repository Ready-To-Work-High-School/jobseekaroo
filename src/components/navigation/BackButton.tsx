
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group ${className}`}
      onClick={handleGoBack}
    >
      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
      Back
    </Button>
  );
};

export default BackButton;
