
import React from 'react';
import { Button } from '@/components/ui/button';

interface CodeGenerationActionsProps {
  onGenerateCode: () => Promise<void>;
  setShowBulkDialog: (show: boolean) => void;
  isGenerating: boolean;
}

const CodeGenerationActions: React.FC<CodeGenerationActionsProps> = ({
  onGenerateCode,
  setShowBulkDialog,
  isGenerating
}) => {
  return (
    <>
      <Button onClick={onGenerateCode} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Single Code'}
      </Button>
      <Button onClick={() => setShowBulkDialog(true)} variant="outline" disabled={isGenerating}>
        Bulk Generate
      </Button>
    </>
  );
};

export default CodeGenerationActions;
