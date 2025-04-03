
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

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
        <Button onClick={onGenerateCode} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Single Code'}
        </Button>
        <Button onClick={() => setShowBulkDialog(true)} variant="outline" disabled={isGenerating}>
          Bulk Generate
        </Button>
      </div>

      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Generate Codes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Number of Codes</Label>
              <Input
                id="amount"
                type="number"
                value={bulkGenerateAmount}
                onChange={(e) => setBulkGenerateAmount(parseInt(e.target.value) || 5)}
                min={1}
                max={50}
              />
              <p className="text-sm text-muted-foreground">Generates up to 50 codes at once</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkDialog(false)}>Cancel</Button>
            <Button onClick={handleBulkGenerate} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Codes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RedemptionCodeGenerator;
