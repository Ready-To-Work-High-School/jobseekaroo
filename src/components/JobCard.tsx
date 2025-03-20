
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { useFadeIn } from '@/utils/animations';
import { MapPin, Clock, BriefcaseIcon, CalendarIcon, BookmarkIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

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
  
  // Check if job is saved on component mount and when user changes
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

  // Format date to relative time (e.g., "2 days ago")
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

  // Format pay range
  const formatPayRange = (min: number, max: number, period: string) => {
    return `$${min}${max > min ? `-$${max}` : ''} ${period}`;
  };
  
  // Handle saving/unsaving job
  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to job details
    e.stopPropagation(); // Prevent event bubbling
    
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

  // Determine if we should use amber styling based on company name
  const jacksonvilleCompanies = [
    "Jacksonville Electronics", 
    "Jacksonville Waterfront Hotel", 
    "TechSolutions Jacksonville"
  ];
  const useAmberStyling = jacksonvilleCompanies.includes(job.company);

  return (
    <Link to={`/jobs/${job.id}`} className={animation}>
      <div className={`flex flex-col space-y-4 p-6 rounded-lg ${useAmberStyling ? 'border-amber-400 border-2' : 'border border-border'} bg-white hover:shadow-md transition-all duration-200`}>
        {/* Header */}
        <div className="flex items-start gap-4">
          {job.logoUrl ? (
            <div className={`w-12 h-12 rounded-md ${useAmberStyling ? 'border-amber-400' : 'border-border'} border overflow-hidden bg-muted flex-shrink-0`}>
              <img src={job.logoUrl} alt={`${job.company} logo`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-md border ${useAmberStyling ? 'border-amber-400 bg-amber-50' : 'border-border bg-primary/10'} flex items-center justify-center flex-shrink-0`}>
              <span className={`${useAmberStyling ? 'text-amber-600' : 'text-primary'} font-medium text-lg`}>
                {job.company.substring(0, 1)}
              </span>
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-lg truncate ${useAmberStyling ? 'text-amber-800' : ''}`}>{job.title}</h3>
            <p className={`${useAmberStyling ? 'text-amber-700' : 'text-muted-foreground'}`}>{job.company}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
              <Clock className="h-3 w-3" />
              {formatRelativeDate(job.postedDate)}
            </div>
            
            <button 
              onClick={handleSaveToggle}
              className={`${useAmberStyling ? 'text-amber-600 hover:text-amber-800' : 'text-muted-foreground hover:text-primary'} transition-colors`}
              aria-label={isSaved ? "Unsave job" : "Save job"}
            >
              <BookmarkIcon 
                className={`h-5 w-5 ${isSaved ? (useAmberStyling ? 'fill-amber-500 text-amber-600' : 'fill-primary text-primary') : 'fill-none'}`} 
              />
            </button>
          </div>
        </div>

        {/* Location and Details */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className={useAmberStyling ? "h-4 w-4 text-amber-600" : "h-4 w-4"} />
            <span>{job.location.city}, {job.location.state}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <BriefcaseIcon className={useAmberStyling ? "h-4 w-4 text-amber-600" : "h-4 w-4"} />
            <span>{formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <CalendarIcon className={useAmberStyling ? "h-4 w-4 text-amber-600" : "h-4 w-4"} />
            <span className="capitalize">{job.type.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {job.isRemote && (
            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
              Remote
            </span>
          )}
          
          {job.isFlexible && (
            <span className={`px-2 py-1 rounded-md ${useAmberStyling ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'} text-xs font-medium`}>
              Flexible
            </span>
          )}
          
          <span className={`px-2 py-1 rounded-md ${useAmberStyling ? 'bg-amber-200 text-amber-900' : 'bg-secondary'} text-xs font-medium capitalize`}>
            {job.experienceLevel.replace('-', ' ')}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
