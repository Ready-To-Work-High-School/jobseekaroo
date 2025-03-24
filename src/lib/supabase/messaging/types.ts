
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
