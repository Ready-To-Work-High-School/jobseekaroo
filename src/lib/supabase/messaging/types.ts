
import { Message, Conversation } from '@/types/message';

// Add any additional messaging-specific types here
export type { Message, Conversation };

// Export any other messaging-specific types or interfaces
export interface MessageCreatePayload {
  conversation_id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  needs_moderation?: boolean;
}

export interface ConversationCreatePayload {
  participant_ids: string[];
}

// Add ModerationMessage type to extend the Message type with additional properties
export interface ModerationMessage extends Message {
  sender_name: string;
  sender_avatar?: string;
  receiver_name: string;
  receiver_avatar?: string;
}
