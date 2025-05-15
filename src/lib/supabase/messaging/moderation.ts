
import { supabase } from '@/integrations/supabase/client';
import { ModerationMessage } from './types';

// Simple cache implementation for moderation messages
type Cache = {
  data: ModerationMessage[] | null;
  timestamp: number;
  expiryMs: number;
};

const cache: Cache = {
  data: null,
  timestamp: 0,
  expiryMs: 30000 // 30 seconds cache expiry
};

/**
 * Fetch messages that need moderation
 * Implements caching to reduce database load
 */
export const fetchMessagesForModeration = async (): Promise<ModerationMessage[]> => {
  // Check if we have valid cached data
  const now = Date.now();
  if (cache.data && (now - cache.timestamp < cache.expiryMs)) {
    console.log('Using cached moderation messages');
    return cache.data;
  }
  
  try {
    // First, fetch the messages that need moderation
    const { data: messages, error: messagesError } = await supabase
      .from('messages_for_moderation_view')
      .select('*')
      .is('is_approved', null)
      .eq('needs_moderation', true)
      .order('created_at', { ascending: false });
      
    if (messagesError) {
      console.error('Error fetching messages for moderation:', messagesError);
      throw messagesError;
    }

    // Then fetch user profiles for all senders and receivers
    const userIds = messages ? Array.from(
      new Set([...messages.map(m => m.sender_id), ...messages.map(m => m.receiver_id)])
    ).filter(Boolean) : [];

    // If we have no messages or user IDs, return empty array
    if (!messages || messages.length === 0 || userIds.length === 0) {
      return [];
    }
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url')
      .in('id', userIds);
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      throw profilesError;
    }

    // Create a map of profiles for easy lookup
    const profileMap = (profiles || []).reduce((map, profile) => {
      map[profile.id] = profile;
      return map;
    }, {} as Record<string, any>);
    
    // Transform the data to match ModerationMessage type
    const messagesWithNames: ModerationMessage[] = (messages || []).map(msg => {
      const sender = profileMap[msg.sender_id] || {};
      const receiver = profileMap[msg.receiver_id] || {};
      
      return {
        id: msg.id,
        conversation_id: msg.conversation_id,
        sender_id: msg.sender_id,
        receiver_id: msg.receiver_id,
        content: msg.content,
        created_at: msg.created_at,
        is_read: msg.is_read || false,
        needs_moderation: msg.needs_moderation,
        is_approved: msg.is_approved,
        sender_name: `${sender.first_name || ''} ${sender.last_name || ''}`.trim() || 'Unknown User',
        sender_avatar: sender.avatar_url,
        receiver_name: `${receiver.first_name || ''} ${receiver.last_name || ''}`.trim() || 'Unknown User',
        receiver_avatar: receiver.avatar_url
      };
    });
    
    // Update cache
    cache.data = messagesWithNames;
    cache.timestamp = now;
    
    return messagesWithNames;
  } catch (error) {
    console.error('Error in fetchMessagesForModeration:', error);
    // If we have stale cache data, return it as fallback
    if (cache.data) {
      console.log('Using stale cache as fallback after error');
      return cache.data;
    }
    throw error;
  }
};

/**
 * Invalidate the messages cache
 */
export const invalidateModerationsCache = (): void => {
  cache.data = null;
  cache.timestamp = 0;
};

/**
 * Approve a message (for admin moderation)
 */
export const approveMessage = async (messageId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ is_approved: true })
      .eq('id', messageId);
      
    if (error) {
      console.error('Error approving message:', error);
      throw error;
    }
    
    // Invalidate cache after modification
    invalidateModerationsCache();
  } catch (error) {
    console.error('Error in approveMessage:', error);
    throw error;
  }
};

/**
 * Reject a message (for admin moderation)
 */
export const rejectMessage = async (messageId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ is_approved: false })
      .eq('id', messageId);
      
    if (error) {
      console.error('Error rejecting message:', error);
      throw error;
    }
    
    // Invalidate cache after modification
    invalidateModerationsCache();
  } catch (error) {
    console.error('Error in rejectMessage:', error);
    throw error;
  }
};
