
import { NotificationResponse } from './types';
import { Notification } from '@/types/notification';

/**
 * Transform a notification response from the API to the frontend model
 */
export function transformNotification(notification: NotificationResponse): Notification {
  // Parse metadata if it exists
  let metadata = notification.metadata;
  
  // Return transformed notification
  return {
    id: notification.id,
    userId: notification.user_id,
    title: notification.title,
    message: notification.message,
    type: notification.type,
    read: notification.read,
    createdAt: notification.created_at, // Return as string instead of Date
    link: notification.link,
    metadata: metadata
  };
}

/**
 * Process metadata to ensure it's in the correct format for storage
 * This helps prevent excessive type instantiation depth errors
 */
export function processMetadata(metadata: Record<string, any> | null | undefined): string | null {
  if (!metadata) return null;
  
  // Create a simplified copy without deeply nested references
  const simplifiedMetadata = { ...metadata };
  
  // Convert to string
  try {
    return JSON.stringify(simplifiedMetadata);
  } catch (error) {
    console.error('Error processing metadata:', error);
    return null;
  }
}
