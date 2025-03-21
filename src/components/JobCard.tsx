import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { useFadeIn } from '@/utils/animations';
import { MapPin, Clock, BriefcaseIcon, CalendarIcon, BookmarkIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ShareButton from './ShareButton';

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard = ({
  job,
  index
}: JobCardProps) => {
  const animation = useFadeIn(100 + index * 50);
  const { user, saveJob, unsaveJob, isSavedJob } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    if (user) {
      const checkSaved = async () => {
        const saved = await isSavedJob(job.id);
        setIsSaved(saved);
      };
      checkSaved();
    } else {
      setIsSaved(false);
    }
  }, [user, job.id, isSavedJob]);

  useEffect(() => {
    if (imageRef.current) {
      if ('loading' in HTMLImageElement.prototype) {
        imageRef.current.loading = 'lazy';
      } else {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && imageRef.current && imageRef.current.src !== job.logoUrl) {
              imageRef.current.src = job.logoUrl || '';
              observer.unobserve(entry.target);
            }
          });
        });
        
        observer.observe(imageRef.current);
        return () => {
          if (imageRef.current) {
            observer.unobserve(imageRef.current);
          }
        };
      }
    }
  }, [job.logoUrl]);

  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const formatPayRange = (min: number, max: number, period: string) => {
    return `$${min}${max > min ? `-$${max}` : ''} ${period}`;
  };

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save jobs",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isSaved) {
        await unsaveJob(job.id);
        setIsSaved(false);
        toast({
          title: "Job removed",
          description: "Job removed from your saved jobs",
        });
      } else {
        await saveJob(job.id);
        setIsSaved(true);
        toast({
          title: "Job saved",
          description: "Job added to your saved jobs",
        });
      }
    } catch (error) {
      console.error("Error toggling job save status:", error);
      toast({
        title: "Error",
        description: "There was an error updating your saved jobs",
        variant: "destructive",
      });
    }
  };

  const jacksonvilleCompanies = [
    "Jacksonville Electronics", 
    "Jacksonville Waterfront Hotel", 
    "TechSolutions Jacksonville"
  ];
  const useAmberStyling = jacksonvilleCompanies.includes(job.company.name);

  return (
    <Link 
      to={`/jobs/${job.id}`} 
      className={animation}
      aria-label={`${job.title} at ${job.company.name}, ${formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}`}
    >
      <div 
        className={`flex flex-col space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg ${useAmberStyling ? 'border-amber-400 border-2' : 'border border-border'} bg-white hover:shadow-md transition-all duration-200`}
        role="article"
      >
        <div className="flex items-start gap-3 sm:gap-4">
          {job.logoUrl ? (
            <div 
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md ${useAmberStyling ? 'border-amber-400' : 'border-border'} border overflow-hidden bg-muted flex-shrink-0`}
              aria-hidden="true"
            >
              <img 
                ref={imageRef}
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
                data-src={job.logoUrl}
                alt={`${job.company.name} logo`}
                className={`w-full h-full object-cover lazy-load ${imageLoaded ? 'loaded' : ''}`}
                onLoad={() => setImageLoaded(true)}
                width="48"
                height="48"
              />
            </div>
          ) : (
            <div 
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md border ${useAmberStyling ? 'border-amber-400 bg-amber-50' : 'border-border bg-primary/10'} flex items-center justify-center flex-shrink-0`}
              aria-hidden="true"
            >
              <span className={`${useAmberStyling ? 'text-amber-600' : 'text-primary'} font-medium text-base sm:text-lg`}>
                {job.company.name.substring(0, 1)}
              </span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-base sm:text-lg truncate text-black`}>
              {job.title}
            </h3>
            <p className={`text-sm ${useAmberStyling ? 'text-amber-700' : 'text-black'}`}>
              {job.company.name}
            </p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-1 text-xs text-black whitespace-nowrap">
              <Clock className="h-3 w-3" aria-hidden="true" />
              <span aria-label={`Posted ${formatRelativeDate(job.postedDate)}`}>
                {formatRelativeDate(job.postedDate)}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <ShareButton
                jobId={job.id}
                jobTitle={job.title}
                companyName={job.company.name}
                className={`${useAmberStyling ? 'text-amber-600 hover:text-amber-800' : 'text-black hover:text-primary'}`}
              />
              
              <button 
                onClick={handleSaveToggle}
                className={`${useAmberStyling ? 'text-amber-600 hover:text-amber-800' : 'text-black hover:text-primary'} transition-colors p-1 sm:p-0 focus-visible:ring`}
                aria-label={isSaved ? `Unsave ${job.title} job` : `Save ${job.title} job`}
                aria-pressed={isSaved}
              >
                <BookmarkIcon 
                  className={`h-5 w-5 ${isSaved ? (useAmberStyling ? 'fill-amber-500 text-amber-600' : 'fill-primary text-primary') : 'fill-none'}`} 
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="sm:hidden flex items-center gap-2 text-xs text-black">
          <Clock className="h-3 w-3" aria-hidden="true" />
          <span>{formatRelativeDate(job.postedDate)}</span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-black">
          <div className="flex items-center gap-1" aria-label={`Location: ${job.location.city}, ${job.location.state}`}>
            <MapPin className={`h-3 w-3 sm:h-4 sm:w-4 ${useAmberStyling ? "text-amber-600" : ""}`} aria-hidden="true" />
            <span>{job.location.city}, {job.location.state}</span>
          </div>
          
          <div className="flex items-center gap-1" aria-label={`Salary: ${formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}`}>
            <BriefcaseIcon className={`h-3 w-3 sm:h-4 sm:w-4 ${useAmberStyling ? "text-amber-600" : ""}`} aria-hidden="true" />
            <span>{formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}</span>
          </div>
          
          <div className="flex items-center gap-1" aria-label={`Job type: ${job.type.replace('-', ' ')}`}>
            <CalendarIcon className={`h-3 w-3 sm:h-4 sm:w-4 ${useAmberStyling ? "text-amber-600" : ""}`} aria-hidden="true" />
            <span className="capitalize">{job.type.replace('-', ' ')}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2" aria-label="Job features">
          {job.isRemote && (
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md bg-primary/10 text-primary text-[10px] sm:text-xs font-medium">
              Remote
            </span>
          )}
          
          {job.isFlexible && (
            <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${useAmberStyling ? 'bg-amber-500 text-white' : 'bg-amber-500 text-white'} text-[10px] sm:text-xs font-medium`}>
              Flexible
            </span>
          )}
          
          <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md ${useAmberStyling ? 'bg-amber-500 text-white' : 'bg-amber-500 text-white'} text-[10px] sm:text-xs font-medium capitalize`}>
            {job.experienceLevel.replace('-', ' ')}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-black line-clamp-2">
          {job.description}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
