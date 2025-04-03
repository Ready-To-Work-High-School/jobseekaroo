
import React from 'react';
import RedemptionCodeGenerator from '../RedemptionCodeGenerator';
import AutomatedCodeGenerator from '../AutomatedCodeGenerator';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  );
};

export default RedemptionCodeGenerators;
