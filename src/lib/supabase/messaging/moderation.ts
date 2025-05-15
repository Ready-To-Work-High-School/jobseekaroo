
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
    const { data, error } = await supabase
      .from('messages_for_moderation_view')
      .select('*')
      .is('is_approved', null)
      .eq('needs_moderation', true)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching messages for moderation:', error);
      throw error;
    }
    
    // Add is_read property to make TypeScript happy
    const messagesWithIsRead = (data || []).map(msg => ({
      ...msg,
      is_read: false // Default value since we don't use it for moderation
    }));
    
    // Update cache
    cache.data = messagesWithIsRead;
    cache.timestamp = now;
    
    return messagesWithIsRead;
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
