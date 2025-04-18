
import React from 'react';
import { Card } from '@/components/ui/card';
import RedemptionCodeGenerator from '../RedemptionCodeGenerator';
import AutomatedCodeGenerator from '../AutomatedCodeGenerator';
import CodeDistributionPanel from './CodeDistributionPanel';

interface RedemptionCodeGeneratorsProps {
  onGenerateCode: () => Promise<void>;
  onBulkGenerate: (amount: number) => Promise<void>;
  onAutomatedGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<void>;
  isGenerating: boolean;
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
}

const RedemptionCodeGenerators: React.FC<RedemptionCodeGeneratorsProps> = ({
  onGenerateCode,
  onBulkGenerate,
  onAutomatedGeneration,
  isGenerating,
  codeType,
  setCodeType,
  expireDays,
  setExpireDays
}) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <RedemptionCodeGenerator
          onGenerateCode={onGenerateCode}
          onBulkGenerate={onBulkGenerate}
          isGenerating={isGenerating}
          codeType={codeType}
          setCodeType={setCodeType}
          expireDays={expireDays}
          setExpireDays={setExpireDays}
        />
        <AutomatedCodeGenerator
          onGenerateCodes={onAutomatedGeneration}
          isGenerating={isGenerating}
        />
      </div>
      
      <CodeDistributionPanel
        onAutomatedGeneration={onAutomatedGeneration}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default RedemptionCodeGenerators;
