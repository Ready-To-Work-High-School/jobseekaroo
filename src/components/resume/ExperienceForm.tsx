
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, Briefcase, Calendar } from 'lucide-react';

const ExperienceForm = ({ data, onUpdate }) => {
  const [newExperience, setNewExperience] = useState({
    type: 'internship', // internship, externship, volunteer, part-time
    title: '',
    organization: '',
    startDate: '',
    endDate: '',
    isCurrentPosition: false,
    description: '',
    achievements: ''
  });

  const experienceTypes = [
    { value: 'internship', label: 'Internship' },
    { value: 'externship', label: 'Externship' },
    { value: 'volunteer', label: 'Volunteer Work' },
    { value: 'part-time', label: 'Part-time Job' },
    { value: 'project', label: 'School Project' },
    { value: 'leadership', label: 'Leadership Role' }
  ];

  const addExperience = () => {
    if (newExperience.title.trim() && newExperience.organization.trim()) {
      const experience = {
        ...newExperience,
        id: Date.now()
      };
      onUpdate([...data, experience]);
      setNewExperience({
        type: 'internship',
        title: '',
        organization: '',
        startDate: '',
        endDate: '',
        isCurrentPosition: false,
        description: '',
        achievements: ''
      });
    }
  };

  const removeExperience = (experienceId) => {
    onUpdate(data.filter(experience => experience.id !== experienceId));
  };

  const handleInputChange = (field, value) => {
    setNewExperience(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getTypeColor = (type) => {
    const colors = {
      internship: 'bg-blue-100 text-blue-800',
      externship: 'bg-green-100 text-green-800',
      volunteer: 'bg-purple-100 text-purple-800',
      'part-time': 'bg-orange-100 text-orange-800',
      project: 'bg-pink-100 text-pink-800',
      leadership: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Experience & Activities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experienceType">Experience Type</Label>
              <Select value={newExperience.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {experienceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Position/Role Title</Label>
              <Input
                id="title"
                value={newExperience.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Marketing Intern"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="organization">Organization/Company</Label>
            <Input
              id="organization"
              value={newExperience.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              placeholder="e.g., Baptist Health, Mayo Clinic"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newExperience.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={newExperience.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                disabled={newExperience.isCurrentPosition}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="currentPosition"
              checked={newExperience.isCurrentPosition}
              onCheckedChange={(checked) => handleInputChange('isCurrentPosition', checked)}
            />
            <Label htmlFor="currentPosition">This is my current position</Label>
          </div>

          <div>
            <Label htmlFor="description">Description of Responsibilities</Label>
            <Textarea
              id="description"
              value={newExperience.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your main responsibilities and what you learned..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="achievements">Key Achievements (Optional)</Label>
            <Textarea
              id="achievements"
              value={newExperience.achievements}
              onChange={(e) => handleInputChange('achievements', e.target.value)}
              placeholder="List any specific accomplishments, awards, or recognition..."
              rows={2}
            />
          </div>

          <Button onClick={addExperience} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {data.length > 0 && (
          <div>
            <Label>Your Experience</Label>
            <div className="space-y-3 mt-2">
              {data.map((experience) => (
                <div key={experience.id} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(experience.type)}`}>
                          {experienceTypes.find(t => t.value === experience.type)?.label}
                        </span>
                      </div>
                      <h4 className="font-medium">{experience.title}</h4>
                      <p className="text-sm text-muted-foreground">{experience.organization}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        {experience.startDate && new Date(experience.startDate).toLocaleDateString()} - 
                        {experience.isCurrentPosition ? ' Present' : 
                         (experience.endDate ? new Date(experience.endDate).toLocaleDateString() : ' Present')}
                      </div>
                      {experience.description && (
                        <p className="text-sm mt-2">{experience.description}</p>
                      )}
                      {experience.achievements && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-muted-foreground">Achievements:</p>
                          <p className="text-sm">{experience.achievements}</p>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(experience.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceForm;
