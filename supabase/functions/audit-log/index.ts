
import { serve } from 'https://deno.land/std@0.170.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize Supabase client with service role key
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Missing or invalid authorization' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get JWT token from Authorization header
    const token = authHeader.split(' ')[1];
    
    // Verify the JWT and get user info
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Get request data
    const { action, metadata } = await req.json();
    
    // Required fields validation
    if (!action) {
      return new Response(
        JSON.stringify({ error: 'Action is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Create audit log entry
    const auditEntry: AuditLogEntry = {
      action,
      user_id: user?.id,
      metadata,
      ip_address: req.headers.get('X-Forwarded-For') || req.headers.get('CF-Connecting-IP'),
      user_agent: req.headers.get('User-Agent'),
    };

    // Log the audit event
    await logAuditEvent(auditEntry);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error in audit-log function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});
