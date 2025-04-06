
import React, { useState } from 'react';
import StudentForm from '@/components/students/StudentForm';
import StudentAvatarGrid from '@/components/students/StudentAvatarGrid';

type Student = {
  name: string;
  initials: string;
  role: string;
  useColorBackground: boolean;
  avatarImage?: string;
};

type AvatarType = 'color' | 'readyplayer';

const RadixDemo = () => {
  const [students, setStudents] = useState<Student[]>([
    { name: 'John Smith', initials: 'JS', role: 'Software Developer', useColorBackground: true },
    { name: 'Alice Johnson', initials: 'AJ', role: 'Math Teacher', useColorBackground: true },
    { name: 'Robert Davis', initials: 'RD', role: 'Science Student', useColorBackground: true },
    { name: 'Emma Wilson', initials: 'EW', role: 'Art Student', useColorBackground: true }
  ]);

  const handleAddStudent = (name: string, avatarType: AvatarType, avatarUrl: string | null) => {
    // Generate initials from the name
    const initials = name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    // Add new student to the list
    setStudents([...students, { 
      name: name, 
      initials, 
      role: 'New Student',
      useColorBackground: avatarType === 'color',
      avatarImage: avatarType === 'readyplayer' ? avatarUrl || undefined : undefined
    }]);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Student Avatar Generator</h1>
      
      <StudentForm onAddStudent={handleAddStudent} />
      
      <StudentAvatarGrid students={students} />
    </div>
  );
};

export default RadixDemo;
