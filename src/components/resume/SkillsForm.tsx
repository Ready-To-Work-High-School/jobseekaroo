
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Zap } from 'lucide-react';

const SkillsForm = ({ data, onUpdate }) => {
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('beginner');

  const skillLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const suggestedSkills = [
    'Communication', 'Teamwork', 'Problem Solving', 'Time Management',
    'Customer Service', 'Microsoft Office', 'Data Entry', 'Social Media',
    'Organization', 'Leadership', 'Adaptability', 'Critical Thinking'
  ];

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill = {
        name: newSkill.trim(),
        level: skillLevel,
        id: Date.now()
      };
      onUpdate([...data, skill]);
      setNewSkill('');
      setSkillLevel('beginner');
    }
  };

  const removeSkill = (skillId) => {
    onUpdate(data.filter(skill => skill.id !== skillId));
  };

  const addSuggestedSkill = (skillName) => {
    const skill = {
      name: skillName,
      level: 'intermediate',
      id: Date.now()
    };
    onUpdate([...data, skill]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Skills & Abilities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="skillName">Add a Skill</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="skillName"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter a skill"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Select value={skillLevel} onValueChange={setSkillLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {data.length > 0 && (
            <div>
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="flex items-center gap-1">
                    {skill.name} ({skill.level})
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="h-auto p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div>
            <Label>Suggested Skills</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Click to add popular skills that employers look for:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills
                .filter(skill => !data.some(userSkill => userSkill.name.toLowerCase() === skill.toLowerCase()))
                .map((skill) => (
                  <Button
                    key={skill}
                    variant="outline"
                    size="sm"
                    onClick={() => addSuggestedSkill(skill)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {skill}
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
