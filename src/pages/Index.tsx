import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import EnhancedHero from '@/components/EnhancedHero';
import ProgramsSection from '@/components/ProgramsSection';
import { Button } from '@/components/ui/button';
import { useFadeIn } from '@/utils/animations';
import { 
  getJobs,
  getJobsByLocation,
  getSavedSearches 
} from '@/lib/mock-data';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import { useAuth } from '@/contexts/AuthContext';
import { ExternalLink } from 'lucide-react';

const Index = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [localJobs, setLocalJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const fadeInFast = useFadeIn(200);
  const fadeInMedium = useFadeIn(400);
  const fadeInSlow = useFadeIn(600);
  
  useEffect(() => {
    const fetchFeaturedJobs = () => {
      try {
        // Get some featured job recommendations
        const allJobs = getJobs();
        const featured = allJobs
          .filter(job => job.isFeatured)
          .sort(() => 0.5 - Math.random()) // Shuffle
          .slice(0, 4);
        
        setFeaturedJobs(featured);
        
        // Get some jobs from Jacksonville
        const jacksonvilleJobs = getJobsByLocation('Jacksonville', 'FL')
          .slice(0, 4);
        
        setLocalJobs(jacksonvilleJobs);
      } catch (error) {
        console.error('Error loading featured jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedJobs();
  }, []);
  
  return (
    <Layout>
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      
      <div id="main-content">
        <EnhancedHero />
        
        {/* Featured Jobs Section */}
        <section className={`py-12 bg-white ${fadeInFast}`} aria-labelledby="featured-jobs-heading">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredJobs.map((job, index) => (
                  <JobCard job={job} key={job.id} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Jacksonville Jobs Section */}
        <section className={`py-12 bg-amber-50 ${fadeInMedium}`} aria-labelledby="local-jobs-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 id="local-jobs-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl mb-1">
                  Jobs in Jacksonville
                </h2>
                <p className="text-base text-muted-foreground">
                  Local opportunities in the Jacksonville area
                </p>
              </div>
              <Button 
                onClick={() => navigate('/jobs?location=Jacksonville, FL')}
                variant="outline"
                className="mt-3 sm:mt-0"
              >
                Browse Local Jobs
              </Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-lg border border-amber-300 bg-white p-4 h-64 animate-pulse">
                    <div className="flex gap-3 items-start mb-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-md"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-amber-100 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-amber-100 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-amber-100 rounded"></div>
                      <div className="h-3 bg-amber-100 rounded"></div>
                      <div className="h-3 bg-amber-100 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localJobs.map((job, index) => (
                  <JobCard job={job} key={job.id} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Training & Certification Section */}
        <div className={fadeInSlow}>
          <ProgramsSection />
        </div>
        
        {/* Resources Section */}
        <section className="py-12 bg-white" aria-labelledby="resources-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 id="resources-heading" className="text-2xl font-bold sm:text-3xl mb-3">
                Resources to Help You Succeed
              </h2>
              <p className="text-muted-foreground">
                Take advantage of our free tools and resources to advance your career
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Resume Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI-powered resume builder will help you create a professional resume that stands out.
                </p>
                <Button variant="outline" onClick={() => navigate('/resume-assistant')}>
                  Build Your Resume
                </Button>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Career Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore articles, guides, and tips to help you navigate your career path.
                </p>
                <Button variant="outline" onClick={() => navigate('/resources')}>
                  Browse Resources
                </Button>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Success Stories</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Read about people who have found their dream jobs through our platform.
                </p>
                <Button variant="outline" onClick={() => navigate('/success-stories')}>
                  Read Stories
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
