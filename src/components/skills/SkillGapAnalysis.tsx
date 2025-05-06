import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserSkill, SkillGap } from '@/types/skills';
import { Job } from '@/types/job';
import { analyzeSkillGaps, getAllJobs, getJobById } from '@/lib/supabase';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { TrendingUp, AlertTriangle, CheckCircle, Plus } from 'lucide-react';

const skillFormSchema = z.object({
  skill_name: z.string().min(2, {
    message: "Skill name must be at least 2 characters.",
  }),
  proficiency_level: z.number().min(1).max(5),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface SkillGapAnalysisProps {
  userSkills: UserSkill[];
  onAddSkill: (skill: Omit<UserSkill, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
}

const SkillGapAnalysis = ({ userSkills, onAddSkill }: SkillGapAnalysisProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedSkillToAdd, setSelectedSkillToAdd] = useState('');
  
  const { user } = useAuth();
  
  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      skill_name: "",
      proficiency_level: 1,
    },
  });
  
  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      try {
        const allJobs = await getAllJobs();
        setJobs(allJobs);
        
        if (allJobs.length > 0 && !selectedJobId) {
          setSelectedJobId(allJobs[0].id);
        }
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadJobs();
  }, [selectedJobId]);
  
  useEffect(() => {
    const loadSelectedJob = async () => {
      if (!selectedJobId) return;
      
      setIsLoading(true);
      try {
        const job = await getJobById(selectedJobId);
        setSelectedJob(job);
        
        if (job && user) {
          const gaps = await analyzeSkillGaps(user.id, job.requirements);
          setSkillGaps(gaps);
        }
      } catch (error) {
        console.error('Error loading selected job:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSelectedJob();
  }, [selectedJobId, userSkills, user]);
  
  const handleJobSelect = (jobId: string) => {
    setSelectedJobId(jobId);
  };
  
  const handleAddSkillClick = (skillName: string) => {
    setSelectedSkillToAdd(skillName);
    form.setValue('skill_name', skillName);
    setShowAddDialog(true);
  };
  
  const onSubmit = async (values: SkillFormValues) => {
    await onAddSkill({
      skill_name: values.skill_name,
      proficiency_level: values.proficiency_level,
      is_learning: true,
      target_level: 3,
    });
    
    form.reset({
      skill_name: "",
      proficiency_level: 1,
    });
    
    setShowAddDialog(false);
  };
  
  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Elementary";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "Unknown";
    }
  };
  
  // Group skill gaps by severity
  const criticalGaps = skillGaps.filter(gap => gap.gap >= 3);
  const significantGaps = skillGaps.filter(gap => gap.gap === 2);
  const minorGaps = skillGaps.filter(gap => gap.gap === 1);
  const noGaps = selectedJob?.requirements.filter(req => 
    !skillGaps.some(gap => gap.skill_name === req)
  ) || [];
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Skill Gap Analysis</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Choose a Job to Analyze</CardTitle>
            <CardDescription>
              Compare your current skills with the requirements for a specific job
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedJobId} onValueChange={handleJobSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a job" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title} at {job.company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : selectedJob ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{selectedJob.title}</CardTitle>
              <CardDescription>{selectedJob.company.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Skill Match Overview</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-full">
                      <Progress 
                        value={((selectedJob.requirements.length - skillGaps.length) / selectedJob.requirements.length) * 100} 
                        className="h-3"
                      />
                    </div>
                    <span className="font-medium">
                      {selectedJob.requirements.length - skillGaps.length}/{selectedJob.requirements.length} skills matched
                    </span>
                  </div>
                </div>
                
                {criticalGaps.length > 0 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Critical Skill Gaps</AlertTitle>
                    <AlertDescription>
                      You have {criticalGaps.length} critical skill {criticalGaps.length === 1 ? 'gap' : 'gaps'} for this position.
                      Consider focusing on these skills first.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            {criticalGaps.length > 0 && (
              <Card className="border-destructive/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-destructive">
                    Critical Skill Gaps
                  </CardTitle>
                  <CardDescription>
                    These skills have a significant gap and should be prioritized
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {criticalGaps.map((gap) => (
                    <div key={gap.skill_name} className="mb-4 last:mb-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{gap.skill_name}</span>
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                            Gap: {gap.gap}
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddSkillClick(gap.skill_name)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Skill
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div 
                            className="bg-destructive h-2.5 rounded-full" 
                            style={{ width: `${(gap.current_level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm whitespace-nowrap">
                          {getProficiencyLabel(gap.current_level)} → {getProficiencyLabel(gap.required_level)}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {significantGaps.length > 0 && (
              <Card className="border-orange-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-orange-600">
                    Significant Skill Gaps
                  </CardTitle>
                  <CardDescription>
                    These skills need improvement but the gap is not as critical
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {significantGaps.map((gap) => (
                    <div key={gap.skill_name} className="mb-4 last:mb-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{gap.skill_name}</span>
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">
                            Gap: {gap.gap}
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddSkillClick(gap.skill_name)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Skill
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div 
                            className="bg-orange-500 h-2.5 rounded-full" 
                            style={{ width: `${(gap.current_level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm whitespace-nowrap">
                          {getProficiencyLabel(gap.current_level)} → {getProficiencyLabel(gap.required_level)}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {minorGaps.length > 0 && (
              <Card className="border-yellow-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-yellow-600">
                    Minor Skill Gaps
                  </CardTitle>
                  <CardDescription>
                    These skills need just a little improvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {minorGaps.map((gap) => (
                    <div key={gap.skill_name} className="mb-4 last:mb-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{gap.skill_name}</span>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                            Gap: {gap.gap}
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddSkillClick(gap.skill_name)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Skill
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-secondary rounded-full h-2.5">
                          <div 
                            className="bg-yellow-500 h-2.5 rounded-full" 
                            style={{ width: `${(gap.current_level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm whitespace-nowrap">
                          {getProficiencyLabel(gap.current_level)} → {getProficiencyLabel(gap.required_level)}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {noGaps.length > 0 && (
              <Card className="border-green-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-green-600">
                    Matched Skills
                  </CardTitle>
                  <CardDescription>
                    Your skills already meet these requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {noGaps.map((skill) => (
                      <Badge key={skill} className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      ) : (
        <Card className="bg-muted/40">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Select a job to analyze</h3>
            <p className="text-muted-foreground mb-4">
              Choose a job from the dropdown to analyze the gap between your skills and job requirements.
            </p>
          </CardContent>
        </Card>
      )}
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Skill: {selectedSkillToAdd}</DialogTitle>
            <DialogDescription>
              Add this skill to your profile with your current proficiency level.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
              <FormField
                control={form.control}
                name="skill_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="proficiency_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Proficiency Level: {getProficiencyLabel(field.value)}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-between text-xs mt-1">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">
                  Add Skill
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillGapAnalysis;
