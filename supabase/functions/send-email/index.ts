
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }

    const resend = new Resend(resendApiKey);
    const payload: EmailRequest = await req.json();
    
    if (!payload.to || !payload.subject || !payload.html) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: to, subject, and html are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Use the default Resend domain instead of a custom domain
    const fromAddress = "Career Platform <onboarding@resend.dev>";
    
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });
    
    if (error) {
      console.error("Resend API error:", error);
      throw error;
    }
    
    console.log("Email sent successfully:", data);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully",
        id: data?.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "An unexpected error occurred when sending email"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
