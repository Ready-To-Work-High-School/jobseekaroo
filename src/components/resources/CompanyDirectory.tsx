
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, DollarSign, Building, Briefcase } from 'lucide-react';
import { type Company } from '@/lib/mock-data/companiesData';

interface CompanyDirectoryProps {
  companies: Company[];
}

const CompanyDirectory = ({ companies }: CompanyDirectoryProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-700" />
          Top Employers in Jacksonville
        </h3>
        <p className="text-sm text-muted-foreground">
          These companies are known for offering competitive salaries and benefits in the Jacksonville area. 
          Consider targeting these employers in your job search.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100 mt-1">
                    <Building className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{company.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {company.industry}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span>Salary Range: {company.salaryRange}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              {company.website && (
                <Button variant="outline" className="gap-2" asChild>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Visit Company Site
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompanyDirectory;
