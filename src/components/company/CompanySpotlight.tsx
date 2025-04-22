
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { topJacksonvilleCompanies } from '@/lib/mock-data/companiesData';
import { ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CompanySpotlight = () => {
  const top10Companies = topJacksonvilleCompanies.slice(0, 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Top 10 Employers in Jacksonville</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {top10Companies.map((company, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full border flex items-center justify-center bg-white p-2">
                  {company.logoUrl && (
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="max-h-8 max-w-8 object-contain"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold truncate">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="line-clamp-2">{company.location}</span>
              </div>

              {company.website && (
                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Visit Site
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
