
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Check, Plus, Tag, Trash } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';

interface ApprenticeshipFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export const ApprenticeshipForm = ({ onSubmit, onCancel }: ApprenticeshipFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [formSkills, setFormSkills] = useState<string[]>([]);
  const [formRequirements, setFormRequirements] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !formSkills.includes(newSkill.trim())) {
      setFormSkills([...formSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim() && !formRequirements.includes(newRequirement.trim())) {
      setFormRequirements([...formRequirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormSkills(formSkills.filter(s => s !== skill));
  };

  const handleRemoveRequirement = (requirement: string) => {
    setFormRequirements(formRequirements.filter(r => r !== requirement));
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Program Title</Label>
        <Input id="title" placeholder="e.g., Retail Management Apprenticeship" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Program Description</Label>
        <Textarea 
          id="description" 
          placeholder="Describe the apprenticeship program and its benefits..."
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="duration">Duration</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 month</SelectItem>
              <SelectItem value="3months">3 months</SelectItem>
              <SelectItem value="6months">6 months</SelectItem>
              <SelectItem value="9months">9 months</SelectItem>
              <SelectItem value="1year">1 year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Start Date</Label>
          <DatePicker 
            selected={selectedDate} 
            onSelect={setSelectedDate} 
            placeholder="Pick a date"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="compensation">Compensation</Label>
        <Input id="compensation" placeholder="e.g., Paid ($15/hr), Stipend, College Credit" />
      </div>

      <div className="grid gap-2">
        <Label>Program Requirements</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formRequirements.map((requirement, index) => (
            <Badge key={index} variant="outline" className="flex gap-1 items-center">
              <Check className="h-3 w-3" />
              {requirement}
              <button onClick={() => handleRemoveRequirement(requirement)} className="ml-1 text-red-500 hover:text-red-700">
                <Trash className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            placeholder="Add a requirement"
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddRequirement}
            disabled={!newRequirement.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Skills Taught</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formSkills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 flex gap-1 items-center">
              <Tag className="h-3 w-3" />
              {skill}
              <button onClick={() => handleRemoveSkill(skill)} className="ml-1 text-red-500 hover:text-red-700">
                <Trash className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="activeProgram" defaultChecked />
        <Label htmlFor="activeProgram">Program is currently active and accepting applicants</Label>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>Create Program</Button>
      </div>
    </div>
  );
};
