
import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

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
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="mr-2 flex items-center gap-2">
            {employer.logoUrl ? (
              <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden bg-white border">
                <img 
                  src={employer.logoUrl} 
                  alt={`${employer.company_name} logo`} 
                  className="max-h-8 max-w-8 w-auto h-auto object-contain" 
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
        <p className="text-xs text-muted-foreground mb-1">{employer.industry}</p>
        <div className="flex items-center justify-between mt-2">
          <Link 
            to={`/jobs?keyword=${encodeURIComponent(employer.company_name)}`}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
          >
            <span className="text-xs">{employer.job_count} jobs</span>
          </Link>
          <div className="text-sm font-semibold text-green-700">
            ${Number(employer.avg_min_wage).toFixed(2)}/hr
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
