
import { useEmployerData } from './hooks/useEmployerData';
import { EmployerCard } from './EmployerCard';
import { EmployerSectionHeader } from './EmployerSectionHeader';
import { EmployerSectionLoading } from './EmployerSectionLoading';
import { AlertCircle, Building2 } from 'lucide-react';

const TopEmployersSection = () => {
  const { employers, loading } = useEmployerData();

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="container mx-auto px-4">
          <EmployerSectionLoading />
        </div>
      </div>
    );
  }

  // Check if there are any employers with broken/missing logo URLs
  const checkForMissingLogos = employers.some(employer => employer.logoUrl && !employer.logoUrl.includes('lovable-uploads'));
  
  // If we detect issues with logo URLs, add console warning
  if (checkForMissingLogos) {
    console.warn('Some employer logos may have invalid URLs. Check LOGO_MAP in useEmployerData.ts');
  }

  return (
    <div className="w-full py-8 bg-slate-50">
      <div className="container mx-auto px-4">
        <EmployerSectionHeader />

        {employers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <AlertCircle className="h-10 w-10 text-amber-500 mb-2" />
            <p className="text-center text-muted-foreground">
              No employer data available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {employers.map((employer, index) => (
              <EmployerCard key={index} employer={employer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopEmployersSection;
