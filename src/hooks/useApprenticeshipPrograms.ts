
import { useState } from 'react';
import { ApprenticeshipProgram } from '@/types/apprenticeship';

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

export const useApprenticeshipPrograms = () => {
  const [programs, setPrograms] = useState<ApprenticeshipProgram[]>(MOCK_PROGRAMS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrograms = programs.filter(program => 
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return {
    programs: filteredPrograms,
    searchTerm,
    setSearchTerm,
    handleToggleProgramStatus,
    handleDeleteProgram
  };
};
