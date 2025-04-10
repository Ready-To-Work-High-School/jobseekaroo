
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle2, Calendar, Bell, ExternalLink } from 'lucide-react';
import { Job } from '@/types/job';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface ApplicationCompletionScreenProps {
  job: Job;
  onClose: () => void;
}

const ApplicationCompletionScreen: React.FC<ApplicationCompletionScreenProps> = ({ job, onClose }) => {
  // Trigger confetti animation on component mount
  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    
    const confettiAnimation = () => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) return;
      
      const particleCount = 50 * (timeLeft / duration);
      
      // Since the default export is not typed, we're using optional chaining
      confetti?.({
        particleCount,
        spread: 70,
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.5, 0.7) }
      });
      
      confetti?.({
        particleCount,
        spread: 70,
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.5, 0.7) }
      });
      
      requestAnimationFrame(confettiAnimation);
    };
    
    requestAnimationFrame(confettiAnimation);
    
    return () => {
      // Optional cleanup for when the component unmounts
      // confetti.reset();  // Not needed as confetti auto-clears
    };
  }, []);
  
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col items-center text-center py-6 space-y-6">
      <div className="rounded-full bg-green-100 p-3 animate-bounce">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Application Submitted!</h2>
        <p className="text-sm text-muted-foreground">
          You've successfully applied for:
        </p>
        <div className="font-medium text-xl">
          {job.title}
          <span className="text-sm text-muted-foreground block mt-1">
            at {job.company.name}
          </span>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 w-full border border-blue-100">
        <div className="flex items-center gap-2 text-blue-700 mb-3">
          <Sparkles className="h-5 w-5" />
          <span className="font-medium">What's next?</span>
        </div>
        <div className="space-y-4 text-left">
          <div className="flex items-start gap-3">
            <Calendar className="h-4 w-4 text-blue-600 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-700">Application Date</p>
              <p className="text-xs text-muted-foreground">{formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Bell className="h-4 w-4 text-blue-600 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-700">Stay Alert</p>
              <p className="text-xs text-muted-foreground">Keep an eye on your email for updates from {job.company.name}.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <ExternalLink className="h-4 w-4 text-blue-600 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-700">Track Your Application</p>
              <p className="text-xs text-muted-foreground">Visit your dashboard to monitor the status of your application.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 w-full">
        <Button onClick={onClose} className="w-full">
          Close
        </Button>
        <Button variant="outline" onClick={onClose} className="w-full">
          View All Applications
        </Button>
      </div>
    </div>
  );
};

export default ApplicationCompletionScreen;
