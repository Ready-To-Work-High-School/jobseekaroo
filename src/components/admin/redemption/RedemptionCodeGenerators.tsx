
import React, { useState } from 'react';
import RedemptionCodeGenerator from '../RedemptionCodeGenerator';
import AutomatedCodeGenerator from '../AutomatedCodeGenerator';
import AdminCodeGenerator from './AdminCodeGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeTab, setActiveTab] = useState('single');

  return (
    <div className="space-y-4 mb-6">
      <Tabs defaultValue="single" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="single">Single Code</TabsTrigger>
          <TabsTrigger value="automatic">Automated Distribution</TabsTrigger>
          <TabsTrigger value="admin">Admin Codes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single">
          <RedemptionCodeGenerator
            onGenerateCode={onGenerateCode}
            onBulkGenerate={onBulkGenerate}
            isGenerating={isGenerating}
            codeType={codeType}
            setCodeType={setCodeType}
            expireDays={expireDays}
            setExpireDays={setExpireDays}
          />
        </TabsContent>
        
        <TabsContent value="automatic">
          <AutomatedCodeGenerator
            onGenerateCodes={onAutomatedGeneration}
            isGenerating={isGenerating}
          />
        </TabsContent>
        
        <TabsContent value="admin">
          <AdminCodeGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RedemptionCodeGenerators;
