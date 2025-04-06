
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MessageSquareQuote } from 'lucide-react';

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
  studentBadges: { id: string, name: string }[];
}

const EmployerEndorsements: React.FC<EmployerEndorsementsProps> = ({ endorsements, studentBadges }) => {
  if (endorsements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-500" />
            Employer Endorsements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageSquareQuote className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-muted-foreground">
              No employer endorsements yet. Endorsements will appear here when employers recognize your skills.
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
          <Building2 className="h-5 w-5 text-blue-500" />
          Employer Endorsements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {endorsements.map(endorsement => (
            <div key={endorsement.id} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{endorsement.employerName}</h3>
                  <p className="text-sm text-muted-foreground">{endorsement.companyName}</p>
                </div>
                <p className="text-xs text-muted-foreground">{endorsement.date}</p>
              </div>
              
              <p className="text-sm mb-3">"{endorsement.endorsementText}"</p>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground mr-1">Badges earned:</span>
                {endorsement.badgeIds.map(badgeId => {
                  const badge = studentBadges.find(b => b.id === badgeId);
                  return badge ? (
                    <Badge key={badgeId} variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      {badge.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployerEndorsements;
