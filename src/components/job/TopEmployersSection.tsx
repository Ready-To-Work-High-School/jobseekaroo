
import { useEmployerData } from './hooks/useEmployerData';
import { EmployerCard } from './EmployerCard';
import { EmployerSectionHeader } from './EmployerSectionHeader';
import { EmployerSectionLoading } from './EmployerSectionLoading';

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

  return (
    <div className="w-full py-8 bg-slate-50">
      <div className="container mx-auto px-4">
        <EmployerSectionHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {employers.map((employer, index) => (
            <EmployerCard key={index} employer={employer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopEmployersSection;
