
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Award, Calendar, GraduationCap, Plus, Search, Users } from 'lucide-react';
import { ApprenticeshipProgram } from '@/types/apprenticeship';
import { useApprenticeshipPrograms } from '@/hooks/useApprenticeshipPrograms';
import { ApprenticeshipForm } from '../apprenticeship/ApprenticeshipForm';
import { ApprenticeshipList } from '../apprenticeship/ApprenticeshipList';

const ApprenticeshipProgramsTab = () => {
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ApprenticeshipProgram | null>(null);
  
  const {
    programs,
    searchTerm,
    setSearchTerm,
    handleToggleProgramStatus,
    handleDeleteProgram
  } = useApprenticeshipPrograms();

  const handleEditProgram = (program: ApprenticeshipProgram) => {
    setSelectedProgram(program);
    setIsAddProgramOpen(true);
  };

  const handleCreateProgram = () => {
    setIsAddProgramOpen(false);
    // Reset form fields
    setSelectedProgram(null);
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
            <Button className="gap-1" onClick={() => setIsAddProgramOpen(true)}>
              <Plus className="h-4 w-4" />
              Create Program
            </Button>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Apprenticeship Program</DialogTitle>
                <DialogDescription>
                  Define a new apprenticeship program for student talent development
                </DialogDescription>
              </DialogHeader>
              
              <ApprenticeshipForm 
                onSubmit={handleCreateProgram}
                onCancel={() => setIsAddProgramOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="rounded-md border">
          {programs.length > 0 ? (
            <ApprenticeshipList
              programs={programs}
              onEdit={handleEditProgram}
              onToggleStatus={handleToggleProgramStatus}
              onDelete={handleDeleteProgram}
            />
          ) : (
            <div className="text-center py-8">
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
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {programs.length} programs
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
