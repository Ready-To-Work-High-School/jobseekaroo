
import { supabase } from '../index';
import { NotificationData } from './types';

/**
 * Create a notification for a user
 * 
 * @param notification The notification data to create
 * @returns The created notification ID
 */
export async function createNotification(notification: NotificationData): Promise<string> {
  try {
    // Process the metadata to ensure it's in the correct format
    const processedNotification = {
      ...notification,
      metadata: notification.metadata ? JSON.stringify(notification.metadata) : null
    };
    
    const { data, error } = await supabase
      .from('notifications')
      .insert(processedNotification)
      .select('id')
      .single();
    
    if (error) throw error;
    return data.id;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
}

/**
 * Create multiple notifications at once
 * 
 * @param notifications Array of notification data to create
 * @returns Array of created notification IDs
 */
export async function createNotifications(notifications: NotificationData[]): Promise<string[]> {
  try {
    // Process the metadata for each notification
    const processedNotifications = notifications.map(notification => ({
      ...notification,
      metadata: notification.metadata ? JSON.stringify(notification.metadata) : null
    }));
    
    const { data, error } = await supabase
      .from('notifications')
      .insert(processedNotifications)
      .select('id');
    
    if (error) throw error;
    return data?.map(notification => notification.id) || [];
  } catch (error) {
    console.error('Error creating multiple notifications:', error);
    throw error;
  }
}
