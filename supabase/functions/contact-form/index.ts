
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";
import { sanitizeInput, containsXssVector, isValidEmail } from "../_shared/sanitization.ts";

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

    // Send a notification email to the support team
    try {
      const notificationResponse = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
        },
        body: JSON.stringify({
          recipientEmail: "support@jobseeker4hs.org",
          subject: "New Contact Form Submission",
          message: `New message from ${safeName} (${safeEmail}):\n\n${safeMessage}`
        })
      });
      
      if (!notificationResponse.ok) {
        console.warn("Failed to send notification email:", await notificationResponse.text());
      }
    } catch (err) {
      console.error("Error sending notification:", err);
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
