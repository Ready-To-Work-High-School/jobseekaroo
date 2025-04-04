
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, handleCors, addCorsHeaders } from "../_shared/cors.ts";
import { secureApiRequest, getClientIP } from "../_shared/api-security.ts";

// Initialize Supabase client with service role key
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function name for logging
const FUNCTION_NAME = "audit-log";

// Interface for audit log entry
interface AuditLogEntry {
  action: string;
  user_id?: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

async function logAuditEvent(entry: AuditLogEntry) {
  try {
    // Insert the audit log entry
    const { data, error } = await supabase
      .from('security_audit_logs')
      .insert([
        {
          action: entry.action,
          user_id: entry.user_id,
          metadata: entry.metadata,
          ip_address: entry.ip_address,
          user_agent: entry.user_agent,
        },
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error logging audit event:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Use the security middleware for all requests
  return secureApiRequest(req, FUNCTION_NAME, async (req, userId) => {
    try {
      // Get request data
      const { action, metadata } = await req.json();
      
      // Required fields validation
      if (!action) {
        return addCorsHeaders(new Response(
          JSON.stringify({ error: 'Action is required' }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' } 
          }
        ), req.headers.get('origin'));
      }

      // Create audit log entry
      const auditEntry: AuditLogEntry = {
        action,
        user_id: userId,
        metadata,
        ip_address: getClientIP(req),
        user_agent: req.headers.get('User-Agent'),
      };

      // Log the audit event
      await logAuditEvent(auditEntry);

      return addCorsHeaders(new Response(
        JSON.stringify({ success: true }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' } 
        }
      ), req.headers.get('origin'));
    } catch (error) {
      console.error('Error in audit-log function:', error);
      
      return addCorsHeaders(new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      ), req.headers.get('origin'));
    }
  });
});
