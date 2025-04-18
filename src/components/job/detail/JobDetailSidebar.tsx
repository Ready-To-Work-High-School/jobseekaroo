
import { Link } from 'react-router-dom';
import { useFadeIn } from '@/utils/animations';
import { Job } from '@/types/job';

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

interface JobDetailSidebarProps {
  job: Job;
  formatDate: (dateString: string) => string;
  formatPayRange: (min: number, max: number, period: string) => string;
}

export const JobDetailSidebar = ({ job, formatDate, formatPayRange }: JobDetailSidebarProps) => {
  const sidebarAnimation = useFadeIn(500);
  
  return (
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
  );
};

export default JobDetailSidebar;
