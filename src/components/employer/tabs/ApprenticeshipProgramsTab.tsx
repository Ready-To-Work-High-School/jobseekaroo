
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Award, Calendar, Check, ChevronDown, Edit, GraduationCap, Plus, Search, Tag, Trash, Users } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';

interface ApprenticeshipProgram {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  duration: string;
  startDate: string;
  compensation: string;
  skillsTaught: string[];
  isActive: boolean;
}

const MOCK_PROGRAMS: ApprenticeshipProgram[] = [
  {
    id: '1',
    title: 'Retail Management Apprenticeship',
    description: 'Learn essential skills for retail management including inventory, customer service, and team leadership.',
    requirements: ['High school diploma', 'Basic math skills', 'Customer service orientation'],
    duration: '6 months',
    startDate: '2024-01-15',
    compensation: 'Paid ($15/hr)',
    skillsTaught: ['Inventory Management', 'POS Systems', 'Customer Service', 'Team Leadership'],
    isActive: true
  },
  {
    id: '2',
    title: 'Administrative Professional Development',
    description: 'Develop skills in office management, scheduling, and professional communication.',
    requirements: ['High school diploma', 'Basic computer skills'],
    duration: '3 months',
    startDate: '2024-02-01',
    compensation: 'Paid ($14/hr) + College Credit',
    skillsTaught: ['Microsoft Office', 'Scheduling', 'Filing Systems', 'Business Communication'],
    isActive: true
  },
  {
    id: '3',
    title: 'Customer Service Excellence',
    description: 'Master the art of customer service, conflict resolution, and sales techniques.',
    requirements: ['None - open to all high school students'],
    duration: '4 months',
    startDate: '2023-09-15',
    compensation: 'Stipend + Certificate',
    skillsTaught: ['Customer Engagement', 'Conflict Resolution', 'Sales Techniques', 'CRM Software'],
    isActive: false
  }
];

const ApprenticeshipProgramsTab = () => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<ApprenticeshipProgram[]>(MOCK_PROGRAMS);
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<ApprenticeshipProgram | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  // For the new program form
  const [formSkills, setFormSkills] = useState<string[]>([]);
  const [formRequirements, setFormRequirements] = useState<string[]>([]);
  
  const filteredPrograms = programs.filter(program => 
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
  
  const handleCreateProgram = () => {
    // In a real app, this would create a new program in the database
    setIsAddProgramOpen(false);
    // Reset form fields
    setFormSkills([]);
    setFormRequirements([]);
    setSelectedDate(undefined);
  };
  
  const handleEditProgram = (program: ApprenticeshipProgram) => {
    setSelectedProgram(program);
    // In a real app, this would open a dialog to edit the program
  };
  
  const handleToggleProgramStatus = (programId: string) => {
    setPrograms(programs.map(program => 
      program.id === programId 
        ? { ...program, isActive: !program.isActive } 
        : program
    ));
  };
  
  const handleDeleteProgram = (programId: string) => {
    setPrograms(programs.filter(program => program.id !== programId));
  };
  
  return (
    <Card>
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Apprenticeship Programs</CardTitle>
        </div>
        <CardDescription>
          Offer apprenticeships and training programs to develop student talents
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search programs"
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Dialog open={isAddProgramOpen} onOpenChange={setIsAddProgramOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Create Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Apprenticeship Program</DialogTitle>
                <DialogDescription>
                  Define a new apprenticeship program for student talent development
                </DialogDescription>
              </DialogHeader>
              
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddProgramOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateProgram}>Create Program</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Program</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Compensation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{program.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">{program.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{program.duration}</TableCell>
                    <TableCell>{program.startDate}</TableCell>
                    <TableCell>{program.compensation}</TableCell>
                    <TableCell>
                      <Badge variant={program.isActive ? "success" : "secondary"}>
                        {program.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleToggleProgramStatus(program.id)}
                        >
                          {program.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditProgram(program)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500" 
                          onClick={() => handleDeleteProgram(program.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <GraduationCap className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium">No apprenticeship programs found</h3>
                    <p className="text-muted-foreground mt-1">
                      {searchTerm 
                        ? "No programs match your search term" 
                        : "You haven't created any apprenticeship programs yet"}
                    </p>
                    <Button className="mt-4" onClick={() => setIsAddProgramOpen(true)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Create Program
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredPrograms.length} of {programs.length} programs
        </div>
        
        <div className="flex">
          <Button variant="outline" size="sm" className="mr-2">
            <Calendar className="h-4 w-4 mr-2" />
            Export Programs
          </Button>
          <Button size="sm">
            <Users className="h-4 w-4 mr-2" />
            View Applicants
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApprenticeshipProgramsTab;
