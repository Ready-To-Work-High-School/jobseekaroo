
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, PlusCircle, Calendar, GraduationCap, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { getUserSkills, getSkillResources } from '@/lib/supabase/skills';
import { UserSkill, SkillResource } from '@/types/skills';

const LearningPathView = () => {
  const { user } = useAuth();
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [resources, setResources] = useState<SkillResource[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const skills = await getUserSkills(user.id);
        setUserSkills(skills);
        
        // Fetch resources for the top skills
        const topSkills = skills.slice(0, 3).map(skill => skill.skill_name);
        if (topSkills.length > 0) {
          const allResources = await Promise.all(
            topSkills.map(skill => getSkillResources(skill))
          );
          setResources(allResources.flat());
        }
      } catch (error) {
        console.error('Error fetching learning path data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  // Calculate recommended learning path based on skills
  const getRecommendedPath = () => {
    const path = [];
    
    // Sort skills by gap (target_level - proficiency_level)
    const skillsByGap = [...userSkills].sort((a, b) => {
      const gapA = (a.target_level || (a.proficiency_level + 1)) - a.proficiency_level;
      const gapB = (b.target_level || (b.proficiency_level + 1)) - b.proficiency_level;
      return gapB - gapA;
    });
    
    return skillsByGap.slice(0, 3);
  };
  
  if (loading) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-muted-foreground">Creating your personalized learning path...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const recommendedPath = getRecommendedPath();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Learning Path</CardTitle>
          <CardDescription>
            Based on your assessment, we've created a customized learning path to help you reach your career goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendedPath.length > 0 ? (
            <>
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Priority Skills to Develop</h3>
                {recommendedPath.map((skill, index) => (
                  <Card key={skill.id} className="bg-muted/50">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <h4 className="font-medium">{skill.skill_name}</h4>
                          <Badge variant="outline">Level {skill.proficiency_level} → {skill.target_level || skill.proficiency_level + 1}</Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <PlusCircle className="w-4 h-4 mr-1" /> Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Recommended Learning Resources</h3>
                {resources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resources.slice(0, 4).map(resource => (
                      <Card key={resource.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="py-4">
                          <div className="flex items-start">
                            <div className="mr-3">
                              {resource.resource_type === 'video' && (
                                <BookOpen className="h-5 w-5 text-blue-500" />
                              )}
                              {resource.resource_type === 'article' && (
                                <BookOpen className="h-5 w-5 text-green-500" />
                              )}
                              {resource.resource_type === 'course' && (
                                <GraduationCap className="h-5 w-5 text-amber-500" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{resource.resource_title}</h4>
                              <p className="text-sm text-muted-foreground">{resource.description || `Resource for ${resource.skill_name}`}</p>
                              <div className="mt-2">
                                <Button variant="link" className="p-0 h-auto" asChild>
                                  <a href={resource.resource_url} target="_blank" rel="noopener noreferrer">
                                    View Resource
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Resources will be suggested based on your progress.</p>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-4">Learning Schedule</h3>
                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Recommended Learning Schedule</h4>
                        <p className="text-sm text-muted-foreground">
                          We recommend dedicating 2-3 hours per week to skill development
                        </p>
                        <ul className="mt-2 space-y-1">
                          <li className="text-sm flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-green-500" />
                            <span>Focus on one skill at a time</span>
                          </li>
                          <li className="text-sm flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-green-500" />
                            <span>Complete activities to reinforce learning</span>
                          </li>
                          <li className="text-sm flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-green-500" />
                            <span>Track progress regularly</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Complete your skill assessment to receive a personalized learning path.
              </p>
              <Button className="mt-4">Start Assessment</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPathView;
