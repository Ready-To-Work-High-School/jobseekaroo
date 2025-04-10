
import React from 'react';
import { StudentProfile, getRandomStudents } from '@/lib/mock-data/students';
import StudentProfileCard from './StudentProfileCard';

interface StudentProfileGridProps {
  students?: StudentProfile[];
  count?: number;
  variant?: 'default' | 'compact';
  className?: string;
}

const StudentProfileGrid: React.FC<StudentProfileGridProps> = ({
  students,
  count = 3,
  variant = 'default',
  className = ''
}) => {
  // If no students are provided, get random ones
  const displayStudents = students || getRandomStudents(count);
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {displayStudents.map((student) => (
        <StudentProfileCard 
          key={student.id} 
          student={student} 
          variant={variant}
        />
      ))}
    </div>
  );
};

export default StudentProfileGrid;
