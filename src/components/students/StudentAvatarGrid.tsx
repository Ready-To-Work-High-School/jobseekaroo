
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AvatarWithTooltip from '@/components/shared/AvatarWithTooltip';

type Student = {
  name: string;
  initials: string;
  role: string;
  useColorBackground: boolean;
  avatarImage?: string;
};

interface StudentAvatarGridProps {
  students: Student[];
}

const StudentAvatarGrid: React.FC<StudentAvatarGridProps> = ({ students }) => {
  return (
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
  );
};

export default StudentAvatarGrid;
