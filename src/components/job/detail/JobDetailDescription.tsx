
import { useSlideIn } from '@/utils/animations';
import { Job } from '@/types/job';
import { JobApplyButton } from '@/components/JobApplyButton';
import ShareJobButton from '@/components/ShareJobButton';

interface JobDetailDescriptionProps {
  job: Job;
}

export const JobDetailDescription = ({ job }: JobDetailDescriptionProps) => {
  const contentAnimation = useSlideIn(300);

  return (
    <div className={contentAnimation}>
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
                  <path d="M15 17h3a3 3 0 0 0 0-6h-3v9" />
                  <path d="M9 17V8h4.5a3 3 0 0 1 0 6H9" />
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
          <JobApplyButton job={job} />
          <ShareJobButton 
            jobId={job.id} 
            jobTitle={job.title} 
            companyName={job.company.name}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailDescription;
