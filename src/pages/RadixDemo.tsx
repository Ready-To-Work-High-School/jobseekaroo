
import React, { useState } from 'react';
import AvatarWithTooltip from '@/components/shared/AvatarWithTooltip';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dicebear avatar styles with their API endpoints
const dicebearStyles = [
  { name: "Adventurer", endpoint: "https://api.dicebear.com/7.x/adventurer/svg" },
  { name: "Adventurer Neutral", endpoint: "https://api.dicebear.com/7.x/adventurer-neutral/svg" },
  { name: "Avataaars", endpoint: "https://api.dicebear.com/7.x/avataaars/svg" },
  { name: "Big Ears", endpoint: "https://api.dicebear.com/7.x/big-ears/svg" },
  { name: "Big Ears Neutral", endpoint: "https://api.dicebear.com/7.x/big-ears-neutral/svg" },
  { name: "Big Smile", endpoint: "https://api.dicebear.com/7.x/big-smile/svg" },
  { name: "Bottts", endpoint: "https://api.dicebear.com/7.x/bottts/svg" },
  { name: "Croodles", endpoint: "https://api.dicebear.com/7.x/croodles/svg" },
  { name: "Croodles Neutral", endpoint: "https://api.dicebear.com/7.x/croodles-neutral/svg" },
  { name: "Fun Emoji", endpoint: "https://api.dicebear.com/7.x/fun-emoji/svg" },
  { name: "Icons", endpoint: "https://api.dicebear.com/7.x/icons/svg" },
  { name: "Identicon", endpoint: "https://api.dicebear.com/7.x/identicon/svg" },
  { name: "Initials", endpoint: "https://api.dicebear.com/7.x/initials/svg" },
  { name: "Lorelei", endpoint: "https://api.dicebear.com/7.x/lorelei/svg" },
  { name: "Micah", endpoint: "https://api.dicebear.com/7.x/micah/svg" },
  { name: "Miniavs", endpoint: "https://api.dicebear.com/7.x/miniavs/svg" },
  { name: "Notionists", endpoint: "https://api.dicebear.com/7.x/notionists/svg" },
  { name: "Open Peeps", endpoint: "https://api.dicebear.com/7.x/open-peeps/svg" },
  { name: "Personas", endpoint: "https://api.dicebear.com/7.x/personas/svg" },
  { name: "Pixel Art", endpoint: "https://api.dicebear.com/7.x/pixel-art/svg" },
  { name: "Pixel Art Neutral", endpoint: "https://api.dicebear.com/7.x/pixel-art-neutral/svg" },
  { name: "Rings", endpoint: "https://api.dicebear.com/7.x/rings/svg" },
  { name: "Shapes", endpoint: "https://api.dicebear.com/7.x/shapes/svg" },
  { name: "Thumbs", endpoint: "https://api.dicebear.com/7.x/thumbs/svg" }
];

type Student = {
  name: string;
  initials: string;
  role: string;
  useColorBackground: boolean;
  avatarImage?: string;
  dicebearStyle?: string;
  seed?: string;
};

