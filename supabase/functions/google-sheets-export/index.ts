
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeData } = await req.json();
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: Deno.env.get('GOOGLE_SHEETS_CLIENT_EMAIL'),
        private_key: Deno.env.get('GOOGLE_SHEETS_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Create a new spreadsheet
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `Resume Export - ${new Date().toLocaleDateString()}`,
        },
      },
    });

    const spreadsheetId = spreadsheet.data.spreadsheetId;

    // Convert resume data to a format suitable for sheets
    const values = [
      ['Resume Data'],
      ['Name', resumeData.name || ''],
      ['Email', resumeData.email || ''],
      ['Phone', resumeData.phone || ''],
      ['Summary', resumeData.summary || ''],
      ['Skills', resumeData.skills?.join(', ') || ''],
      ['Experience', ''],
      ...((resumeData.experience || []).map((exp) => [
        exp.title,
        exp.company,
        exp.startDate + ' - ' + exp.endDate,
        exp.description,
      ])),
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'A1',
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    return new Response(JSON.stringify({ spreadsheetId, success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
