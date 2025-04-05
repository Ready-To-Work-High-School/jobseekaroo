
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Quote, Star } from 'lucide-react';

export interface EmployerEndorsement {
  id: string;
  employerName: string;
  companyName: string;
  endorsementText: string;
  badgeIds: string[];
  date: string;
}

interface EmployerEndorsementsProps {
  endorsements: EmployerEndorsement[];
  studentBadges: { id: string; name: string }[];
}

const EmployerEndorsements: React.FC<EmployerEndorsementsProps> = ({ endorsements, studentBadges }) => {
  if (endorsements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-600" />
            Employer Endorsements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              You haven't received any employer endorsements yet.
            </p>
            <p className="text-sm mt-2">
              These will appear when employers validate your skills and character.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600" />
          Employer Endorsements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {endorsements.map(endorsement => (
            <div key={endorsement.id} className="border border-blue-100 rounded-md p-4 bg-blue-50">
              <div className="flex items-start">
                <Quote className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-1" />
                <div>
                  <p className="text-sm italic mb-3">{endorsement.endorsementText}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {endorsement.badgeIds.map(badgeId => {
                      const badge = studentBadges.find(b => b.id === badgeId);
                      return badge ? (
                        <Badge key={badgeId} variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          {badge.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">{endorsement.employerName}</span> at {endorsement.companyName}
                    </div>
                    <div>{endorsement.date}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployerEndorsements;
