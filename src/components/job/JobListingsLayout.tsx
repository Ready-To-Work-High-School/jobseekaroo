
import { ReactNode } from 'react';
import Layout from '@/components/Layout';
import { MapPin } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';

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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <div className="flex items-center text-muted-foreground">
                {zipCode ? (
                  <>
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    <p>
                      Jobs in ZIP code <span className="font-medium">{zipCode}</span>
                      {radius && radius > 0 && (
                        <span> within <span className="font-medium">{radius} mile{radius !== 1 ? 's' : ''}</span></span>
                      )}
                    </p>
                  </>
                ) : (
                  <p>{description || "Search for jobs by entering your ZIP code"}</p>
                )}
              </div>
            </div>
            
            {searchForm}
          </div>
        </div>
        
        {children}
      </div>
    </Layout>
  );
};

export default JobListingsLayout;
