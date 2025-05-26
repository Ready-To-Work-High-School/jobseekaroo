
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
    <Card>
      <CardHeader>
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
      <CardContent>
        <div className="bg-white border rounded-lg p-6 space-y-6 text-black">
          {/* Header */}
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl font-bold">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="flex justify-center items-center gap-4 mt-2 text-sm text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {personalInfo.email}
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
              <h2 className="text-lg font-semibold mb-2 text-blue-600">Career Objective</h2>
              <p className="text-sm leading-relaxed">{personalInfo.objective}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-blue-600">Skills & Abilities</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-xs">
                    {skill.name} ({skill.level})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Experience</h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-medium">{exp.title}</h3>
                        <p className="text-sm text-gray-600">{exp.organization}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.isCurrentPosition ? 'Present' : formatDate(exp.endDate)}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mb-1">{exp.description}</p>
                    )}
                    {exp.achievements && (
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Key Achievements: </span>
                        {exp.achievements}
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
              <h2 className="text-lg font-semibold mb-3 text-blue-600">Credentials & Certifications</h2>
              <div className="space-y-2">
                {credentials.map((credential) => (
                  <div key={credential.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm">{credential.name}</h3>
                      <p className="text-xs text-gray-600">{credential.issuer}</p>
                      {credential.description && (
                        <p className="text-xs text-gray-700 mt-1">{credential.description}</p>
                      )}
                    </div>
                    {credential.dateEarned && (
                      <p className="text-xs text-gray-500">{formatDate(credential.dateEarned)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t pt-4 text-center">
            <p className="text-xs text-gray-500">
              Created with JobSeekers4HS Resume Builder
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
