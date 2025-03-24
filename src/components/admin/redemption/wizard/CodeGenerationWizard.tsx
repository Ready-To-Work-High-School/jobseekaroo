
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ChevronRight, Download, Send, Settings, Users } from 'lucide-react';

interface CodeGenerationWizardProps {
  onGenerate: (params: {
    codeType: 'student' | 'employer';
    amount: number;
    expiresInDays: number;
    emailDomain: string;
    sendEmail: boolean;
  }) => Promise<void>;
  isGenerating: boolean;
}

const CodeGenerationWizard: React.FC<CodeGenerationWizardProps> = ({ onGenerate, isGenerating }) => {
  const [step, setStep] = useState(1);
  const [codeType, setCodeType] = useState<'student' | 'employer'>('student');
  const [amount, setAmount] = useState(10);
  const [expiresInDays, setExpiresInDays] = useState(30);
  const [emailDomain, setEmailDomain] = useState('duvalschools.org');
  const [sendEmail, setSendEmail] = useState(true);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    await onGenerate({
      codeType,
      amount,
      expiresInDays,
      emailDomain,
      sendEmail
    });
    // Reset the wizard after generation
    setStep(1);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Code Generation Wizard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative">
            <div className="flex justify-between mb-2">
              <div className="text-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <Users className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1 block">Type</span>
              </div>
              <div className="grow mx-2 flex items-center">
                <div className={`h-1 w-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
              </div>
              <div className="text-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <Settings className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1 block">Settings</span>
              </div>
              <div className="grow mx-2 flex items-center">
                <div className={`h-1 w-full ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
              </div>
              <div className="text-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <Send className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1 block">Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Select Code Type</h3>
            <RadioGroup value={codeType} onValueChange={(value: 'student' | 'employer') => setCodeType(value)}>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3 rounded-md border p-4">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="flex-1">
                    <div className="font-medium">Student</div>
                    <div className="text-sm text-muted-foreground">
                      Generate redemption codes for students
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-md border p-4">
                  <RadioGroupItem value="employer" id="employer" />
                  <Label htmlFor="employer" className="flex-1">
                    <div className="font-medium">Employer</div>
                    <div className="text-sm text-muted-foreground">
                      Generate redemption codes for employers
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
            
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Configure Code Settings</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Number of Codes: {amount}</Label>
                <Slider
                  min={1}
                  max={100}
                  step={1}
                  value={[amount]}
                  onValueChange={(values) => setAmount(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Expiration Days: {expiresInDays}</Label>
                <Slider
                  min={1}
                  max={365}
                  step={1}
                  value={[expiresInDays]}
                  onValueChange={(values) => setExpiresInDays(values[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 day</span>
                  <span>6 months</span>
                  <span>1 year</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Delivery Options</h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="send-email"
                checked={sendEmail}
                onCheckedChange={setSendEmail}
              />
              <Label htmlFor="send-email">Send via Email</Label>
            </div>
            
            {sendEmail && (
              <div className="space-y-2">
                <Label htmlFor="email-domain">Email Domain</Label>
                <Input
                  id="email-domain"
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                  placeholder="example.com"
                />
                <p className="text-sm text-muted-foreground">
                  Codes will be sent to admin@{emailDomain}
                </p>
              </div>
            )}
            
            <Separator />
            
            <div className="rounded-md bg-secondary/20 p-4">
              <h4 className="font-medium mb-2">Summary</h4>
              <ul className="space-y-1 text-sm">
                <li><span className="font-medium">Type:</span> {codeType}</li>
                <li><span className="font-medium">Amount:</span> {amount}</li>
                <li><span className="font-medium">Expiration:</span> {expiresInDays} days</li>
                {sendEmail && <li><span className="font-medium">Email:</span> admin@{emailDomain}</li>}
              </ul>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Codes'}
                {!isGenerating && <Download className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeGenerationWizard;
