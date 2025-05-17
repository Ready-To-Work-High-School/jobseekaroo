
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SignUpPromptProps {
  message?: string;
  autoDismiss?: boolean;
  dismissTime?: number; // in milliseconds
}

const SignUpPrompt: React.FC<SignUpPromptProps> = ({ 
  message = "Sign up to access all features",
  autoDismiss = false,
  dismissTime = 3000
}) => {
  const { user } = useAuth();
  const [dismissed, setDismissed] = React.useState(false);
  
  // Auto-dismiss after specified time if autoDismiss is true
  React.useEffect(() => {
    if (autoDismiss && !dismissed && !user) {
      const timer = setTimeout(() => {
        setDismissed(true);
      }, dismissTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissed, user, dismissTime]);

  if (user || dismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 p-4 bg-primary text-primary-foreground rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-medium mb-3">{message}</p>
          <div className="flex space-x-3">
            <Button asChild variant="secondary" size="sm">
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 rounded-full" 
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPrompt;
