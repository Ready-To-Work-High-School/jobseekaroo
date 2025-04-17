
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { createUserSkill } from '@/lib/supabase/skills';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

interface SkillAssessmentFormProps {
  onComplete: () => void;
}

const SkillAssessmentForm = ({ onComplete }: SkillAssessmentFormProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [careerGoal, setCareerGoal] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<{[key: string]: number}>({});
  const [interests, setInterests] = useState<string[]>([]);
  
  const careerOptions = [
    { label: 'Customer Service', value: 'customer-service' },
    { label: 'Administrative/Office', value: 'administrative' },
    { label: 'Retail/Sales', value: 'retail' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Information Technology', value: 'tech' },
    { label: 'Marketing', value: 'marketing' },
  ];
  
  const skillOptions = [
    { name: 'Communication', category: 'soft' },
    { name: 'Problem Solving', category: 'soft' },
    { name: 'Time Management', category: 'soft' },
    { name: 'Customer Service', category: 'soft' },
    { name: 'Microsoft Office', category: 'technical' },
    { name: 'Data Entry', category: 'technical' },
    { name: 'Social Media', category: 'technical' },
    { name: 'Basic Accounting', category: 'technical' }
  ];
  
  const interestOptions = [
    { id: 'working-with-people', label: 'Working with people' },
    { id: 'solving-problems', label: 'Solving problems' },
    { id: 'creative-work', label: 'Creative work' },
    { id: 'working-with-data', label: 'Working with data' },
    { id: 'technical-tasks', label: 'Technical tasks' },
    { id: 'leadership', label: 'Leadership' },
  ];
  
  const handleSkillChange = (skill: string, level: number) => {
    setSelectedSkills({
      ...selectedSkills,
      [skill]: level
    });
  };
  
  const handleInterestToggle = (interestId: string) => {
    if (interests.includes(interestId)) {
      setInterests(interests.filter(id => id !== interestId));
    } else {
      setInterests([...interests, interestId]);
    }
  };
  
  const handleNext = () => {
    setStep(step + 1);
  };
  
  const handleBack = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to save your assessment');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save skills to the database
      for (const [skill, level] of Object.entries(selectedSkills)) {
        await createUserSkill({
          user_id: user.id,
          skill_name: skill,
          proficiency_level: level,
          is_learning: true,
          target_level: Math.min(level + 1, 5)
        });
      }
      
      toast.success('Assessment complete!');
      onComplete();
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast.error('Failed to save your assessment');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Assessment</CardTitle>
        <CardDescription>
          Let's identify your current skills and career goals to create a personalized learning path
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What is your primary career goal?</h3>
            <RadioGroup value={careerGoal} onValueChange={setCareerGoal}>
              {careerOptions.map(option => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {careerGoal === 'other' && (
              <Input 
                placeholder="Specify your career goal" 
                className="mt-2"
              />
            )}
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">How would you rate your current skill level?</h3>
            <p className="text-sm text-muted-foreground">
              Rate each skill from 1 (beginner) to 5 (expert)
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Soft Skills</h4>
                {skillOptions
                  .filter(skill => skill.category === 'soft')
                  .map(skill => (
                    <div key={skill.name} className="mb-4">
                      <div className="flex justify-between mb-2">
                        <Label>{skill.name}</Label>
                        <span className="text-sm text-muted-foreground">
                          {selectedSkills[skill.name] ? `Level ${selectedSkills[skill.name]}` : 'Not rated'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map(level => (
                          <Button 
                            key={level} 
                            variant={selectedSkills[skill.name] === level ? "default" : "outline"} 
                            size="sm"
                            onClick={() => handleSkillChange(skill.name, level)}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Technical Skills</h4>
                {skillOptions
                  .filter(skill => skill.category === 'technical')
                  .map(skill => (
                    <div key={skill.name} className="mb-4">
                      <div className="flex justify-between mb-2">
                        <Label>{skill.name}</Label>
                        <span className="text-sm text-muted-foreground">
                          {selectedSkills[skill.name] ? `Level ${selectedSkills[skill.name]}` : 'Not rated'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map(level => (
                          <Button 
                            key={level} 
                            variant={selectedSkills[skill.name] === level ? "default" : "outline"} 
                            size="sm"
                            onClick={() => handleSkillChange(skill.name, level)}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What are your areas of interest?</h3>
            <p className="text-sm text-muted-foreground">
              Select all that apply to you
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {interestOptions.map(option => (
                <div key={option.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={option.id} 
                    checked={interests.includes(option.id)}
                    onCheckedChange={() => handleInterestToggle(option.id)}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        
        {step < 3 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Complete Assessment'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SkillAssessmentForm;
