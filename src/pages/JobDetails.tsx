
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getJobById } from '@/lib/mock-data';
import { Job } from '@/types/job';
import { cn } from '@/lib/utils';
import { useFadeIn, useSlideIn } from '@/utils/animations';
import ShareJobButton from '@/components/ShareJobButton';

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyClicked, setApplyClicked] = useState(false);
  const navigate = useNavigate();
  
  const headerAnimation = useSlideIn(100);
  const contentAnimation = useSlideIn(300);
  const sidebarAnimation = useFadeIn(500);
  
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
  
  // Handle apply click
  const handleApply = () => {
    setApplyClicked(true);
    // In a real app, this would redirect to the application
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };
  
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
      {applyClicked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl animate-slide-up">
            <h3 className="text-xl font-bold mb-4">Application Submitted!</h3>
            <p className="mb-6 text-muted-foreground">
              Your application for the {job.title} position at {job.company.name} has been successfully submitted.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setApplyClicked(false)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <Link 
          to={`/jobs${location.search}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to search results
        </Link>
      </div>
      
      <div className={`mb-8 ${headerAnimation}`}>
        <div className="flex items-center gap-4 mb-6">
          {job.logoUrl ? (
            <div className="w-16 h-16 rounded-lg border border-border overflow-hidden bg-white flex-shrink-0">
              <img 
                src={job.logoUrl} 
                alt={`${job.company.name} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg border border-border bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-semibold text-2xl">
                {job.company.name.substring(0, 1)}
              </span>
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{job.title}</h1>
            <p className="text-lg text-muted-foreground">{job.company.name}</p>
          </div>
          
          <ShareJobButton 
            jobId={job.id} 
            jobTitle={job.title} 
            companyName={job.company.name} 
            className="self-start"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge icon="location">
            {job.location.city}, {job.location.state} {job.location.zipCode}
          </Badge>
          
          <Badge icon="dollar">
            {formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}
          </Badge>
          
          <Badge icon="clock" className="capitalize">
            {job.type.replace('-', ' ')}
          </Badge>
          
          {job.isRemote && (
            <Badge icon="laptop" className="bg-primary/10 text-primary">
              Remote
            </Badge>
          )}
          
          {job.isFlexible && (
            <Badge icon="calendar" className="bg-emerald-100 text-emerald-800">
              Flexible Schedule
            </Badge>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`md:col-span-2 ${contentAnimation}`}>
          <div className="bg-white border border-border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-foreground/80 mb-6">
              {job.description}
            </p>
            
            <h3 className="text-lg font-semibold mb-3">Requirements</h3>
            <ul className="space-y-2 mb-6">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-secondary/50 rounded-lg p-4 text-sm">
              <p className="text-foreground/70 italic">
                This position is ideal for high school students looking to gain valuable work experience
                while maintaining their studies. No prior experience is required for most of our positions.
              </p>
            </div>
          </div>
          
          <div className="bg-white border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">How to Apply</h2>
            <p className="text-foreground/80 mb-6">
              Interested in this position? Click the apply button to submit your application. 
              You'll need to provide some basic information about yourself and explain why 
              you're interested in this role.
            </p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleApply}
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors focus-ring"
              >
                Apply Now
              </button>
              
              <ShareJobButton 
                jobId={job.id} 
                jobTitle={job.title} 
                companyName={job.company.name}
              />
            </div>
          </div>
        </div>
        
        <div className={`md:col-span-1 ${sidebarAnimation}`}>
          <div className="sticky top-24">
            <div className="bg-white border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Job Details</h2>
              
              <div className="space-y-4">
                <DetailItem icon="building" label="Company">
                  {job.company.name}
                </DetailItem>
                
                <DetailItem icon="calendar" label="Posted On">
                  {formatDate(job.postedDate)}
                </DetailItem>
                
                <DetailItem icon="briefcase" label="Experience">
                  {job.experienceLevel === 'no-experience' && 'No Experience Required'}
                  {job.experienceLevel === 'entry-level' && 'Entry Level'}
                  {job.experienceLevel === 'some-experience' && 'Some Experience Required'}
                </DetailItem>
                
                <DetailItem icon="clock" label="Schedule">
                  {job.type === 'part-time' && 'Part Time'}
                  {job.type === 'full-time' && 'Full Time'}
                  {job.type === 'internship' && 'Internship'}
                  {job.type === 'temporary' && 'Temporary'}
                  {job.type === 'weekend' && 'Weekend Only'}
                  {job.type === 'summer' && 'Summer Job'}
                </DetailItem>
                
                <DetailItem icon="dollar-sign" label="Pay Rate">
                  {formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}
                </DetailItem>
              </div>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-primary">Tips for Applicants</h3>
              <ul className="space-y-3">
                {[
                  'Be honest about your availability and experience',
                  'Highlight your relevant skills and interests',
                  'Show enthusiasm for the position',
                  'Include any school activities that demonstrate your skills'
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 17h3a3 3 0 0 0 0-6h-3v9" />
                        <path d="M9 17V8h4.5a3 3 0 0 1 0 6H9" />
                      </svg>
                    </div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-4 border-t border-primary/20 text-center">
                <Link 
                  to="/resources" 
                  className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  View More Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  icon: string;
  className?: string;
}

const Badge = ({ children, icon, className }: BadgeProps) => (
  <div className={cn(
    "inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-sm font-medium",
    className
  )}>
    <span className="mr-1.5 text-current opacity-70">
      {icon === 'location' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )}
      {icon === 'dollar' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="2" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )}
      {icon === 'clock' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {icon === 'laptop' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
        </svg>
      )}
      {icon === 'calendar' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      )}
    </span>
    {children}
  </div>
);

interface DetailItemProps {
  icon: string;
  label: string;
  children: React.ReactNode;
}

const DetailItem = ({ icon, label, children }: DetailItemProps) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
      {icon === 'building' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="16" height="20" x="4" y="2" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </svg>
      )}
      {icon === 'calendar' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      )}
      {icon === 'briefcase' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )}
      {icon === 'clock' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      {icon === 'dollar-sign' && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="2" y2="22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )}
    </div>
    
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-foreground font-medium">{children}</p>
    </div>
  </div>
);

export default JobDetails;
