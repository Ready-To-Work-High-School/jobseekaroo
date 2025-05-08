
/**
 * Helper function to process metadata safely
 * This prevents excessive type instantiation depth errors
 */
export function processMetadata(metadata: any): Record<string, any> {
  if (!metadata) return {};
  if (typeof metadata !== 'object') return {};
  
  // Create a safe copy to avoid reference issues
  try {
    return { ...metadata };
  } catch (error) {
    console.error('Error processing notification metadata:', error);
    return {};
  }
}

/**
 * Transform database notification to frontend model
 */
export function transformNotification(data: any): {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: any;
  read: boolean;
  createdAt: string;
  link: string;
  metadata: Record<string, any>;
} {
  return {
    id: data.id,
    user_id: data.user_id,
    title: data.title,
    message: data.message,
    type: data.type,
    read: data.read,
    createdAt: data.created_at,
    link: data.link || '',
    metadata: processMetadata(data.metadata),
  };
}
