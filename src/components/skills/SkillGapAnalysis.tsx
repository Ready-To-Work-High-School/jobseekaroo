
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Search, Plus, ArrowUpRight } from 'lucide-react';
import { UserSkill, SkillGap } from '@/types/skills';
import { Job } from '@/types/job';
import { analyzeSkillGaps } from '@/lib/supabase/skills';
import { getAllJobs } from '@/lib/supabase/jobs';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface SkillGapAnalysisProps {
  userSkills: UserSkill[];
  onAddSkill: (skill: Omit<UserSkill, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

const SkillGapAnalysis = ({ userSkills, onAddSkill }: SkillGapAnalysisProps) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const fetchedJobs = await getAllJobs();
        console.log('Fetched jobs:', fetchedJobs);
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobSelect = async (job: Job) => {
    setSelectedJob(job);
    if (user && job.requirements) {
      setIsAnalyzing(true);
      try {
        const gaps = await analyzeSkillGaps(user.id, job.requirements);
        setSkillGaps(gaps);
      } catch (error) {
        console.error('Error analyzing skill gaps:', error);
        toast.error('Failed to analyze skill gaps');
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleAddSkillFromGap = async (skillName: string) => {
    if (!user) return;
    
    try {
      await onAddSkill({
        skill_name: skillName,
        proficiency_level: 1,
        is_learning: true,
        target_level: 3
      });
      
      // Refresh skill gaps after adding
      if (selectedJob && selectedJob.requirements) {
        const updatedGaps = await analyzeSkillGaps(user.id, selectedJob.requirements);
        setSkillGaps(updatedGaps);
      }
      
      toast.success(`Added ${skillName} to your learning list`);
    } catch (error) {
      console.error('Error adding skill from gap:', error);
      toast.error('Failed to add skill');
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Skill Gap Analysis</h2>
          <p className="text-muted-foreground">Compare your skills with job requirements</p>
        </div>
      </div>

      <Tabs defaultValue={selectedJob ? "analysis" : "jobs"}>
        <TabsList>
          <TabsTrigger value="jobs">Select Job</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!selectedJob}>Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                <Card 
                  key={job.id} 
                  className="cursor-pointer hover:bg-accent/30 transition-colors"
                  onClick={() => handleJobSelect(job)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company.name}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {job.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {job.location.city}, {job.location.state}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/40">
              <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-8">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4 mt-4">
          {selectedJob && (
            <>
              <div className="bg-accent/20 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-lg">Selected Job</h3>
                <p className="text-lg">{selectedJob.title} at {selectedJob.company.name}</p>
              </div>
              
              {isAnalyzing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              ) : skillGaps.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Skills to Develop</h3>
                  {skillGaps.map((gap, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{gap.skill_name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-muted-foreground">
                                Current: Level {gap.current_level}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                Required: Level {gap.required_level}
                              </span>
                            </div>
                          </div>
                          {gap.current_level === 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="ml-2"
                              onClick={() => handleAddSkillFromGap(gap.skill_name)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Skill
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No skill gaps found. Great job! You meet the requirements for this position.
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillGapAnalysis;
