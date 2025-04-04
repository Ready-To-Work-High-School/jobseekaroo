
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CodeGenerationSettingsProps {
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
}

const CodeGenerationSettings: React.FC<CodeGenerationSettingsProps> = ({
  codeType,
  setCodeType,
  expireDays,
  setExpireDays
}) => {
  return (
    <>
      <div>
        <Select 
          value={codeType} 
          onValueChange={(value) => setCodeType(value as 'student' | 'employer')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Code Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="employer">Employer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Input
          type="number"
          value={expireDays.toString()}
          onChange={(e) => setExpireDays(parseInt(e.target.value) || 30)}
          placeholder="Expires in days"
          min={1}
        />
      </div>
    </>
  );
};

export default CodeGenerationSettings;
