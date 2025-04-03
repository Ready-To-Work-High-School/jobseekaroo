
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AutomatedCodeGeneratorDialog from './redemption/AutomatedCodeGeneratorDialog';

interface AutomatedCodeGeneratorProps {
  onGenerateCodes: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<void>;
  isGenerating: boolean;
}

const AutomatedCodeGenerator: React.FC<AutomatedCodeGeneratorProps> = ({
  onGenerateCodes,
  isGenerating
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [userType, setUserType] = useState<string>('student');
  const [amount, setAmount] = useState<number>(10);
  const [expireDays, setExpireDays] = useState<number>(90);
  const [emailDomain, setEmailDomain] = useState<string>('');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!emailDomain) {
      toast({
        title: 'Email Domain Required',
        description: 'Please enter an email domain to send the generated codes to.',
        variant: 'destructive',
      });
      return;
    }

    await onGenerateCodes(userType, amount, expireDays, emailDomain);
    setShowDialog(false);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Automated Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Generate and distribute redemption codes automatically to different user categories.
        </p>

        <Button 
          variant="default" 
          className="w-full" 
          onClick={() => setShowDialog(true)}
          disabled={isGenerating}
        >
          <Users className="mr-2 h-4 w-4" />
          Generate Codes by User Type
        </Button>

        <AutomatedCodeGeneratorDialog
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          userType={userType}
          setUserType={setUserType}
          amount={amount}
          setAmount={setAmount}
          expireDays={expireDays}
          setExpireDays={setExpireDays}
          emailDomain={emailDomain}
          setEmailDomain={setEmailDomain}
          onSubmit={handleSubmit}
          isGenerating={isGenerating}
        />
      </CardContent>
    </Card>
  );
};

export default AutomatedCodeGenerator;
