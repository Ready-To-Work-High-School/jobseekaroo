
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

// Enhanced CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

// Handle CORS preflight requests more efficiently
const handleCors = (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  return null;
};

// Improved server-side sanitization utility
const sanitizeInput = (input: string | null | undefined): string => {
  if (input == null) return '';
  
  const str = String(input);
  
  // Enhanced sanitization to strip HTML tags and suspicious patterns
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: URLs
    .replace(/&#/gi, '') // Remove HTML entities
    .replace(/\\x[0-9A-Fa-f]{2}/gi, '') // Remove hex escapes
    .replace(/\\u[0-9A-Fa-f]{4}/gi, ''); // Remove unicode escapes
};

// Check for potentially malicious patterns
const containsXssVector = (input: string): boolean => {
  if (!input) return false;
  
  const dangerPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /\bon\w+\s*=/gi,
    /<i?frame/gi,
    /<(?:embed|object|svg)\b/gi,
    /expression\s*\(/gi,
    /data:\s*(?:text\/html|application\/x)/gi,
    /vbscript:/gi,
    /<img[^>]*\s+on\w+\s*=/gi,
  ];
  
  return dangerPatterns.some(pattern => pattern.test(input));
};

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { 
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Parse the request body
    const body = await req.json().catch(err => {
      console.error("Error parsing request body:", err);
      return null;
    });
    
    if (!body) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        error: "Missing required fields",
        details: {
          name: !name ? "Name is required" : null,
          email: !email ? "Email is required" : null,
          message: !message ? "Message is required" : null
        }
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Sanitize inputs server-side
    const safeName = sanitizeInput(name);
    const safeEmail = sanitizeInput(email);
    const safeMessage = sanitizeInput(message);

    // Check for malicious content
    if (containsXssVector(name) || containsXssVector(email) || containsXssVector(message)) {
      console.warn("XSS attempt detected in contact form", { name, email });
      return new Response(JSON.stringify({ 
        error: "Security validation failed",
        message: "Your submission contained potentially unsafe content that was blocked."
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Validate email format
    if (!isValidEmail(safeEmail)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Create contact record with timestamp
    const { data, error } = await supabaseClient
      .from("contacts")
      .insert({
        name: safeName,
        email: safeEmail,
        message: safeMessage,
      })
      .select();

    if (error) {
      console.error("Database error:", error);
      return new Response(JSON.stringify({ 
        error: "Failed to submit contact form",
        message: "There was an error saving your message. Please try again later."
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Return success response with the inserted data
    return new Response(JSON.stringify({ 
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
      data: data?.[0] ? { id: data[0].id, created_at: data[0].created_at } : null
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ 
      error: "Server error",
      message: "An unexpected error occurred. Please try again later."
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
