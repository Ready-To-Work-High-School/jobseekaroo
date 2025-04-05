
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobSwipeCard from '../job/JobSwipeCard';
import { useToast } from '@/hooks/use-toast';
import { useSlideIn } from '@/utils/animations';
import { Job } from '@/types/job';
import { searchJobsByZipCode } from '@/lib/mock-data/search';

const MobileJobSwipe: React.FC = () => {
  const [currentJobs, setCurrentJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const slideIn = useSlideIn(300, 'right');
  
  React.useEffect(() => {
    loadJobs();
  }, []);
  
  const loadJobs = () => {
    setIsLoading(true);
    // Simulating API call to get jobs
    setTimeout(() => {
      // Using searchJobsByZipCode with correct parameter format - removed maxResults
      const fetchedJobs = searchJobsByZipCode('', { 
        // Using only valid properties defined in JobSearchFilters type
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
    setCurrentJobs(prev => prev.filter(job => job.id !== jobId));
    if (currentJobs.length <= 3) {
      loadJobs(); // Load more when running low
    }
  };
  
  const handleSwipeRight = (jobId: string) => {
    toast({
      title: "Job saved!",
      description: "This job has been added to your saved jobs.",
    });
    setCurrentJobs(prev => prev.filter(job => job.id !== jobId));
    if (currentJobs.length <= 3) {
      loadJobs(); // Load more when running low
    }
  };
  
  if (isLoading && currentJobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  return (
    <div className={`px-4 py-6 ${slideIn}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Swipe Jobs</h2>
      
      <div className="max-w-sm mx-auto">
        <AnimatePresence>
          {currentJobs.slice(0, 3).map((job, index) => (
            <motion.div
              key={job.id}
              className="absolute w-full"
              style={{ zIndex: currentJobs.length - index }}
              initial={{ scale: 0.95, y: 20 * index, opacity: 1 - (index * 0.15) }}
              animate={{ scale: 1 - (index * 0.05), y: 20 * index, opacity: 1 - (index * 0.15) }}
              exit={{ x: index % 2 === 0 ? -300 : 300, opacity: 0, transition: { duration: 0.3 } }}
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
          <div className="text-center p-12 border-2 border-dashed rounded-xl border-gray-200">
            <p className="text-muted-foreground">No more jobs to display</p>
            <button 
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
              onClick={loadJobs}
            >
              Refresh Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileJobSwipe;
