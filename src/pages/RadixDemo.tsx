
import React, { useState } from 'react';
import AvatarWithTooltip from '@/components/shared/AvatarWithTooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';

type Student = {
  name: string;
  initials: string;
  role: string;
  useColorBackground: boolean;
  avatarImage?: string;
};

const RadixDemo = () => {
  const [studentName, setStudentName] = useState('');
  const [avatarType, setAvatarType] = useState<'color' | 'readyplayer'>('color');
  const [createdAvatarUrl, setCreatedAvatarUrl] = useState<string | null>(null);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);
  const [students, setStudents] = useState<Student[]>([
    { name: 'John Smith', initials: 'JS', role: 'Software Developer', useColorBackground: true },
    { name: 'Alice Johnson', initials: 'AJ', role: 'Math Teacher', useColorBackground: true },
    { name: 'Robert Davis', initials: 'RD', role: 'Science Student', useColorBackground: true },
    { name: 'Emma Wilson', initials: 'EW', role: 'Art Student', useColorBackground: true }
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
      role: 'New Student',
      useColorBackground: avatarType === 'color',
      avatarImage: avatarType === 'readyplayer' ? createdAvatarUrl || undefined : undefined
    }]);
    
    // Clear the input
    setStudentName('');
    setCreatedAvatarUrl(null);
  };

  const handleAvatarComplete = (avatarUrl: string) => {
    setCreatedAvatarUrl(avatarUrl);
    setShowAvatarCreator(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Student Avatar Generator</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full mb-4"
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Avatar Type</h3>
              <RadioGroup 
                value={avatarType} 
                onValueChange={(value) => setAvatarType(value as 'color' | 'readyplayer')}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="color" id="color" />
                  <Label htmlFor="color">Color Background</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="readyplayer" id="readyplayer" />
                  <Label htmlFor="readyplayer">3D Avatar</Label>
                </div>
              </RadioGroup>
            </div>
            
            {avatarType === 'readyplayer' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Create 3D Avatar</h3>
                
                {showAvatarCreator ? (
                  <div className="relative h-[500px] border rounded-lg overflow-hidden">
                    <AvatarCreator 
                      subdomain="demo"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      onAvatarExported={handleAvatarComplete}
                    />
                    <Button 
                      variant="destructive" 
                      className="absolute top-2 right-2 z-10" 
                      onClick={() => setShowAvatarCreator(false)}
                      size="sm"
                    >
                      Close Editor
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {createdAvatarUrl ? (
                      <div className="mb-4">
                        <img 
                          src={createdAvatarUrl} 
                          alt="Created Avatar" 
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      </div>
                    ) : null}
                    <Button onClick={() => setShowAvatarCreator(true)} className="w-full">
                      {createdAvatarUrl ? "Change Avatar" : "Create Avatar"}
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            <Button 
              onClick={handleAddStudent} 
              className="w-full mt-3"
              disabled={studentName.trim() === '' || (avatarType === 'readyplayer' && !createdAvatarUrl)}
            >
              Add Student
            </Button>
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
                  src={student.avatarImage}
                  fallback={student.initials}
                  name={student.name}
                  useColorBackground={student.useColorBackground}
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RadixDemo;
