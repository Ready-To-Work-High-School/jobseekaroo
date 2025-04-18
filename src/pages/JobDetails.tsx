
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getJobById } from '@/lib/mock-data';
import { Job } from '@/types/job';
import BackButton from '@/components/navigation/BackButton';
import JobDetailHeader from '@/components/job/detail/JobDetailHeader';
import JobDetailBadges from '@/components/job/detail/JobDetailBadges';
import JobDetailDescription from '@/components/job/detail/JobDetailDescription';
import JobDetailSidebar from '@/components/job/detail/JobDetailSidebar';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Format date in long format (e.g., "September 15, 2023")
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // Format pay range
  const formatPayRange = (min: number, max: number, period: string) => {
    return `$${min}${max > min ? `-$${max}` : ''} ${period}`;
  };
  
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (id) {
        const foundJob = getJobById(id);
        setJob(foundJob || null);
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }
  
  if (!job) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/jobs')}
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors focus-ring"
          >
            Browse All Jobs
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <BackButton />
        </div>
        
        <JobDetailHeader job={job} />
        <JobDetailBadges job={job} formatPayRange={formatPayRange} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <JobDetailDescription job={job} />
          </div>
          
          <JobDetailSidebar 
            job={job} 
            formatDate={formatDate} 
            formatPayRange={formatPayRange} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default JobDetails;
