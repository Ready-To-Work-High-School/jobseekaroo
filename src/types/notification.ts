
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'job' | 'application' | 'system' | 'reminder';
  read: boolean;
  createdAt: string;
  link?: string;
  metadata: Record<string, any>;
}
