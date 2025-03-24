
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Users, School, Briefcase, GraduationCap, ShieldCheck, Code2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AutomatedCodeGeneratorProps {
  onGenerateCodes: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<void>;
  isGenerating: boolean;
}

type UserTypeInfo = {
  value: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  emailDomainExample: string;
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

  const userTypes: Record<string, UserTypeInfo> = {
    student: {
      value: 'student',
      label: 'Students',
      icon: <GraduationCap className="h-5 w-5 text-indigo-500" />,
      description: 'Generate codes for student access to job search and training resources',
      emailDomainExample: 'students.westsidehigh.edu'
    },
    employer: {
      value: 'employer',
      label: 'Employers',
      icon: <Briefcase className="h-5 w-5 text-amber-500" />,
      description: 'Generate codes for employers to post jobs and access candidate profiles',
      emailDomainExample: 'company.com'
    },
    teacher: {
      value: 'teacher',
      label: 'Teachers',
      icon: <School className="h-5 w-5 text-emerald-500" />,
      description: 'Generate codes for teachers to access educational resources and monitor students',
      emailDomainExample: 'teachers.westsidehigh.edu'
    },
    admin: {
      value: 'admin',
      label: 'Administrators',
      icon: <ShieldCheck className="h-5 w-5 text-red-500" />,
      description: 'Generate codes for school administrators with full platform access',
      emailDomainExample: 'admin.westsidehigh.edu'
    },
    partner: {
      value: 'partner',
      label: 'Developers/Partners',
      icon: <Code2 className="h-5 w-5 text-blue-500" />,
      description: 'Generate codes for technical partners and platform developers',
      emailDomainExample: 'partner.westsidehigh.edu'
    }
  };

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
                onClick={handleSubmit} 
                disabled={isGenerating || !emailDomain}
              >
                {isGenerating ? 'Processing...' : 'Generate & Send'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AutomatedCodeGenerator;
