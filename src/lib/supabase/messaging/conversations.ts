
import { supabase } from '@/integrations/supabase/client';
import { Conversation } from './types';

/**
 * Fetch conversations for a user
 */
export const fetchUserConversations = async (userId: string): Promise<Conversation[]> => {
  const { data, error } = await supabase
    .from('conversations_with_participants_view')
    .select('*')
    .eq('user_id', userId)
    .order('last_message_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
  
  return data || [];
};

/**
 * Create a new conversation between users
 */
export const createConversation = async (userIds: string[]): Promise<string> => {
  // First create the conversation
  const { data: conversationData, error: conversationError } = await supabase
    .from('conversations')
    .insert({})
    .select('id')
    .single();
  
  if (conversationError) {
    console.error('Error creating conversation:', conversationError);
    throw conversationError;
  }
  
  const conversationId = conversationData.id;
  
  // Then add all participants
  const participants = userIds.map(userId => ({
    conversation_id: conversationId,
    user_id: userId
  }));
  
  const { error: participantsError } = await supabase
    .from('conversation_participants')
    .insert(participants);
  
  if (participantsError) {
    console.error('Error adding conversation participants:', participantsError);
    throw participantsError;
  }
  
  return conversationId;
};

/**
 * Mark a conversation as read for a user
 */
export const markConversationAsRead = async (conversationId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('conversation_participants')
    .update({ last_read_at: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .eq('user_id', userId);
    
  if (error) {
    console.error('Error marking conversation as read:', error);
    throw error;
  }
};

/**
 * Update the last message and timestamp for a conversation
 */
export const updateConversationLastMessage = async (
  conversationId: string, 
  message: string
): Promise<void> => {
  const { error } = await supabase
    .from('conversations')
    .update({ 
      last_message: message,
      last_message_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', conversationId);
    
  if (error) {
    console.error('Error updating conversation last message:', error);
    throw error;
  }
};
