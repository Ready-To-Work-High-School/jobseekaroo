
export type NotificationType = 'job' | 'application' | 'message' | 'email' | 'account' | 'achievement' | 'general';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
  read: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
}

export interface NotificationFilterOptions {
  type?: NotificationType | 'all';
  read?: boolean | 'all';
  dateRange?: {
    from: Date | null;
    to: Date | null;
  };
  sortBy: 'newest' | 'oldest';
}
