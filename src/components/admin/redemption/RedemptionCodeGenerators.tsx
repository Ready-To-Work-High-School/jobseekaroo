
import React from 'react';
import { Card } from '@/components/ui/card';
import RedemptionCodeGenerator from '../RedemptionCodeGenerator';
import AutomatedCodeGenerator from '../AutomatedCodeGenerator';
import CodeDistributionPanel from './CodeDistributionPanel';
import { School } from '@/types/school';

interface RedemptionCodeGeneratorsProps {
  school: School; // Added school prop
  onGenerateCode: (school: School) => Promise<void>;
  onBulkGenerate: (amount: number, school: School) => Promise<void>;
  onAutomatedGeneration: (
    userType: string, 
    amount: number, 
    expiresInDays: number, 
    emailDomain: string,
    school: School
  ) => Promise<void>;
  isGenerating: boolean;
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
}

const RedemptionCodeGenerators: React.FC<RedemptionCodeGeneratorsProps> = ({
  school,
  onGenerateCode,
  onBulkGenerate,
  onAutomatedGeneration,
  isGenerating,
  codeType,
  setCodeType,
  expireDays,
  setExpireDays
}) => {
  const handleGenerateCode = () => onGenerateCode(school);
  
  const handleBulkGenerate = (amount: number) => 
    onBulkGenerate(amount, school);
  
  const handleAutomatedGeneration = (
    userType: string, 
    amount: number, 
    expiresInDays: number, 
    emailDomain: string
  ) => onAutomatedGeneration(
    userType, 
    amount, 
    expiresInDays, 
    emailDomain, 
    school
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <RedemptionCodeGenerator
          onGenerateCode={handleGenerateCode}
          onBulkGenerate={handleBulkGenerate}
          isGenerating={isGenerating}
          codeType={codeType}
          setCodeType={setCodeType}
          expireDays={expireDays}
          setExpireDays={setExpireDays}
        />
        <AutomatedCodeGenerator
          onGenerateCodes={handleAutomatedGeneration}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
};

export default RedemptionCodeGenerators;
