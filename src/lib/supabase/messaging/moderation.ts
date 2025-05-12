
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
    const { data: messagesData, error } = await supabase
      .from('messages_for_moderation_view')
      .select('*')
      .is('is_approved', null)
      .eq('needs_moderation', true)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching messages for moderation:', error);
      throw error;
    }
    
    // Add default is_read property
    const messagesWithIsRead = messagesData.map(msg => ({
      ...msg,
      is_read: false // Default value since we don't use it for moderation
    }));
    
    // Create a list of user IDs to fetch profiles for
    const userIds = new Set<string>();
    messagesWithIsRead.forEach(msg => {
      if (msg.sender_id) userIds.add(msg.sender_id);
      if (msg.receiver_id) userIds.add(msg.receiver_id);
    });
    
    // Fetch user profiles for these IDs
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, avatar_url')
      .in('id', Array.from(userIds));
    
    if (profilesError) {
      console.error('Error fetching user profiles:', profilesError);
    }
    
    // Create a map of user IDs to names and avatars
    const userProfiles = new Map<string, { name: string, avatar?: string }>();
    if (profilesData) {
      profilesData.forEach(profile => {
        const name = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Unknown User';
        userProfiles.set(profile.id, { 
          name, 
          avatar: profile.avatar_url || undefined
        });
      });
    }
    
    // Enhance the messages with profile information
    const enhancedMessages: ModerationMessage[] = messagesWithIsRead.map(msg => {
      const senderProfile = userProfiles.get(msg.sender_id);
      const receiverProfile = userProfiles.get(msg.receiver_id);
      
      return {
        ...msg,
        sender_name: senderProfile?.name || 'Unknown User',
        sender_avatar: senderProfile?.avatar,
        receiver_name: receiverProfile?.name || 'Unknown User',
        receiver_avatar: receiverProfile?.avatar
      };
    });
    
    // Update cache
    cache.data = enhancedMessages;
    cache.timestamp = now;
    
    return enhancedMessages;
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