const RadixDemo = () => {
  const [studentName, setStudentName] = useState('');
  const [avatarType, setAvatarType] = useState<'color' | 'image' | 'dicebear'>('color');
  const [selectedImage, setSelectedImage] = useState("https://github.com/shadcn.png");
  const [selectedDicebearStyle, setSelectedDicebearStyle] = useState(dicebearStyles[0].endpoint);
  const [students, setStudents] = useState<Student[]>([
    { name: 'John Smith', initials: 'JS', role: 'Software Developer', useColorBackground: true },
    { name: 'Alice Johnson', initials: 'AJ', role: 'Math Teacher', useColorBackground: true },
    { name: 'Robert Davis', initials: 'RD', role: 'Science Student', useColorBackground: true },
    { name: 'Emma Wilson', initials: 'EW', role: 'Art Student', useColorBackground: true }
  ]);

  // Generate a random seed for Dicebear avatar
  const generateRandomSeed = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const handleAddStudent = () => {
    if (studentName.trim() === '') return;
    
    // Generate initials from the name
    const initials = studentName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    const seed = generateRandomSeed();

    // Add new student to the list
    setStudents([...students, { 
      name: studentName, 
      initials, 
      role: 'New Student',
      useColorBackground: avatarType === 'color',
      avatarImage: avatarType === 'image' ? selectedImage : 
                  avatarType === 'dicebear' ? `${selectedDicebearStyle}?seed=${seed}` : undefined,
      dicebearStyle: avatarType === 'dicebear' ? selectedDicebearStyle : undefined,
      seed: avatarType === 'dicebear' ? seed : undefined
    }]);
    
    // Clear the input
    setStudentName('');
  };

  const getPreviewAvatarUrl = () => {
    if (avatarType === 'image') return selectedImage;
    if (avatarType === 'dicebear') {
      const seed = generateRandomSeed();
      return `${selectedDicebearStyle}?seed=${seed}`;
    }
    return undefined;
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
                onValueChange={(value) => setAvatarType(value as 'color' | 'image' | 'dicebear')}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="color" id="color" />
                  <Label htmlFor="color">Color Background</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <Label htmlFor="image">Static Image</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dicebear" id="dicebear" />
                  <Label htmlFor="dicebear">Dicebear Avatar</Label>
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
                    <SelectItem value="https://github.com/shadcn.png">GitHub Avatar</SelectItem>
                    <SelectItem value="https://xsgames.co/randomusers/avatar.php?g=male">Random Male</SelectItem>
                    <SelectItem value="https://xsgames.co/randomusers/avatar.php?g=female">Random Female</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex flex-wrap gap-4 mt-3">
                  <div 
                    className={`cursor-pointer ${selectedImage === "https://github.com/shadcn.png" ? 'ring-2 ring-primary' : ''} rounded-full overflow-hidden`}
                    onClick={() => setSelectedImage("https://github.com/shadcn.png")}
                  >
                    <AvatarWithTooltip 
                      src="https://github.com/shadcn.png" 
                      fallback="GH" 
                      useColorBackground={false}
                      tooltipContent="GitHub Avatar" 
                    />
                  </div>
                  <div 
                    className={`cursor-pointer ${selectedImage === "https://xsgames.co/randomusers/avatar.php?g=male" ? 'ring-2 ring-primary' : ''} rounded-full overflow-hidden`}
                    onClick={() => setSelectedImage("https://xsgames.co/randomusers/avatar.php?g=male")}
                  >
                    <AvatarWithTooltip 
                      src="https://xsgames.co/randomusers/avatar.php?g=male" 
                      fallback="M" 
                      useColorBackground={false}
                      tooltipContent="Random Male" 
                    />
                  </div>
                  <div 
                    className={`cursor-pointer ${selectedImage === "https://xsgames.co/randomusers/avatar.php?g=female" ? 'ring-2 ring-primary' : ''} rounded-full overflow-hidden`}
                    onClick={() => setSelectedImage("https://xsgames.co/randomusers/avatar.php?g=female")}
                  >
                    <AvatarWithTooltip 
                      src="https://xsgames.co/randomusers/avatar.php?g=female" 
                      fallback="F" 
                      useColorBackground={false}
                      tooltipContent="Random Female" 
                    />
                  </div>
                </div>
              </div>
            )}

            {avatarType === 'dicebear' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Select Dicebear Avatar Style</h3>
                <Select 
                  value={selectedDicebearStyle} 
                  onValueChange={setSelectedDicebearStyle}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {dicebearStyles.map((style, index) => (
                      <SelectItem key={index} value={style.endpoint}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Preview</h3>
                  <div className="flex justify-center mb-2">
                    <AvatarWithTooltip 
                      src={getPreviewAvatarUrl()}
                      fallback={studentName ? studentName.substring(0, 2).toUpperCase() : "??"} 
                      useColorBackground={false}
                      tooltipContent="Avatar Preview"
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Each student will get a unique randomized avatar of this style
                  </p>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RadixDemo;
