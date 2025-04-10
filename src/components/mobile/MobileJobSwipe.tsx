
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobSwipeCard from '../job/JobSwipeCard';
import { useToast } from '@/hooks/use-toast';
import { useSlideIn } from '@/utils/animations';
import { Job } from '@/types/job';
import { searchJobsByZipCode } from '@/lib/mock-data/search';
import { Star, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileJobSwipe: React.FC = () => {
  const [currentJobs, setCurrentJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const { toast } = useToast();
  const slideIn = useSlideIn(300, 'right');
  
  React.useEffect(() => {
    loadJobs();
  }, []);
  
  const loadJobs = () => {
    setIsLoading(true);
    // Simulating API call to get jobs
    setTimeout(() => {
      const fetchedJobs = searchJobsByZipCode('', { 
        isRemote: undefined, 
        isFlexible: undefined
      });
      
      // Limit the number of jobs to display
      const limitedJobs = fetchedJobs.slice(0, 10);
      setCurrentJobs(limitedJobs);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSwipeLeft = (jobId: string) => {
    setSwipeDirection('left');
    setCurrentJobs(prev => prev.filter(job => job.id !== jobId));
    if (currentJobs.length <= 3) {
      loadJobs(); // Load more when running low
    }
  };
  
  const handleSwipeRight = (jobId: string) => {
    setSwipeDirection('right');
    toast({
      title: "Job saved! 🎉",
      description: "This job has been added to your saved jobs.",
      icon: <Star className="h-4 w-4 text-yellow-400" />
    });
    setCurrentJobs(prev => prev.filter(job => job.id !== jobId));
    if (currentJobs.length <= 3) {
      loadJobs(); // Load more when running low
    }
  };
  
  if (isLoading && currentJobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] flex-col">
        <motion.div 
          className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p 
          className="mt-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Finding awesome jobs for you...
        </motion.p>
      </div>
    );
  }
  
  return (
    <div className={`px-4 py-6 ${slideIn}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Swipe Jobs</h2>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="outline" size="icon" onClick={() => loadJobs()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      <div className="max-w-sm mx-auto relative h-[500px]">
        <AnimatePresence>
          {currentJobs.slice(0, 3).map((job, index) => (
            <motion.div
              key={job.id}
              className="absolute w-full"
              style={{ zIndex: currentJobs.length - index }}
              initial={{ scale: 0.95, y: 20 * index, opacity: 1 - (index * 0.15) }}
              animate={{ scale: 1 - (index * 0.05), y: 20 * index, opacity: 1 - (index * 0.15) }}
              exit={{ 
                x: swipeDirection === 'left' ? -300 : 300, 
                opacity: 0, 
                transition: { duration: 0.3 } 
              }}
              transition={{ duration: 0.3 }}
            >
              <JobSwipeCard 
                job={job} 
                onSwipeLeft={() => handleSwipeLeft(job.id)}
                onSwipeRight={() => handleSwipeRight(job.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {currentJobs.length === 0 && (
          <motion.div 
            className="text-center p-12 border-2 border-dashed rounded-xl border-gray-200 h-full flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <RefreshCw className="h-10 w-10 text-muted-foreground mb-4" />
            </motion.div>
            <p className="text-muted-foreground mb-4">No more jobs to display</p>
            <Button 
              className="px-4 py-2 bg-primary text-white rounded-lg"
              onClick={loadJobs}
            >
              Refresh Jobs
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MobileJobSwipe;
