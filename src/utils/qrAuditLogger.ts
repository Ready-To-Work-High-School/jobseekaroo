/**
 * QR Code audit logging utilities for security tracking
 */

interface QRCodeAuditEvent {
  action: 'generate' | 'manual_refresh' | 'auto_refresh' | 'download' | 'share';
  user_id: string;
  metadata: Record<string, any>;
}

/**
 * Log QR code related events for audit purposes
 * @param action The action being performed
 * @param userId The user performing the action
 * @param metadata Additional context data
 */
export const logQRCodeEvent = async (
  action: QRCodeAuditEvent['action'],
  userId: string,
  metadata: Record<string, any> = {}
): Promise<void> => {
  try {
    const auditData = {
      action: `qr_code_${action}`,
      user_id: userId,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        page_url: window.location.href,
        device_type: /Mobile|Android|iP(hone|od|ad)/.test(navigator.userAgent) ? 'mobile' : 'desktop'
      }
    };

    // Log to console for development
    console.log('QR Code Audit Event:', auditData);

    // In a production environment, you would send this to your audit service
    // For now, we'll store it locally and log it
    const auditLogs = JSON.parse(localStorage.getItem('qr_audit_logs') || '[]');
    auditLogs.push(auditData);
    
    // Keep only the last 100 audit entries to prevent excessive storage
    if (auditLogs.length > 100) {
      auditLogs.splice(0, auditLogs.length - 100);
    }
    
    localStorage.setItem('qr_audit_logs', JSON.stringify(auditLogs));

    // TODO: In production, send to audit service
    // await fetch('/api/audit-log', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(auditData)
    // });

  } catch (error) {
    console.error('Error logging QR code audit event:', error);
    // Non-blocking error - audit logging should not break functionality
  }
};

/**
 * Get QR code audit logs from local storage (for development/debugging)
 * @returns Array of audit log entries
 */
export const getQRCodeAuditLogs = (): any[] => {
  try {
    return JSON.parse(localStorage.getItem('qr_audit_logs') || '[]');
  } catch (error) {
    console.error('Error retrieving QR code audit logs:', error);
    return [];
  }
};

/**
 * Clear QR code audit logs from local storage
 */
export const clearQRCodeAuditLogs = (): void => {
  try {
    localStorage.removeItem('qr_audit_logs');
    console.log('QR code audit logs cleared');
  } catch (error) {
    console.error('Error clearing QR code audit logs:', error);
  }
};
