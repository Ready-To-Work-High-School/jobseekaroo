
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ReloadIcon, SendIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface CodeRequestSystemProps {
  onRequestSubmitted?: () => void;
}

const CodeRequestSystem: React.FC<CodeRequestSystemProps> = ({ 
  onRequestSubmitted 
}) => {
  const [requestType, setRequestType] = useState<'student' | 'employer'>('student');
  const [amount, setAmount] = useState<number>(10);
  const [justification, setJustification] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { userProfile } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!justification) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a justification for your request',
        variant: 'destructive',
      });
      return;
    }
    
    if (requestType === 'student' && !schoolName) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a school name for student code requests',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here we would actually submit the request to a backend endpoint
      // For now we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Request Submitted',
        description: `Your request for ${amount} ${requestType} codes has been submitted for approval.`,
      });
      
      // Reset form
      setJustification('');
      setSchoolName('');
      
      // Callback
      if (onRequestSubmitted) {
        onRequestSubmitted();
      }
    } catch (error) {
      console.error('Error submitting code request:', error);
      toast({
        title: 'Request Failed',
        description: 'There was an error submitting your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Request Redemption Codes</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code-type">Code Type</Label>
            <Select 
              value={requestType} 
              onValueChange={(value) => setRequestType(value as 'student' | 'employer')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select code type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="employer">Employer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Number of Codes</Label>
            <Input
              id="amount"
              type="number"
              min={1}
              max={100}
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
            />
          </div>
          
          {requestType === 'student' && (
            <div className="space-y-2">
              <Label htmlFor="school-name">School or Institution Name</Label>
              <Input
                id="school-name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g., Westside High School"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="justification">Justification</Label>
            <Textarea
              id="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explain why these codes are needed"
              rows={4}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Your request will be reviewed by a CEO or authorized administrator.</p>
            <p>Notifications will be sent to your account when the request is processed.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <SendIcon className="mr-2 h-4 w-4" />
                Submit Request
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CodeRequestSystem;
