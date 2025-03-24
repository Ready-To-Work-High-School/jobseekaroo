
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface ScheduledEmail {
  id: string;
  recipients: string[];
  subject: string;
  message: string;
  codeType: 'student' | 'employer';
  amount: number;
  expiresInDays: number;
  scheduleDate: Date;
  status: 'pending' | 'sent' | 'failed';
  createdAt: Date;
}

interface ScheduleEmailParams {
  recipients: string;
  subject: string;
  message: string;
  codeType: 'student' | 'employer';
  amount: number;
  expiresInDays: number;
  scheduleDate: Date;
  scheduleTime: string;
}

export function useScheduledEmails() {
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledEmails, setScheduledEmails] = useState<ScheduledEmail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const scheduleEmail = async (params: ScheduleEmailParams) => {
    setIsScheduling(true);
    try {
      const scheduleDateTime = new Date(params.scheduleDate);
      const [hours, minutes] = params.scheduleTime.split(':').map(Number);
      scheduleDateTime.setHours(hours, minutes, 0, 0);
      
      // Prepare the email recipients as an array
      const recipientArray = params.recipients
        .split(',')
        .map(email => email.trim())
        .filter(email => email);
      
      // Store the scheduled email in the database
      const { data, error } = await supabase
        .from('scheduled_emails')
        .insert({
          recipients: recipientArray,
          subject: params.subject,
          message: params.message,
          code_type: params.codeType,
          amount: params.amount,
          expires_in_days: params.expiresInDays,
          schedule_date: scheduleDateTime.toISOString(),
          status: 'pending'
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Email Scheduled',
        description: `Email will be sent on ${scheduleDateTime.toLocaleString()}`,
      });
      
      // Since we don't have a real backend for this example, we'll simulate scheduling
      // by adding the email to our local state
      const newEmail: ScheduledEmail = {
        id: data.id,
        recipients: recipientArray,
        subject: params.subject,
        message: params.message,
        codeType: params.codeType,
        amount: params.amount,
        expiresInDays: params.expiresInDays,
        scheduleDate: scheduleDateTime,
        status: 'pending',
        createdAt: new Date()
      };
      
      setScheduledEmails(prev => [...prev, newEmail]);
      
      return newEmail;
    } catch (error) {
      console.error('Error scheduling email:', error);
      toast({
        title: 'Error',
        description: 'Failed to schedule email',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsScheduling(false);
    }
  };

  const fetchScheduledEmails = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('scheduled_emails')
        .select('*')
        .order('schedule_date', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Transform the data to match our interface
      const transformedEmails: ScheduledEmail[] = data.map(item => ({
        id: item.id,
        recipients: item.recipients,
        subject: item.subject,
        message: item.message,
        codeType: item.code_type,
        amount: item.amount,
        expiresInDays: item.expires_in_days,
        scheduleDate: new Date(item.schedule_date),
        status: item.status,
        createdAt: new Date(item.created_at)
      }));
      
      setScheduledEmails(transformedEmails);
    } catch (error) {
      console.error('Error fetching scheduled emails:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch scheduled emails',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelScheduledEmail = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scheduled_emails')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Email Cancelled',
        description: 'Scheduled email has been cancelled',
      });
      
      // Remove from local state
      setScheduledEmails(prev => prev.filter(email => email.id !== id));
    } catch (error) {
      console.error('Error cancelling scheduled email:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel scheduled email',
        variant: 'destructive',
      });
    }
  };

  return {
    scheduleEmail,
    fetchScheduledEmails,
    cancelScheduledEmail,
    scheduledEmails,
    isScheduling,
    isLoading
  };
}
