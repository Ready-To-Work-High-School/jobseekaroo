
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, Phone, MapPin, FileText } from 'lucide-react';

const ResumePreview = ({ data }) => {
  const { personalInfo, skills, credentials, experiences } = data;

  const downloadResume = () => {
    // This would implement actual PDF generation
    alert('Resume download functionality would be implemented here');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Resume Preview
          </CardTitle>
          <Button onClick={downloadResume} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-white border rounded-lg mx-6 mb-6 p-4 space-y-4 text-black max-h-[800px] overflow-y-auto">
          {/* Header */}
          <div className="text-center border-b pb-3">
            <h1 className="text-xl font-bold leading-tight">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-2 mt-1 text-xs text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span className="truncate max-w-[120px]">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {personalInfo.phone}
                </div>
              )}
              {(personalInfo.city || personalInfo.state) && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {personalInfo.city}{personalInfo.city && personalInfo.state ? ', ' : ''}{personalInfo.state}
                </div>
              )}
            </div>
          </div>

          {/* Objective */}
          {personalInfo.objective && (
            <div>
              <h2 className="text-sm font-semibold mb-1 text-blue-600">Career Objective</h2>
              <p className="text-xs leading-relaxed">{personalInfo.objective}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-1 text-blue-600">Skills & Abilities</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-[10px] px-2 py-0">
                    {skill.name} ({skill.level})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-2 text-blue-600">Experience</h2>
              <div className="space-y-2">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-gray-200 pl-2">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-medium truncate">{exp.title}</h3>
                        <p className="text-[10px] text-gray-600 truncate">{exp.organization}</p>
                      </div>
                      <p className="text-[10px] text-gray-500 ml-2 whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-[10px] text-gray-700 mb-1 line-clamp-2">{exp.description}</p>
                    )}
                    {exp.achievements && (
                      <p className="text-[10px] text-gray-700">
                        <span className="font-medium">Achievements: </span>
                        <span className="line-clamp-1">{exp.achievements}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Credentials */}
          {credentials.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold mb-2 text-blue-600">Credentials & Certifications</h2>
              <div className="space-y-1">
                {credentials.map((credential) => (
                  <div key={credential.id} className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-medium truncate">{credential.name}</h3>
                      <p className="text-[10px] text-gray-600 truncate">{credential.issuer}</p>
                      {credential.description && (
                        <p className="text-[10px] text-gray-700 mt-1 line-clamp-1">{credential.description}</p>
                      )}
                    </div>
                    {credential.dateEarned && (
                      <p className="text-[10px] text-gray-500 ml-2 whitespace-nowrap">{formatDate(credential.dateEarned)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t pt-2 text-center">
            <p className="text-[10px] text-gray-500">
              Created with JobSeekers4HS Resume Builder
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
