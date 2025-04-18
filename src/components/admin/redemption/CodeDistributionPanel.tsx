
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface CodeDistributionPanelProps {
  onAutomatedGeneration: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<void>;
  isGenerating: boolean;
}

const CodeDistributionPanel: React.FC<CodeDistributionPanelProps> = ({
  onAutomatedGeneration,
  isGenerating
}) => {
  const [selectedGroup, setSelectedGroup] = useState('student');
  const [amount, setAmount] = useState<number>(10);
  const [emailDomain, setEmailDomain] = useState('');
  
  const handleDistribute = async () => {
    if (!emailDomain) {
      toast({
        title: "Email Domain Required",
        description: "Please enter the email domain for code distribution",
        variant: "destructive"
      });
      return;
    }

    try {
      await onAutomatedGeneration(selectedGroup, amount, 30, emailDomain);
      toast({
        title: "Codes Generated Successfully",
        description: `${amount} codes have been generated and sent to the specified domain.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate and distribute codes",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Distribution</CardTitle>
        <CardDescription>
          Generate and distribute redemption codes to different user groups
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="group">Select Group</Label>
          <Select
            value={selectedGroup}
            onValueChange={setSelectedGroup}
          >
            <SelectTrigger id="group">
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>User Groups</SelectLabel>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="teacher">Teachers</SelectItem>
                <SelectItem value="counselor">Counselors</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Number of Codes</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            min={1}
            max={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="domain">Email Domain</Label>
          <Input
            id="domain"
            type="text"
            placeholder="e.g., school.edu"
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Codes will be sent to administrators at this domain
          </p>
        </div>

        <Button 
          onClick={handleDistribute}
          disabled={isGenerating || !emailDomain}
          className="w-full"
        >
          {isGenerating ? "Generating..." : "Generate & Distribute Codes"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CodeDistributionPanel;
