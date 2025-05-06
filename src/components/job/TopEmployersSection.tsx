
import { useEmployerData } from './hooks/useEmployerData';
import { EmployerCard } from './EmployerCard';
import { EmployerSectionHeader } from './EmployerSectionHeader';
import { EmployerSectionLoading } from './EmployerSectionLoading';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

const TopEmployersSection = () => {
  const { employers, loading } = useEmployerData();
  const { isOnline, refreshData } = useNetworkStatus();

  // Handle manual refresh
  const handleRefresh = () => {
    console.log('Manual employer data refresh requested');
    refreshData();
  };

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="container mx-auto px-4">
          <EmployerSectionHeader />
          <EmployerSectionLoading />
        </div>
      </div>
    );
  }

  // Check if there are any employers with broken/missing logo URLs
  const checkForMissingLogos = employers.some(employer => employer.logoUrl && !employer.logoUrl.includes('lovable-uploads'));
  
  // If we detect issues with logo URLs, add console warning
  if (checkForMissingLogos) {
    console.warn('Some employer logos may have invalid URLs. Check LOGO_MAP in employerMappings.ts');
  }

  const isUsingFallbackData = !isOnline || employers.every(e => e.last_updated && new Date(e.last_updated).getTime() === new Date().getTime());

  return (
    <div className="w-full py-8 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <EmployerSectionHeader />
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2" 
            onClick={handleRefresh}
            disabled={!isOnline}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
        
        {!isOnline && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-amber-700">
              You're offline. Showing cached employer data.
            </p>
          </div>
        )}

        {isOnline && isUsingFallbackData && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Using fallback data. The server may be temporarily unavailable.
            </p>
          </div>
        )}

        {employers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-10 w-10 text-amber-500 mb-2" />
            <p className="text-center text-muted-foreground">
              No employer data available at the moment.
            </p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={handleRefresh}
              disabled={!isOnline}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {employers.map((employer, index) => (
              <EmployerCard key={`${employer.company_name}-${index}`} employer={employer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopEmployersSection;
