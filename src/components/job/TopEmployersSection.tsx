import { useEffect, useState } from 'react';
import { Briefcase, Building2, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Employer {
  company_name: string;
  job_count: number;
  avg_min_wage: number;
  last_updated: string;
  industry?: string;
  logoUrl?: string;
}

const INDUSTRY_MAP: Record<string, string> = {
  'Mayo Clinic': 'Healthcare',
  'Advent Health': 'Healthcare',
  'Baptist Medical Center': 'Healthcare',
  'Amazon': 'Technology & Retail',
  'CSX Transportation': 'Transportation',
  'Publix': 'Retail',
  'Nemours Children\'s Health': 'Healthcare',
  'Florida Blue': 'Healthcare & Insurance',
  'Johnson & Johnson': 'Healthcare',
  'Bank of America': 'Finance'
};

const LOGO_MAP: Record<string, string> = {
  'Mayo Clinic': '/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png',
  'Amazon': '/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png',
  'Publix': '/lovable-uploads/a585f4d8-beac-4716-bafc-20991924d911.png',
  'Bank of America': '/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png'
};

const TopEmployersSection = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const channel = supabase
      .channel('employer-job-counts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'jobs' },
        () => {
          fetchTopEmployers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTopEmployers = async () => {
    setLoading(true);
    
    try {
      const response = await supabase.functions.invoke('get-employer-stats');
      
      if (response.error) throw new Error(response.error.message);
      
      const data = response.data.employers;
      
      const enhancedData = data.map((employer: Employer) => ({
        ...employer,
        industry: INDUSTRY_MAP[employer.company_name] || 'Other',
        logoUrl: LOGO_MAP[employer.company_name]
      }));
      
      setEmployers(enhancedData);
    } catch (error) {
      console.error("Error fetching top employers:", error);
      toast.error("Couldn't load employer data. Using fallback data.");
      
      setTimeout(() => {
        const fallbackData = [
          { 
            company_name: 'Mayo Clinic', 
            industry: 'Healthcare', 
            avg_min_wage: 22.50, 
            job_count: 12,
            logoUrl: '/lovable-uploads/b96e959f-99d4-498f-ba6f-8dd2871db916.png'
          },
          { 
            company_name: 'Advent Health', 
            industry: 'Healthcare', 
            avg_min_wage: 21.75, 
            job_count: 8 
          },
          { 
            company_name: 'Baptist Medical Center', 
            industry: 'Healthcare', 
            avg_min_wage: 21.25, 
            job_count: 7 
          },
          { 
            company_name: 'Amazon', 
            industry: 'Technology & Retail', 
            avg_min_wage: 20.50, 
            job_count: 15,
            logoUrl: '/lovable-uploads/c505c04a-b131-4528-b7be-676fde548fa1.png'
          },
          { 
            company_name: 'CSX Transportation', 
            industry: 'Transportation', 
            avg_min_wage: 19.75, 
            job_count: 5 
          },
          { 
            company_name: 'Publix', 
            industry: 'Retail', 
            avg_min_wage: 18.50, 
            job_count: 18,
            logoUrl: '/lovable-uploads/a585f4d8-beac-4716-bafc-20991924d911.png' 
          },
          { 
            company_name: 'Nemours Children\'s Health', 
            industry: 'Healthcare', 
            avg_min_wage: 18.25, 
            job_count: 6 
          },
          { 
            company_name: 'Florida Blue', 
            industry: 'Healthcare & Insurance', 
            avg_min_wage: 18.00, 
            job_count: 9 
          },
          { 
            company_name: 'Johnson & Johnson', 
            industry: 'Healthcare', 
            avg_min_wage: 17.50, 
            job_count: 4 
          },
          { 
            company_name: 'Bank of America', 
            industry: 'Finance', 
            avg_min_wage: 17.25, 
            job_count: 7,
            logoUrl: '/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png'
          },
        ];
        setEmployers(fallbackData);
      }, 300);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
                          alt={employer.company_name} 
                          className="h-6 w-auto object-contain" 
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100">
                        <Building2 className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    <CardTitle className="text-md font-medium">{employer.company_name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-xs text-muted-foreground mb-1">{employer.industry}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3 text-blue-600" />
                    <span className="text-xs">{employer.job_count} jobs</span>
                  </div>
                  <div className="text-sm font-semibold text-green-700">
                    ${Number(employer.avg_min_wage).toFixed(2)}/hr
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
