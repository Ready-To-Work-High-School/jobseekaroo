import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { CalendarIcon, Clock, Loader2, SendHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { ScheduleEmailParams } from '@/hooks/redemption/useScheduledEmails';

interface EmailSchedulerProps {
  onSchedule: (params: ScheduleEmailParams) => Promise<boolean>;
  isScheduling: boolean;
}

const EmailScheduler: React.FC<EmailSchedulerProps> = ({ onSchedule, isScheduling }) => {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('Your Redemption Codes');
  const [message, setMessage] = useState('Here are your requested access codes. Please distribute them accordingly.');
  const [codeType, setCodeType] = useState<'student' | 'employer'>('student');
  const [amount, setAmount] = useState<number>(10);
  const [expiresInDays, setExpiresInDays] = useState<number>(30);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
  const [scheduleTime, setScheduleTime] = useState('09:00');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipients) {
      toast({
        title: 'Error',
        description: 'Please enter at least one recipient email',
        variant: 'destructive',
      });
      return;
    }
    
    if (!scheduleDate) {
      toast({
        title: 'Error',
        description: 'Please select a schedule date',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const success = await onSchedule({
        recipients,
        subject,
        message,
        codeType,
        amount,
        expiresInDays,
        scheduleDate,
        scheduleTime,
      });
      
      if (success) {
        toast({
          title: 'Success',
          description: 'Email scheduled successfully',
        });
        
        // Reset form
        setRecipients('');
        setSubject('Your Redemption Codes');
        setMessage('Here are your requested access codes. Please distribute them accordingly.');
        setAmount(10);
      }
    } catch (error) {
      console.error('Error scheduling email:', error);
      toast({
        title: 'Error',
        description: 'Failed to schedule email',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Schedule Code Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <Input
                id="recipients"
                placeholder="email@example.com, another@example.com"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple email addresses with commas
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Email Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your email message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code-type">Code Type</Label>
                <Select value={codeType} onValueChange={(value: 'student' | 'employer') => setCodeType(value)}>
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
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  min={1}
                  max={100}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expires">Expiration (days)</Label>
                <Input
                  id="expires"
                  type="number"
                  min={1}
                  max={365}
                  value={expiresInDays}
                  onChange={(e) => setExpiresInDays(parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Schedule Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {scheduleDate ? format(scheduleDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={scheduleDate}
                      onSelect={setScheduleDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-time">Schedule Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="schedule-time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isScheduling}>
            {isScheduling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <SendHorizontal className="mr-2 h-4 w-4" />
                Schedule Email
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailScheduler;
