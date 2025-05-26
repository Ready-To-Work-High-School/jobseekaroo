
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, GraduationCap, Star, MapPin } from 'lucide-react';

const SampleCandidatePipeline = () => {
  const sampleCandidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      grade: "12th Grade",
      academy: "Business Academy",
      skills: ["Customer Service", "Microsoft Office", "Communication"],
      stage: "Interview",
      avatar: "/placeholder.svg",
      location: "Jacksonville, FL"
    },
    {
      id: 2,
      name: "Marcus Williams",
      grade: "11th Grade",
      academy: "IT Academy",
      skills: ["Computer Science", "Problem Solving", "Teamwork"],
      stage: "Applied",
      avatar: "/placeholder.svg",
      location: "Jacksonville, FL"
    },
    {
      id: 3,
      name: "Emma Davis",
      grade: "12th Grade",
      academy: "Health Sciences",
      skills: ["First Aid", "Organization", "Leadership"],
      stage: "Hired",
      avatar: "/placeholder.svg",
      location: "Jacksonville, FL"
    },
    {
      id: 4,
      name: "Jordan Martinez",
      grade: "11th Grade",
      academy: "Engineering",
      skills: ["Problem Solving", "Critical Thinking", "Adaptability"],
      stage: "Screening",
      avatar: "/placeholder.svg",
      location: "Jacksonville, FL"
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Screening': return 'bg-yellow-100 text-yellow-800';
      case 'Interview': return 'bg-purple-100 text-purple-800';
      case 'Hired': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stages = ['Applied', 'Screening', 'Interview', 'Hired'];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          Sample Candidate Pipeline
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          See how employers manage talented high school candidates through their hiring process
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const stageCandidates = sampleCandidates.filter(c => c.stage === stage);
            return (
              <div key={stage} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{stage}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {stageCandidates.length}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {stageCandidates.map((candidate) => (
                    <Card key={candidate.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={candidate.avatar} />
                            <AvatarFallback className="text-xs">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{candidate.name}</p>
                            <p className="text-xs text-muted-foreground">{candidate.grade}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <GraduationCap className="h-3 w-3" />
                          <span className="truncate">{candidate.academy}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{candidate.location}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-[10px] px-1 py-0">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 2 && (
                            <Badge variant="outline" className="text-[10px] px-1 py-0">
                              +{candidate.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                        
                        <Badge className={`text-xs w-full justify-center ${getStageColor(candidate.stage)}`}>
                          {candidate.stage}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Why Choose Our Platform?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Access to verified high school students from specialized academies</li>
                <li>• Streamlined candidate management and interview scheduling</li>
                <li>• Safety-first approach with proper verification and supervision</li>
                <li>• Direct connection to career-ready students seeking experience</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleCandidatePipeline;
