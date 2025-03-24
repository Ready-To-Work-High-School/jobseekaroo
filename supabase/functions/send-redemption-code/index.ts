
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

// This would be replaced with an actual email service like Resend or SendGrid
interface EmailPayload {
  to: string;
  subject: string;
  message: string;
  codes: {
    id: string;
    code: string;
    type: string;
    expiresAt?: Date;
  }[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, message, codes }: EmailPayload = await req.json();

    // Validate payload
    if (!to || !subject || !message || !codes || codes.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // In a real implementation, you would use an email service like Resend or SendGrid
    // Example with Resend:
    // const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    // const emailResponse = await resend.emails.send({
    //   from: "Career Platform <noreply@yourschool.edu>",
    //   to: [to],
    //   subject: subject,
    //   html: `<html><body>${message.replace(/\n/g, '<br/>')}</body></html>`,
    // });

    // For now, we'll just log the email and return success
    console.log("Would send email:", {
      to,
      subject,
      message,
      codes: codes.map(c => c.code).join(", ")
    });

    // Track this email in the database to have a record of sent codes
    // This could be used for audit purposes or to track which codes were sent to which emails
    // (You would need to create a redemption_code_emails table for this)

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-redemption-code function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
