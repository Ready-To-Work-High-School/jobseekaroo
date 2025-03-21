
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserSkill, SkillProgress, SkillResource } from '@/types/skills';
import { Calendar, Target, TrendingUp, Clock, BookOpen, ArrowRight, Award } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SkillProgressTrackerProps {
  userSkills: UserSkill[];
  resources: SkillResource[];
  isLoading: boolean;
  onViewResources: (skillName: string) => void;
}

export function SkillProgressTracker({ 
  userSkills, 
  resources, 
  isLoading,
  onViewResources 
}: SkillProgressTrackerProps) {
  const [selectedSkill, setSelectedSkill] = useState<UserSkill | null>(null);
  const [showProgressDialog, setShowProgressDialog] = useState(false);
  
  // Filter skills that are in learning mode (is_learning = true)
  const learningSkills = userSkills.filter(skill => skill.is_learning && skill.target_level);
  
  // Calculate progress for each skill
  const progressData: SkillProgress[] = learningSkills.map(skill => {
    const startLevel = 1; // Assuming everyone starts at level 1
    const currentLevel = skill.proficiency_level;
    const targetLevel = skill.target_level || 5;
    const progressPercentage = ((currentLevel - startLevel) / (targetLevel - startLevel)) * 100;
    
    // Find resources related to this skill
    const skillResources = resources.filter(resource => 
      resource.skill_name.toLowerCase() === skill.skill_name.toLowerCase()
    );
    
    return {
      skill_id: skill.id,
      skill_name: skill.skill_name,
      start_level: startLevel,
      current_level: currentLevel,
      target_level: targetLevel,
      progress_percentage: progressPercentage,
      last_updated: skill.updated_at,
      learning_resources: skillResources
    };
  });
  
  // Get proficiency level label
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
  
  // Get color based on progress percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-blue-500";
    if (percentage >= 40) return "bg-yellow-500";
    if (percentage >= 20) return "bg-orange-500";
    return "bg-red-500";
  };
  
  const handleViewSkillDetail = (skill: UserSkill) => {
    setSelectedSkill(skill);
    setShowProgressDialog(true);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  if (learningSkills.length === 0) {
    return (
      <Card className="bg-muted/40">
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No skills in learning mode</h3>
          <p className="text-muted-foreground mb-4">
            Mark skills you want to improve as "Learning in Progress" to track your development journey.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Skill Development Progress</h2>
      <p className="text-muted-foreground">
        Track your learning journey and progress for skills you're actively developing
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressData.map((skill) => (
          <Card key={skill.skill_id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{skill.skill_name}</CardTitle>
                  <CardDescription>
                    {getProficiencyLabel(skill.current_level)} → {getProficiencyLabel(skill.target_level)}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                  Learning
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round(skill.progress_percentage)}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${getProgressColor(skill.progress_percentage)}`}
                      style={{ width: `${skill.progress_percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Updated {formatDistanceToNow(new Date(skill.last_updated))} ago</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-3.5 w-3.5 mr-1" />
                    <span>{skill.learning_resources.length} resources</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onViewResources(skill.skill_name)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Resources
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleViewSkillDetail(userSkills.find(s => s.id === skill.skill_id)!)}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                View Progress
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={showProgressDialog} onOpenChange={setShowProgressDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Skill Development: {selectedSkill?.skill_name}</DialogTitle>
            <DialogDescription>
              Track your progress and find resources to improve this skill
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="progress">
            <TabsList className="w-full">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="resources">Learning Resources</TabsTrigger>
              <TabsTrigger value="jobs">Related Jobs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress" className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedSkill?.skill_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    You are currently at {getProficiencyLabel(selectedSkill?.proficiency_level || 1)} level
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Target:</span>
                  <Badge variant="outline" className="bg-primary/10 border-primary/30">
                    {getProficiencyLabel(selectedSkill?.target_level || 5)}
                  </Badge>
                </div>
              </div>
              
              {selectedSkill && (
                <div className="space-y-6 mt-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Progress Timeline</h4>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary/10 text-primary">
                            {getProficiencyLabel(1)}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-100 text-green-800">
                            {getProficiencyLabel(selectedSkill.target_level || 5)}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-secondary">
                        <div 
                          style={{ 
                            width: `${((selectedSkill.proficiency_level - 1) / ((selectedSkill.target_level || 5) - 1)) * 100}%` 
                          }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                        ></div>
                      </div>
                      <div className="flex text-xs justify-between text-muted-foreground">
                        <div>Started Learning</div>
                        <div>Current Position</div>
                        <div>Target Level</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">Current Level</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">{selectedSkill.proficiency_level}/5</div>
                        <p className="text-xs text-muted-foreground">
                          {getProficiencyLabel(selectedSkill.proficiency_level)}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">Target Level</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">{selectedSkill.target_level}/5</div>
                        <p className="text-xs text-muted-foreground">
                          {getProficiencyLabel(selectedSkill.target_level || 5)}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">Progress</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                          {Math.round(((selectedSkill.proficiency_level - 1) / ((selectedSkill.target_level || 5) - 1)) * 100)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Of target achieved
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Next Steps to Improve</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">1</span>
                        </div>
                        <p className="text-sm">Complete at least 3 courses related to {selectedSkill.skill_name}</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">2</span>
                        </div>
                        <p className="text-sm">Practice with hands-on projects to build experience</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">3</span>
                        </div>
                        <p className="text-sm">Join community forums and groups to network with others</p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="resources" className="space-y-4 py-4">
              {selectedSkill && progressData.find(p => p.skill_id === selectedSkill.id)?.learning_resources.length ? (
                <div className="space-y-3">
                  {progressData
                    .find(p => p.skill_id === selectedSkill.id)
                    ?.learning_resources.map((resource, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{resource.resource_title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {resource.description || `Learn ${selectedSkill.skill_name} with this resource.`}
                              </p>
                            </div>
                            <Badge>{resource.resource_type}</Badge>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button asChild size="sm">
                              <a href={resource.resource_url} target="_blank" rel="noopener noreferrer">
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Access Resource
                              </a>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-6">
                  <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-1">No resources found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We couldn't find any learning resources for {selectedSkill?.skill_name}
                  </p>
                  <Button onClick={() => onViewResources(selectedSkill?.skill_name || '')}>
                    Find Resources
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="jobs" className="space-y-4 py-4">
              <div className="text-center py-6">
                <Award className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-1">Connect skills to opportunities</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See job listings that require {selectedSkill?.skill_name} and what level they need
                </p>
                <Button asChild>
                  <a href="/jobs">Browse Job Opportunities</a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProgressDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
