
import { useState, useEffect, useRef } from 'react';
import { MessageItem } from './MessageItem';
import { MessageInput } from './MessageInput';
import { Message } from '@/types/message';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ConversationViewProps {
  conversationId: string;
  participantName: string;
  participantAvatar?: string;
  participantId: string;
  requiresModeration: boolean;
}

export const ConversationView = ({ 
  conversationId,
  participantName,
  participantAvatar,
  participantId,
  requiresModeration
}: ConversationViewProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchMessages();
    subscribeToNewMessages();
    markConversationAsRead();
    
    // Cleanup subscription on unmount
    return () => {
      const channel = supabase.channel(`conversation:${conversationId}`);
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      
      // Get messages for this conversation
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToNewMessages = () => {
    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prevMessages => [...prevMessages, newMessage]);
          scrollToBottom();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          const updatedMessage = payload.new as Message;
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.id === updatedMessage.id ? updatedMessage : msg
            )
          );
        }
      )
      .subscribe();
  };

  const markConversationAsRead = async () => {
    if (!user) return;
    
    try {
      await supabase
        .from('conversation_participants')
        .update({ last_read_at: new Date().toISOString() })
        .eq('conversation_id', conversationId)
        .eq('user_id', user.id);
    } catch (error) {
      console.error('Error marking conversation as read:', error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!user) return;
    
    const newMessage = {
      conversation_id: conversationId,
      sender_id: user.id,
      receiver_id: participantId,
      content,
      needs_moderation: requiresModeration,
      is_approved: requiresModeration ? null : true,
    };
    
    const { error } = await supabase
      .from('messages')
      .insert(newMessage);
      
    if (error) throw error;
    
    // Update last message for conversation
    await supabase
      .from('conversations')
      .update({ 
        last_message: content,
        last_message_at: new Date().toISOString() 
      })
      .eq('id', conversationId);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-3 border-b">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={participantAvatar || ''} alt={participantName} />
            <AvatarFallback>
              {participantName?.charAt(0).toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">{participantName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                isCurrentUser={message.sender_id === user?.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>
      <div className="p-4 border-t">
        <MessageInput
          conversationId={conversationId}
          receiverId={participantId}
          onSendMessage={sendMessage}
          requiresModeration={requiresModeration}
        />
      </div>
    </Card>
  );
};
