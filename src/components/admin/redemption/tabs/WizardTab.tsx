
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WizardTabProps {
  isGenerating: boolean;
  onGenerate: (params: any) => Promise<void>;
}

const WizardTab: React.FC<WizardTabProps> = ({
  isGenerating,
  onGenerate
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Code Generation Wizard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Generate codes with a guided wizard.</p>
          {isGenerating && <p>Generation in progress...</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default WizardTab;
