
import { supabase } from '@/integrations/supabase/client';
import { ModerationMessage } from './types';

/**
 * Fetch messages that need moderation
 */
export const fetchMessagesForModeration = async (): Promise<ModerationMessage[]> => {
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
  
  return messagesWithIsRead;
};

/**
 * Approve a message (for admin moderation)
 */
export const approveMessage = async (messageId: string): Promise<void> => {
  const { error } = await supabase
    .from('messages')
    .update({ is_approved: true })
    .eq('id', messageId);
    
  if (error) {
    console.error('Error approving message:', error);
    throw error;
  }
};

/**
 * Reject a message (for admin moderation)
 */
export const rejectMessage = async (messageId: string): Promise<void> => {
  const { error } = await supabase
    .from('messages')
    .update({ is_approved: false })
    .eq('id', messageId);
    
  if (error) {
    console.error('Error rejecting message:', error);
    throw error;
  }
};
