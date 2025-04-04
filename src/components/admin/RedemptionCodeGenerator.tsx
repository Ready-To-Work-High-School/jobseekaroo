
import React, { useState } from 'react';
import CodeGenerationSettings from './redemption/CodeGenerationSettings';
import CodeGenerationActions from './redemption/CodeGenerationActions';
import BulkCodeGeneratorDialog from './redemption/BulkCodeGeneratorDialog';

interface RedemptionCodeGeneratorProps {
  onGenerateCode: () => Promise<void>;
  onBulkGenerate: (amount: number) => Promise<void>;
  isGenerating: boolean;
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
}

const RedemptionCodeGenerator: React.FC<RedemptionCodeGeneratorProps> = ({
  onGenerateCode,
  onBulkGenerate,
  isGenerating,
  codeType,
  setCodeType,
  expireDays,
  setExpireDays
}) => {
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [bulkGenerateAmount, setBulkGenerateAmount] = useState<number>(5);

  const handleBulkGenerate = async () => {
    setShowBulkDialog(false);
    await onBulkGenerate(bulkGenerateAmount);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-medium mb-3">Generate New Code</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <CodeGenerationSettings
          codeType={codeType}
          setCodeType={setCodeType}
          expireDays={expireDays}
          setExpireDays={setExpireDays}
        />
        <CodeGenerationActions
          onGenerateCode={onGenerateCode}
          setShowBulkDialog={setShowBulkDialog}
          isGenerating={isGenerating}
        />
      </div>

      <BulkCodeGeneratorDialog
        showDialog={showBulkDialog}
        setShowDialog={setShowBulkDialog}
        bulkGenerateAmount={bulkGenerateAmount}
        setBulkGenerateAmount={setBulkGenerateAmount}
        onBulkGenerate={handleBulkGenerate}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default RedemptionCodeGenerator;
