
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { validateSignedUrl } from "../_shared/crypto.ts";
import { corsHeaders, handleCors, addCorsHeaders } from "../_shared/cors.ts";
import { secureApiRequest, getClientIP } from "../_shared/api-security.ts";

const FUNCTION_NAME = "secure-file-access";

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Use the security middleware for all requests
  return secureApiRequest(req, FUNCTION_NAME, async (req, userId) => {
    try {
      const url = new URL(req.url);
      const token = url.searchParams.get('token');
      
      if (!token) {
        return addCorsHeaders(new Response(
          JSON.stringify({ error: 'Missing access token' }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' } 
          }
        ), req.headers.get('origin'));
      }
      
      // Validate the signed URL token
      const filePath = await validateSignedUrl(token);
      
      if (!filePath) {
        return addCorsHeaders(new Response(
          JSON.stringify({ error: 'Invalid or expired access token' }),
          { 
            status: 403, 
            headers: { 'Content-Type': 'application/json' } 
          }
        ), req.headers.get('origin'));
      }
      
      // Extract bucket and path from filePath (format: bucketName/path/to/file)
      const [bucketName, ...pathParts] = filePath.split('/');
      const path = pathParts.join('/');
      
      if (!bucketName || !path) {
        return addCorsHeaders(new Response(
          JSON.stringify({ error: 'Invalid file path format' }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' } 
          }
        ), req.headers.get('origin'));
      }
      
      // Get the file from storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .download(path);
        
      if (error || !data) {
        console.error('Error retrieving file:', error);
        return addCorsHeaders(new Response(
          JSON.stringify({ error: 'File not found or access denied' }),
          { 
            status: 404, 
            headers: { 'Content-Type': 'application/json' } 
          }
        ), req.headers.get('origin'));
      }
      
      // Log this access
      const clientIP = getClientIP(req);
      try {
        await supabase.from('security_audit_logs').insert({
          action: 'file_access',
          user_id: userId,
          metadata: {
            file_path: filePath,
            access_method: 'signed_url',
            timestamp: new Date().toISOString()
          },
          ip_address: clientIP,
          user_agent: req.headers.get('User-Agent')
        });
      } catch (logError) {
        console.error('Error logging file access:', logError);
        // Non-blocking error
      }
      
      // Return the file with proper headers
      const contentType = data.type || 'application/octet-stream';
      const headers = new Headers({
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${path.split('/').pop()}"`,
        'Cache-Control': 'private, max-age=300',
        ...corsHeaders
      });
      
      return new Response(data, { 
        status: 200, 
        headers
      });
    } catch (error) {
      console.error('Error in secure-file-access function:', error);
      
      return addCorsHeaders(new Response(
        JSON.stringify({ error: 'Server error during file access' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      ), req.headers.get('origin'));
    }
  });
});
