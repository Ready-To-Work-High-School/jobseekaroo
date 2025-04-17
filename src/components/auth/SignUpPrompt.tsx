
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SignUpPromptProps {
  autoDismiss?: boolean;
  dismissTime?: number;
}

const SignUpPrompt: React.FC<SignUpPromptProps> = ({ 
  autoDismiss = false,
  dismissTime = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, dismissTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissTime]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 inset-x-0 p-4 bg-background border-t shadow-lg z-50 animate-in slide-in-from-bottom">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm md:text-base">
          Create an account to save jobs and access all features
        </p>
        <div className="flex items-center gap-2 ml-4">
          <Button asChild size="sm">
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPrompt;
