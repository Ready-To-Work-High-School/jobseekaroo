
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ModerationMessage {
  id: string;
  conversation_id: string;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  sender_name: string;
  sender_avatar?: string;
  receiver_name: string;
  receiver_avatar?: string;
  needs_moderation: boolean;
  is_approved: boolean | null;
}

export const useModerationMessages = () => {
  const [messages, setMessages] = useState<ModerationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const fetchMessagesForModeration = async () => {
    try {
      setIsLoading(true);
      
      // Get all messages that need moderation
      const { data, error } = await supabase
        .from('messages_for_moderation_view')
        .select('*')
        .is('is_approved', null)
        .eq('needs_moderation', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Add is_read property to make TypeScript happy
      const messagesWithIsRead = (data || []).map(msg => ({
        ...msg,
        is_read: false // Default value since we don't use it for moderation
      }));
      
      setMessages(messagesWithIsRead);
    } catch (error) {
      console.error('Error fetching messages for moderation:', error);
      toast({
        title: "Failed to load messages",
        description: "There was an error loading messages for moderation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToNewMessages = () => {
    const channel = supabase
      .channel('moderation-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `needs_moderation=eq.true`
        },
        () => {
          fetchMessagesForModeration();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `needs_moderation=eq.true`
        },
        () => {
          fetchMessagesForModeration();
        }
      )
      .subscribe();
      
    return channel;
  };

  const approveMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_approved: true })
        .eq('id', messageId);
      
      if (error) throw error;
      
      toast({
        title: "Message approved",
        description: "The message has been approved and is now visible to the recipient",
      });
      
      // Remove the approved message from the list
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error approving message:', error);
      toast({
        title: "Failed to approve message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const rejectMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_approved: false })
        .eq('id', messageId);
      
      if (error) throw error;
      
      toast({
        title: "Message rejected",
        description: "The message has been rejected and will not be visible to the recipient",
      });
      
      // Remove the rejected message from the list
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error rejecting message:', error);
      toast({
        title: "Failed to reject message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchMessagesForModeration();
    const channel = subscribeToNewMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    messages,
    isLoading,
    approveMessage,
    rejectMessage,
    refreshMessages: fetchMessagesForModeration
  };
};
