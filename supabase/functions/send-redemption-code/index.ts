
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
      console.error("Missing required fields:", { to, subject, message, codesLength: codes?.length });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Format the email content with a table of codes
    const formattedMessage = formatEmailWithCodes(message, codes);

    // In a real implementation, you would use an email service like Resend or SendGrid
    // Example with Resend:
    // const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    // const emailResponse = await resend.emails.send({
    //   from: "Career Platform <noreply@yourschool.edu>",
    //   to: [to],
    //   subject: subject,
    //   html: formattedMessage,
    // });

    // For now, we'll just log the email and return success
    console.log("Would send email:", {
      to,
      subject,
      message: formattedMessage.substring(0, 100) + "...", // Log just the beginning for brevity
      codesCount: codes.length,
      timestamp: new Date().toISOString()
    });

    // Track this email in the database to have a record of sent codes
    // This could be used for audit purposes or to track which codes were sent to which emails
    // (You would need to create a redemption_code_emails table for this)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully",
        sentTo: to,
        codeCount: codes.length
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-redemption-code function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// Helper function to format email with code table
function formatEmailWithCodes(
  message: string, 
  codes: { id: string; code: string; type: string; expiresAt?: Date }[]
): string {
  const expiryDate = codes[0]?.expiresAt 
    ? new Date(codes[0].expiresAt).toLocaleDateString() 
    : 'Not specified';

  const codeRows = codes.map(code => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${code.code}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${code.type.charAt(0).toUpperCase() + code.type.slice(1)}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${
        code.expiresAt ? new Date(code.expiresAt).toLocaleDateString() : 'Not specified'
      }</td>
    </tr>
  `).join('');

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
          .content { margin-bottom: 20px; white-space: pre-line; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th { background-color: #f0f0f0; text-align: left; padding: 12px 8px; border: 1px solid #ddd; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 20px; }
          .note { background-color: #fffde7; padding: 10px; border-radius: 4px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Redemption Codes</h2>
            <p>Total codes: ${codes.length}</p>
          </div>
          
          <div class="content">
            ${message.replace(/\n/g, '<br/>')}
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              ${codeRows}
            </tbody>
          </table>
          
          <div class="note">
            <p><strong>Important:</strong> Please save this email or copy the code(s) to a secure location.</p>
          </div>
          
          <div class="footer">
            <p>These codes were generated by the platform administrator.</p>
            <p>If you received this email in error, please disregard it.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

serve(handler);
