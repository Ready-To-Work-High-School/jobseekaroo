
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StudentProfile } from '@/lib/mock-data/students';
import { Briefcase, Calendar, Award, ArrowRight } from 'lucide-react';

interface StudentProfileCardProps {
  student: StudentProfile;
  variant?: 'default' | 'compact';
  className?: string;
}

const StudentProfileCard: React.FC<StudentProfileCardProps> = ({ 
  student, 
  variant = 'default',
  className = '' 
}) => {
  const initials = `${student.firstName[0]}${student.lastName[0]}`;
  
  // Determine if we should use a color-based avatar fallback
  const useColorBackground = !student.avatar;
  
  const isCompact = variant === 'compact';
  
  return (
    <Card className={`overflow-hidden transition-all ${isCompact ? 'hover:shadow-md' : 'hover:shadow-lg'} ${className}`}>
      <CardHeader className={`${isCompact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center gap-4">
          <Avatar className={`${isCompact ? 'h-12 w-12' : 'h-16 w-16'}`}>
            <AvatarImage src={student.avatar} alt={`${student.firstName} ${student.lastName}`} />
            <AvatarFallback className={useColorBackground ? "bg-primary text-primary-foreground" : ""}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className={`${isCompact ? 'text-lg' : 'text-xl'}`}>
              {student.firstName} {student.lastName}
            </CardTitle>
            <CardDescription>
              Grade {student.grade} • {student.academy} Academy
            </CardDescription>
            <div className="flex mt-1 gap-1">
              {student.workEligible && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  Work Eligible
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      {!isCompact && (
        <CardContent>
          <p className="mb-4 text-muted-foreground">{student.bio}</p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Award className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Certifications</p>
                <p className="text-sm text-muted-foreground">
                  {student.certifications.join(', ')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Skills</p>
                <p className="text-sm text-muted-foreground">
                  {student.skills.join(', ')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Availability</p>
                <p className="text-sm text-muted-foreground">
                  {[
                    student.availability.afterSchool ? "After School" : null,
                    student.availability.weekends ? "Weekends" : null,
                    student.availability.summer ? "Summer" : null
                  ].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-4">
            {student.preferredJobTypes.map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
      
      <CardFooter className={`${isCompact ? 'p-4' : 'p-6'} pt-2 flex justify-end`}>
        <Button variant="ghost" size="sm" className="gap-1">
          View Profile <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentProfileCard;
