
import { useState, useEffect, useCallback, useReducer } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  fetchMessagesForModeration, 
  approveMessage as approveMessageApi, 
  rejectMessage as rejectMessageApi 
} from '@/lib/supabase/messaging';
import { ModerationMessage } from '@/lib/supabase/messaging/types';

type ModerationState = {
  messages: ModerationMessage[];
  isLoading: boolean;
  error: Error | null;
  lastUpdated: number;
};

type ModerationAction = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: ModerationMessage[] }
  | { type: 'FETCH_ERROR'; payload: Error }
  | { type: 'REMOVE_MESSAGE'; payload: string }
  | { type: 'RESET_ERROR' };

function moderationReducer(state: ModerationState, action: ModerationAction): ModerationState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return { 
        messages: action.payload, 
        isLoading: false, 
        error: null,
        lastUpdated: Date.now() 
      };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'REMOVE_MESSAGE':
      return { 
        ...state, 
        messages: state.messages.filter(msg => msg.id !== action.payload),
        lastUpdated: Date.now() 
      };
    case 'RESET_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export const useModerationMessages = () => {
  const initialState: ModerationState = {
    messages: [],
    isLoading: true,
    error: null,
    lastUpdated: 0
  };
  
  const [state, dispatch] = useReducer(moderationReducer, initialState);
  const { toast } = useToast();
  
  const fetchMessages = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const moderationMessages = await fetchMessagesForModeration();
      dispatch({ type: 'FETCH_SUCCESS', payload: moderationMessages });
    } catch (error) {
      console.error('Error fetching messages for moderation:', error);
      dispatch({ type: 'FETCH_ERROR', payload: error as Error });
      toast({
        title: "Failed to load messages",
        description: "There was an error loading messages for moderation",
        variant: "destructive",
      });
    }
  }, [toast]);

  const approveMessage = useCallback(async (messageId: string) => {
    try {
      await approveMessageApi(messageId);
      
      toast({
        title: "Message approved",
        description: "The message has been approved and is now visible to the recipient",
      });
      
      // Remove the approved message from the list
      dispatch({ type: 'REMOVE_MESSAGE', payload: messageId });
    } catch (error) {
      console.error('Error approving message:', error);
      toast({
        title: "Failed to approve message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  }, [toast]);

  const rejectMessage = useCallback(async (messageId: string) => {
    try {
      await rejectMessageApi(messageId);
      
      toast({
        title: "Message rejected",
        description: "The message has been rejected and will not be visible to the recipient",
      });
      
      // Remove the rejected message from the list
      dispatch({ type: 'REMOVE_MESSAGE', payload: messageId });
    } catch (error) {
      console.error('Error rejecting message:', error);
      toast({
        title: "Failed to reject message",
        description: "Please try again",
        variant: "destructive",
      });
    }
  }, [toast]);

  const subscribeToNewMessages = useCallback(() => {
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
          fetchMessages();
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
          fetchMessages();
        }
      )
      .subscribe();
      
    return channel;
  }, [fetchMessages]);

  useEffect(() => {
    fetchMessages();
    const channel = subscribeToNewMessages();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMessages, subscribeToNewMessages]);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    approveMessage,
    rejectMessage,
    refreshMessages: fetchMessages
  };
};
