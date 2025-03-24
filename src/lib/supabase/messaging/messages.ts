
import { supabase } from '@/integrations/supabase/client';
import { Message, MessageCreatePayload } from './types';
import { updateConversationLastMessage } from './conversations';

/**
 * Fetch messages for a conversation
 */
export const fetchConversationMessages = async (conversationId: string): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
    
  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
  
  return data || [];
};

/**
 * Send a new message in a conversation
 */
export const sendMessage = async ({
  conversation_id,
  content,
  sender_id,
  receiver_id,
  needs_moderation = false
}: MessageCreatePayload): Promise<Message> => {
  const newMessage = {
    conversation_id,
    sender_id,
    receiver_id,
    content,
    needs_moderation,
    is_approved: needs_moderation ? null : true,
    is_read: false
  };
  
  const { data, error } = await supabase
    .from('messages')
    .insert(newMessage)
    .select('*')
    .single();
    
  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }
  
  // Update the conversation's last message
  await updateConversationLastMessage(conversation_id, content);
  
  return data;
};

/**
 * Mark messages as read for a user
 */
export const markMessagesAsRead = async (
  conversationId: string, 
  userId: string
): Promise<void> => {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('conversation_id', conversationId)
    .eq('receiver_id', userId)
    .eq('is_read', false);
    
  if (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
};

/**
 * Get unread message count for a user
 */
export const getUnreadMessageCount = async (userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('receiver_id', userId)
    .eq('is_read', false)
    .is('is_approved', true);
    
  if (error) {
    console.error('Error getting unread message count:', error);
    throw error;
  }
  
  return count || 0;
};
