
import React, { useState } from 'react';
import AvatarWithTooltip from '@/components/shared/AvatarWithTooltip';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RadixDemo = () => {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([
    { name: 'John Smith', initials: 'JS', role: 'Software Developer' },
    { name: 'Alice Johnson', initials: 'AJ', role: 'Math Teacher' },
    { name: 'Robert Davis', initials: 'RD', role: 'Science Student' },
    { name: 'Emma Wilson', initials: 'EW', role: 'Art Student' }
  ]);

  const handleAddStudent = () => {
    if (studentName.trim() === '') return;
    
    // Generate initials from the name
    const initials = studentName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    // Add new student to the list
    setStudents([...students, { 
      name: studentName, 
      initials, 
      role: 'New Student' 
    }]);
    
    // Clear the input
    setStudentName('');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Student Avatar Generator</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddStudent}>Add Student</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Student Avatars</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            {students.map((student, index) => (
              <div key={index} className="flex flex-col items-center">
                <AvatarWithTooltip 
                  fallback={student.initials}
                  name={student.name}
                  tooltipContent={
                    <div className="text-center">
                      <div className="font-semibold">{student.name}</div>
                      <div className="text-xs text-gray-400">{student.role}</div>
                    </div>
                  }
                />
                <span className="mt-2 text-sm">{student.name}</span>
              </div>
            ))}

            <AvatarWithTooltip 
              src="https://github.com/shadcn.png" 
              fallback="CN" 
              tooltipContent="User Profile with Image" 
              alt="User Avatar"
              name="Custom Name"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RadixDemo;
