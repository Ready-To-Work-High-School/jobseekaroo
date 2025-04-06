
import { useEffect, useState } from 'react';
import { Briefcase, Building2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Employer {
  name: string;
  industry: string;
  averageWage: number;
  numberOfJobs: number;
  logoUrl?: string;
}

const TopEmployersSection = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from an API endpoint
    // For now, we'll simulate the data loading with a timeout
    const fetchTopEmployers = async () => {
      setLoading(true);
      
      try {
        // Simulated data for top employers by wages
        // In production, this would be fetched from the backend
        setTimeout(() => {
          const topEmployers: Employer[] = [
            { 
              name: 'Mayo Clinic', 
              industry: 'Healthcare', 
              averageWage: 22.50, 
              numberOfJobs: 12,
              logoUrl: '/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png'
            },
            { 
              name: 'Advent Health', 
              industry: 'Healthcare', 
              averageWage: 21.75, 
              numberOfJobs: 8 
            },
            { 
              name: 'Baptist Medical Center', 
              industry: 'Healthcare', 
              averageWage: 21.25, 
              numberOfJobs: 7 
            },
            { 
              name: 'Amazon', 
              industry: 'Technology & Retail', 
              averageWage: 20.50, 
              numberOfJobs: 15,
              logoUrl: '/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png'
            },
            { 
              name: 'CSX Transportation', 
              industry: 'Transportation', 
              averageWage: 19.75, 
              numberOfJobs: 5 
            },
            { 
              name: 'Publix', 
              industry: 'Retail', 
              averageWage: 18.50, 
              numberOfJobs: 18,
              logoUrl: '/lovable-uploads/a585f4d8-beac-4716-bafc-20991924d911.png' 
            },
            { 
              name: 'Nemours Children\'s Health', 
              industry: 'Healthcare', 
              averageWage: 18.25, 
              numberOfJobs: 6 
            },
            { 
              name: 'Florida Blue', 
              industry: 'Healthcare & Insurance', 
              averageWage: 18.00, 
              numberOfJobs: 9 
            },
            { 
              name: 'Johnson & Johnson', 
              industry: 'Healthcare', 
              averageWage: 17.50, 
              numberOfJobs: 4 
            },
            { 
              name: 'Bank of America', 
              industry: 'Finance', 
              averageWage: 17.25, 
              numberOfJobs: 7,
              logoUrl: '/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png'
            },
          ];
          
          setEmployers(topEmployers);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching top employers:", error);
        setLoading(false);
      }
    };

    fetchTopEmployers();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-60">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Top Paying Employers</h2>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span>Real-time wage data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {employers.map((employer, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="mr-2 flex items-center gap-2">
                    {employer.logoUrl ? (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-white border">
                        <img 
                          src={employer.logoUrl} 
                          alt={employer.name} 
                          className="h-6 w-auto object-contain" 
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                        <Building2 className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    <CardTitle className="text-md font-medium">{employer.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-xs text-muted-foreground mb-1">{employer.industry}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 text-blue-600" />
                    <span className="text-xs">{employer.numberOfJobs} jobs</span>
                  </div>
                  <div className="text-sm font-semibold text-green-700">
                    ${employer.averageWage.toFixed(2)}/hr
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopEmployersSection;
