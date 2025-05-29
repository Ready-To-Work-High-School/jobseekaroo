
import { Building2, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminStatus } from '@/hooks/useAdminStatus';

interface EmployerCardProps {
  employer: {
    company_name: string;
    job_count: number;
    avg_min_wage: number;
    industry?: string;
    logoUrl?: string;
  };
}

export const EmployerCard = ({ employer }: EmployerCardProps) => {
  const { user, userProfile } = useAuth();
  const { isCeo, isAdmin } = useAdminStatus();
  const navigate = useNavigate();

  const handleJobsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      // Store the intended destination for after login
      const jobsUrl = `/jobs?keyword=${encodeURIComponent(employer.company_name)}`;
      sessionStorage.setItem('redirectAfterLogin', jobsUrl);
      navigate('/sign-up');
    } else {
      // User is authenticated, go directly to jobs
      navigate(`/jobs?keyword=${encodeURIComponent(employer.company_name)}`);
    }
  };

  // Only show CEO shield for verified CEO users
  const shouldShowCeoShield = isCeo && isAdmin && userProfile?.user_type === 'admin';

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow relative">
      {/* Hidden CEO Shield - only visible to verified CEO users */}
      {shouldShowCeoShield && (
        <Link 
          to="/ceo-portal" 
          className="absolute top-2 right-2 opacity-10 hover:opacity-100 transition-opacity duration-300 z-10"
          aria-label="CEO Access"
        >
          <Shield className="h-3 w-3 text-amber-500" />
        </Link>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="mr-2 flex items-center gap-2">
            {employer.logoUrl ? (
              <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-white border">
                <img 
                  src={employer.logoUrl} 
                  alt={`${employer.company_name} logo`} 
                  className="max-h-8 max-w-8 w-auto h-auto object-contain" 
                  loading="lazy"
                  onError={(e) => {
                    // If image fails to load, replace with fallback icon
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-blue-100');
                    const iconElement = document.createElement('div');
                    iconElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-blue-600"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>';
                    e.currentTarget.parentElement?.appendChild(iconElement.firstChild as Node);
                  }}
                />
              </div>
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            )}
            <CardTitle className="text-md font-medium">{employer.company_name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-xs text-muted-foreground mb-1">{employer.industry || 'Business'}</p>
        <div className="flex items-center justify-between mt-2">
          <button 
            onClick={handleJobsClick}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-xs"
          >
            {employer.job_count} jobs
          </button>
          <div className="text-sm font-semibold text-green-700">
            ${Number(employer.avg_min_wage).toFixed(2)}/hr
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
