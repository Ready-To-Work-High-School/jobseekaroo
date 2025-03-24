
import { supabase } from './index';
import { Conversation, Message } from '@/types/message';

/**
 * Create a new conversation between two users
 */
export async function createConversation(
  userId: string,
  otherUserId: string
): Promise<string> {
  try {
    // First check if a conversation already exists between these users
    const { data: existingConversations, error: checkError } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', userId);
    
    if (checkError) throw checkError;
    
    if (existingConversations && existingConversations.length > 0) {
      const conversationIds = existingConversations.map(c => c.conversation_id);
      
      const { data: otherParticipants, error: participantsError } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', otherUserId)
        .in('conversation_id', conversationIds);
      
      if (participantsError) throw participantsError;
      
      // If there's an existing conversation between these users, return it
      if (otherParticipants && otherParticipants.length > 0) {
        return otherParticipants[0].conversation_id;
      }
    }
    
    // No existing conversation, create a new one
    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({})
      .select()
      .single();
    
    if (error) throw error;
    
    // Add both users as participants
    const { error: participantsError } = await supabase
      .from('conversation_participants')
      .insert([
        { conversation_id: conversation.id, user_id: userId },
        { conversation_id: conversation.id, user_id: otherUserId }
      ]);
    
    if (participantsError) throw participantsError;
    
    return conversation.id;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
}

/**
 * Get all conversations for a user with unread counts
 */
export async function getUserConversations(userId: string): Promise<Conversation[]> {
  try {
    const { data, error } = await supabase
      .from('conversations_with_participants_view')
      .select('*')
      .eq('user_id', userId)
      .order('last_message_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error getting user conversations:', error);
    return [];
  }
}

/**
 * Send a message in a conversation
 */
export async function sendMessage(
  conversationId: string,
  senderId: string,
  receiverId: string,
  content: string,
  needsModeration: boolean = false
): Promise<Message | null> {
  try {
    const newMessage = {
      conversation_id: conversationId,
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      needs_moderation: needsModeration,
      is_approved: needsModeration ? null : true,
    };
    
    const { data, error } = await supabase
      .from('messages')
      .insert(newMessage)
      .select()
      .single();
    
    if (error) throw error;
    
    // Update last message in conversation
    await supabase
      .from('conversations')
      .update({
        last_message: content,
        last_message_at: new Date().toISOString()
      })
      .eq('id', conversationId);
    
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
}

/**
 * Get all messages for a conversation
 */
export async function getConversationMessages(conversationId: string): Promise<Message[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .or(`is_approved.is.true,is_approved.is.null`)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error getting conversation messages:', error);
    return [];
  }
}

/**
 * Mark a conversation as read for a user
 */
export async function markConversationAsRead(
  conversationId: string,
  userId: string
): Promise<void> {
  try {
    await supabase
      .from('conversation_participants')
      .update({ last_read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('user_id', userId);
  } catch (error) {
    console.error('Error marking conversation as read:', error);
  }
}

/**
 * Get the count of unread messages for a user
 */
export async function getUnreadMessageCount(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('conversations_with_participants_view')
      .select('unread_count')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    if (!data || data.length === 0) return 0;
    
    return data.reduce((total, conv) => total + (conv.unread_count || 0), 0);
  } catch (error) {
    console.error('Error getting unread message count:', error);
    return 0;
  }
}

/**
 * Get messages that need moderation (admin only)
 */
export async function getMessagesForModeration(): Promise<Message[]> {
  try {
    const { data, error } = await supabase
      .from('messages_for_moderation_view')
      .select('*')
      .is('is_approved', null)
      .eq('needs_moderation', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error getting messages for moderation:', error);
    return [];
  }
}

/**
 * Approve a message (admin only)
 */
export async function approveMessage(messageId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ is_approved: true })
      .eq('id', messageId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error approving message:', error);
    throw error;
  }
}

/**
 * Reject a message (admin only)
 */
export async function rejectMessage(messageId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ is_approved: false })
      .eq('id', messageId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error rejecting message:', error);
    throw error;
  }
}
