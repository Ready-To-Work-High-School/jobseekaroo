
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFadeIn } from '@/utils/animations';
import { getJobs } from '@/lib/mock-data';
import { getAllJobs } from '@/lib/supabase';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const FeaturedJobsSection = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const fadeInFast = useFadeIn(200);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        
        // First try to get jobs from Supabase
        const allJobs = await getAllJobs();
        
        if (allJobs.length > 0) {
          // If we have jobs in Supabase, use those
          const featured = allJobs
            .filter(job => job.isFeatured)
            .sort(() => 0.5 - Math.random()) // Shuffle
            .slice(0, 3);  // Take exactly 3 featured jobs
          
          setFeaturedJobs(featured);
        } else {
          // Fallback to mock data if no jobs in Supabase
          const allMockJobs = getJobs();
          const featured = allMockJobs
            .filter(job => job.isFeatured)
            .sort(() => 0.5 - Math.random()) // Shuffle
            .slice(0, 3);  // Take exactly 3 featured jobs
          
          setFeaturedJobs(featured);
          
          // Show a toast that we're using mock data
          if (user) {
            toast.info(
              'Using mock job data. Use the "Sync Mock Data" button in the Jobs page to load data to Supabase.',
              { duration: 5000 }
            );
          }
        }
      } catch (error) {
        console.error('Error loading jobs:', error);
        
        // Fallback to mock data on error
        const allJobs = getJobs();
        const featured = allJobs
          .filter(job => job.isFeatured)
          .sort(() => 0.5 - Math.random()) // Shuffle
          .slice(0, 3);  // Take exactly 3 featured jobs
        
        setFeaturedJobs(featured);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, [user]);

  return (
    <section className={`py-12 ${user ? 'bg-slate-50' : 'bg-white'} ${fadeInFast}`} aria-labelledby="featured-jobs-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 id="featured-jobs-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl mb-1">
              Featured Jobs
            </h2>
            <p className="text-base text-muted-foreground">
              Hand-picked opportunities from top employers
            </p>
          </div>
          <Button 
            onClick={() => navigate('/jobs')}
            variant="outline"
            className="mt-3 sm:mt-0"
          >
            View All Jobs
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-4 h-64 animate-pulse">
                <div className="flex gap-3 items-start mb-4">
                  <div className="w-12 h-12 bg-muted rounded-md"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredJobs.map((job, index) => (
              <JobCard job={job} key={job.id} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
