
import { useState, useEffect } from 'react';
import { useFadeIn } from '@/utils/animations';
import { getFeaturedJobs } from '@/lib/mock-data/jobs';
import { getAllJobs } from '@/lib/supabase/jobs';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FeaturedJobsSection = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const fadeInFast = useFadeIn(200);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);

        // First try to get jobs from Supabase
        const allJobs = await getAllJobs();
        if (allJobs.length > 0) {
          // If we have jobs in Supabase, use those
          const featured = allJobs.filter(job => job.isFeatured).sort(() => 0.5 - Math.random()) // Shuffle
          .slice(0, 3); // Take exactly 3 featured jobs

          if (featured.length === 3) {
            setFeaturedJobs(featured);
          } else {
            // If we don't have exactly 3 featured jobs, use mock data
            setFeaturedJobs(getFeaturedJobs());
          }
        } else {
          // Fallback to mock data if no jobs in Supabase
          setFeaturedJobs(getFeaturedJobs());

          // Show a toast that we're using mock data
          if (user) {
            toast.info('Using mock job data. Use the "Sync Mock Data" button in the Jobs page to load data to Supabase.', {
              duration: 5000
            });
          }
        }
      } catch (error) {
        console.error('Error loading jobs:', error);

        // Fallback to mock data on error
        setFeaturedJobs(getFeaturedJobs());
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [user]);

  // Function to get a different accent color for each job card
  const getAccentGradient = (index: number) => {
    const gradients = [
      'from-blue-400 via-blue-600 to-blue-800', // Blue gradient
      'from-amber-400 via-amber-500 to-amber-600', // Amber gradient
      'from-blue-600 via-amber-500 to-amber-600' // Mixed gradient
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className={`py-16 ${user ? 'bg-slate-50' : 'bg-gradient-to-b from-blue-50 to-white'} ${fadeInFast} relative overflow-hidden`} aria-labelledby="featured-jobs-heading">
      {/* Background decorative elements */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl"></div>
      <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-10 md:mb-12 flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase className="h-8 w-8 text-amber-500" />
            <h2 id="featured-jobs-heading" className="text-3xl font-bold bg-gradient-to-r from-black via-blue-600 to-amber-500 bg-clip-text text-transparent sm:text-4xl">
              Featured Opportunities
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Hand-picked opportunities from top employers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full mt-4"></div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredJobs.map((job, index) => (
              <div 
                key={job.id} 
                className={cn(
                  "relative group p-[2px] rounded-lg overflow-hidden hover:shadow-xl transition-all h-full transform hover:-translate-y-1",
                  "before:absolute before:inset-0 before:rounded-lg",
                  `before:bg-gradient-to-br ${getAccentGradient(index)}`,
                  "before:content-[''] before:z-0 before:opacity-70 hover:before:opacity-100 before:transition-opacity"
                )}
              >
                <div className="relative bg-white rounded-lg h-full z-10">
                  <JobCard job={job} index={index} />
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-700 hover:to-amber-600">
            <Link to="/jobs">View All Job Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
