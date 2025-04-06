
import { ReactNode } from 'react';
import Layout from '@/components/Layout';
import { MapPin } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';
import BackButton from '@/components/navigation/BackButton';

interface JobListingsLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  zipCode?: string;
  radius?: number;
  searchForm: ReactNode;
}

const JobListingsLayout = ({ 
  children, 
  title, 
  description, 
  zipCode, 
  radius, 
  searchForm 
}: JobListingsLayoutProps) => {
  const animation = useFadeIn(200);
  
  return (
    <Layout>
      <div className={`space-y-8 ${animation}`}>
        <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
          <div className="mb-2">
            <BackButton />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <div className="flex items-center text-muted-foreground">
                {zipCode ? (
                  <>
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    <p className="text-base">
                      Jobs in ZIP code <span className="font-medium">{zipCode}</span>
                      {radius && radius > 0 && (
                        <span> within <span className="font-medium">{radius} mile{radius !== 1 ? 's' : ''}</span></span>
                      )}
                    </p>
                  </>
                ) : (
                  <p className="text-base">{description || "Search for jobs by entering your ZIP code"}</p>
                )}
              </div>
            </div>
            
            <div className="md:flex-shrink-0">
              {searchForm}
            </div>
          </div>
        </div>
        
        {children}
      </div>
    </Layout>
  );
};

export default JobListingsLayout;
