
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';

type AvatarType = 'color' | 'readyplayer';

interface StudentFormProps {
  onAddStudent: (name: string, avatarType: AvatarType, avatarUrl: string | null) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onAddStudent }) => {
  const [studentName, setStudentName] = useState('');
  const [avatarType, setAvatarType] = useState<AvatarType>('color');
  const [createdAvatarUrl, setCreatedAvatarUrl] = useState<string | null>(null);
  const [showAvatarCreator, setShowAvatarCreator] = useState(false);

  const handleSubmit = () => {
    if (studentName.trim() === '') return;
    onAddStudent(studentName, avatarType, createdAvatarUrl);
    setStudentName('');
    setCreatedAvatarUrl(null);
  };

  const handleAvatarComplete = (event: any) => {
    // Handle the correct event structure from AvatarCreator
    const avatarUrl = event?.url || event;
    setCreatedAvatarUrl(avatarUrl);
    setShowAvatarCreator(false);
  };

  return (
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
              onValueChange={(value) => setAvatarType(value as AvatarType)}
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
            onClick={handleSubmit} 
            className="w-full mt-3"
            disabled={studentName.trim() === '' || (avatarType === 'readyplayer' && !createdAvatarUrl)}
          >
            Add Student
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
