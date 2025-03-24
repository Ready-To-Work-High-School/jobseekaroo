
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { RedemptionCode } from '@/types/redemption';
import { sendRedemptionCodeEmail } from '@/lib/supabase/redemption';
import { Loader2, Mail, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EmailRedemptionCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  code?: RedemptionCode;
  selectedCodes?: RedemptionCode[];
}

const EmailRedemptionCodeDialog: React.FC<EmailRedemptionCodeDialogProps> = ({
  isOpen,
  onClose,
  code,
  selectedCodes = [],
}) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(
    `Your ${code?.type || 'access'} redemption code for Westside High School Career Platform`
  );
  const [message, setMessage] = useState(
    `Here is your redemption code: ${code?.code || selectedCodes.map(c => c.code).join(', ')}\n\nPlease visit our platform and enter this code to unlock your account features.`
  );
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter a recipient email address',
        variant: 'destructive',
      });
      return;
    }

    setSendError(null);
    setIsSending(true);
    try {
      const codesToSend = code ? [code] : selectedCodes;
      
      const success = await sendRedemptionCodeEmail({
        to: email,
        subject,
        message,
        codes: codesToSend,
      });
      
      if (!success) {
        throw new Error('Failed to send email. Please check the logs for more details.');
      }
      
      toast({
        title: 'Email sent',
        description: `Redemption code${codesToSend.length > 1 ? 's' : ''} sent to ${email}`,
      });
      
      onClose();
    } catch (error: any) {
      console.error('Error sending redemption code email:', error);
      setSendError(error.message || 'Failed to send email. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to send email. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setSendError(null);
      // Update message when code changes
      if (code) {
        setSubject(`Your ${code.type} redemption code for Westside High School Career Platform`);
        setMessage(`Here is your redemption code: ${code.code}\n\nPlease visit our platform and enter this code to unlock your account features.`);
      } else if (selectedCodes.length > 0) {
        const type = selectedCodes[0].type;
        const codesText = selectedCodes.length > 1 
          ? `\n${selectedCodes.map((c, i) => `${i+1}. ${c.code}`).join('\n')}`
          : selectedCodes[0].code;
        
        setSubject(`Your ${type} redemption codes for Westside High School Career Platform`);
        setMessage(`Here ${selectedCodes.length > 1 ? 'are' : 'is'} your redemption code${selectedCodes.length > 1 ? 's' : ''}: ${codesText}\n\nPlease visit our platform and enter ${selectedCodes.length > 1 ? 'one of these codes' : 'this code'} to unlock your account features.`);
      }
    }
  }, [isOpen, code, selectedCodes]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Redemption Code</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {sendError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{sendError}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Recipient Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter recipient email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Note: Email delivery may take a few minutes. Check your spam folder if you don't see it in your inbox.</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSend} disabled={isSending}>
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailRedemptionCodeDialog;
