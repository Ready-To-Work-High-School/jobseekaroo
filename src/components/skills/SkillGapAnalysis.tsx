import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { getJobById } from '@/lib/supabase/jobs';

interface SkillGapAnalysisProps {
  jobId: string;
  userSkills: string[];
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({ jobId, userSkills }) => {
  const [requiredSkills, setRequiredSkills] = React.useState<string[]>([]);
  const [missingSkills, setMissingSkills] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const job = await getJobById(jobId);

        if (job && job.requirements) {
          setRequiredSkills(job.requirements);

          // Determine missing skills
          const missing = job.requirements.filter(skill => !userSkills.includes(skill));
          setMissingSkills(missing);
        } else {
          setError('Failed to load job requirements.');
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, userSkills]);

  const skillMatchPercentage = requiredSkills.length > 0
    ? ((requiredSkills.length - missingSkills.length) / requiredSkills.length) * 100
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Gap Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <p>Loading skill analysis...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Skill Match</h3>
              <Progress value={skillMatchPercentage} />
              <p className="text-xs text-muted-foreground">
                You have <span className="font-medium">{skillMatchPercentage.toFixed(0)}%</span> of the required skills.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Missing Skills</h3>
              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {missingSkills.map((skill, index) => (
                    <Badge key={index} variant="destructive">{skill}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">You have all the required skills!</p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillGapAnalysis;
