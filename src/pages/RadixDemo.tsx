
import React, { useState } from 'react';
import AvatarWithTooltip from '@/components/shared/AvatarWithTooltip';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample avatar images
const avatarImages = [
  'https://github.com/shadcn.png',
  'https://xsgames.co/randomusers/avatar.php?g=male',
  'https://xsgames.co/randomusers/avatar.php?g=female',
  'https://api.dicebear.com/7.x/bottts/svg',
  'https://api.dicebear.com/7.x/lorelei/svg'
];

type Student = {
  name: string;
  initials: string;
  role: string;
  useColorBackground: boolean;
  avatarImage?: string;
};

const RadixDemo = () => {
  const [studentName, setStudentName] = useState('');
  const [avatarType, setAvatarType] = useState<'color' | 'image'>('color');
  const [selectedImage, setSelectedImage] = useState(avatarImages[0]);
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
      avatarImage: avatarType === 'image' ? selectedImage : undefined
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
                onValueChange={(value) => setAvatarType(value as 'color' | 'image')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="color" id="color" />
                  <Label htmlFor="color">Color Background</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <Label htmlFor="image">Image</Label>
                </div>
              </RadioGroup>
            </div>
            
            {avatarType === 'image' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Select Avatar Image</h3>
                <Select 
                  value={selectedImage} 
                  onValueChange={setSelectedImage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an image" />
                  </SelectTrigger>
                  <SelectContent>
                    {avatarImages.map((image, index) => (
                      <SelectItem key={index} value={image}>
                        Avatar Image {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex space-x-4 mt-3">
                  {avatarImages.map((image, index) => (
                    <div 
                      key={index} 
                      className={`cursor-pointer ${selectedImage === image ? 'ring-2 ring-primary' : ''} rounded-full overflow-hidden`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <AvatarWithTooltip 
                        src={image} 
                        fallback={(index + 1).toString()} 
                        useColorBackground={false}
                        tooltipContent={`Avatar ${index + 1}`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <Button onClick={handleAddStudent} className="w-full mt-3">Add Student</Button>
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

            <AvatarWithTooltip 
              src="https://github.com/shadcn.png" 
              fallback="CN" 
              tooltipContent="User Profile with Image" 
              alt="User Avatar"
              name="Custom Name"
              useColorBackground={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RadixDemo;
