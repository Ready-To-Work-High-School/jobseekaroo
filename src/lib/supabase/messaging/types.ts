
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
