
export interface ModerationMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  needs_moderation: boolean;
  is_approved: boolean | null;
  sender_name: string;
  sender_avatar?: string;
  receiver_name: string;
  receiver_avatar?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  needs_moderation: boolean;
  is_approved: boolean | null;
  sender_name?: string;
  sender_avatar?: string;
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  last_message?: string;
  last_message_at: string;
  participant_id: string;
  participant_name: string;
  participant_avatar?: string;
  unread_count: number;
  has_pending_moderation: boolean;
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  last_read_at: string | null;
}

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
