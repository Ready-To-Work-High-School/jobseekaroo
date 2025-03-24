
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { userTypes, UserTypeInfo } from './UserTypeDefinitions';

interface AutomatedCodeGeneratorDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  userType: string;
  setUserType: (type: string) => void;
  amount: number;
  setAmount: (amount: number) => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
  emailDomain: string;
  setEmailDomain: (domain: string) => void;
  onSubmit: () => Promise<void>;
  isGenerating: boolean;
}

const AutomatedCodeGeneratorDialog: React.FC<AutomatedCodeGeneratorDialogProps> = ({
  showDialog,
  setShowDialog,
  userType,
  setUserType,
  amount,
  setAmount,
  expireDays,
  setExpireDays,
  emailDomain,
  setEmailDomain,
  onSubmit,
  isGenerating
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate & Distribute Codes</DialogTitle>
          <DialogDescription>
            Automatically generate and email codes to users based on category.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>User Category</Label>
            <Select 
              value={userType} 
              onValueChange={(value) => {
                setUserType(value);
                setEmailDomain(userTypes[value]?.emailDomainExample || '');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(userTypes).map((type) => (
                  <SelectItem key={type.value} value={type.value} className="flex items-center">
                    <div className="flex items-center">
                      {type.icon}
                      <span className="ml-2">{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {userType && (
              <p className="text-xs text-muted-foreground mt-1">
                {userTypes[userType]?.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Number of Codes</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 10)}
                min={1}
                max={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expire-days">Expires In (Days)</Label>
              <Input
                id="expire-days"
                type="number"
                value={expireDays}
                onChange={(e) => setExpireDays(parseInt(e.target.value) || 90)}
                min={1}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-domain">Email Domain</Label>
            <Input
              id="email-domain"
              type="text"
              value={emailDomain}
              onChange={(e) => setEmailDomain(e.target.value)}
              placeholder="example.com"
            />
            <p className="text-xs text-muted-foreground">
              Codes will be sent to users with this email domain. For example: @{emailDomain}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onSubmit} 
            disabled={isGenerating || !emailDomain}
          >
            {isGenerating ? 'Processing...' : 'Generate & Send'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AutomatedCodeGeneratorDialog;
