
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface BulkCodeGeneratorDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  bulkGenerateAmount: number;
  setBulkGenerateAmount: (amount: number) => void;
  onBulkGenerate: () => void;
  isGenerating: boolean;
}

const BulkCodeGeneratorDialog: React.FC<BulkCodeGeneratorDialogProps> = ({
  showDialog,
  setShowDialog,
  bulkGenerateAmount,
  setBulkGenerateAmount,
  onBulkGenerate,
  isGenerating
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
          <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button onClick={onBulkGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Codes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkCodeGeneratorDialog;
