
import { createNotification } from './createNotifications';
import { NotificationType } from '@/types/notification';
import { supabase } from '../index';
import { NotificationRole, DatabaseRole } from './types';

/**
 * Get user IDs by role
 * @param role The role to find users for
 * @returns Array of user IDs with the specified role
 */
async function getUsersByRole(role: NotificationRole): Promise<string[]> {
  // Map the notification roles to database roles
  let dbRole: DatabaseRole;
  
  if (role === 'admin') {
    dbRole = 'admin';
  } else if (role === 'ceo') {
    // Since 'ceo' might not be a valid DatabaseRole, we need to handle it appropriately
    // This depends on how 'ceo' users are stored in the database
    // For now, we'll assume they might be stored as 'admin' users with additional privileges
    dbRole = 'admin';
    
    // Alternative approach if they have their own table or other identification
    // return await getCeoUserIds();
  } else {
    // This should never happen due to TypeScript, but just in case
    console.error(`Invalid role: ${role}`);
    return [];
  }
  
  const { data, error } = await supabase
    .from('user_roles')
    .select('user_id')
    .eq('role', dbRole);
    
  if (error) {
    console.error(`Error fetching users by role (${role}):`, error);
    return [];
  }
  
  return data.map(item => item.user_id);
}

/**
 * Create a notification for admin users (admins and CEOs)
 * 
 * @param title Notification title
 * @param message Notification message
 * @param type Notification type
 * @param link Optional link to include
 * @param metadata Optional metadata
 * @returns Array of created notification IDs
 */
export async function createAdminNotification(
  title: string,
  message: string,
  type: NotificationType,
  link?: string,
  metadata?: Record<string, any>
): Promise<string[]> {
  try {
    // Get all admin and CEO user IDs
    const adminIds = await getUsersByRole('admin');
    
    // Note: If CEOs are actually stored with a different role in the database,
    // you might need a different approach. For now we're assuming they're
    // either stored as 'admin' users or need special handling.
    
    // If you need to fetch CEOs specifically, uncomment this:
    // const ceoIds = await getUsersByRole('ceo');
    // const uniqueUserIds = [...new Set([...adminIds, ...ceoIds])];
    
    const uniqueUserIds = adminIds;
    
    if (uniqueUserIds.length === 0) {
      console.log('No admin users found to notify');
      return [];
    }
    
    // Create notifications for each admin user
    const notificationPromises = uniqueUserIds.map(userId => 
      createNotification({
        user_id: userId,
        title,
        message,
        type,
        link,
        metadata
      })
    );
    
    // Wait for all notifications to be created
    const notificationIds = await Promise.all(notificationPromises);
    return notificationIds;
  } catch (error) {
    console.error('Error creating admin notifications:', error);
    return [];
  }
}
