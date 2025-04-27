
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
    
    // Create a new spreadsheet with a timestamp for better identification
    const timestamp = new Date().toLocaleString().replace(/[/\\:]/g, '-');
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `Resume Export - ${timestamp}`,
        },
        sheets: [
          {
            properties: {
              title: 'Personal Info',
              gridProperties: {
                frozenRowCount: 1,
              },
            }
          },
          {
            properties: {
              title: 'Experience',
              gridProperties: {
                frozenRowCount: 1,
              },
            }
          },
          {
            properties: {
              title: 'Education',
              gridProperties: {
                frozenRowCount: 1,
              },
            }
          },
          {
            properties: {
              title: 'Skills',
              gridProperties: {
                frozenRowCount: 1,
              },
            }
          }
        ]
      },
    });

    const spreadsheetId = spreadsheet.data.spreadsheetId;
    console.log(`Created spreadsheet with ID: ${spreadsheetId}`);
    
    // Format personal info sheet
    const personalInfoValues = [
      ['Personal Information'],
      ['Name', resumeData.name || ''],
      ['Title', resumeData.title || ''],
      ['Email', resumeData.email || ''],
      ['Phone', resumeData.phone || ''],
      ['Location', resumeData.location || ''],
      ['LinkedIn', resumeData.linkedin || ''],
      ['Website', resumeData.website || ''],
      ['Summary', resumeData.summary || ''],
    ];

    // Format experience sheet
    const experienceHeaders = ['Company', 'Title', 'Location', 'Start Date', 'End Date', 'Description'];
    const experienceValues = [experienceHeaders];
    
    if (Array.isArray(resumeData.experience)) {
      resumeData.experience.forEach(exp => {
        experienceValues.push([
          exp.company || '',
          exp.title || '',
          exp.location || '',
          exp.startDate || '',
          exp.endDate || 'Present',
          exp.description || '',
        ]);
      });
    }
    
    // Format education sheet
    const educationHeaders = ['Institution', 'Degree', 'Field', 'Start Date', 'End Date', 'GPA', 'Description'];
    const educationValues = [educationHeaders];
    
    if (Array.isArray(resumeData.education)) {
      resumeData.education.forEach(edu => {
        educationValues.push([
          edu.institution || '',
          edu.degree || '',
          edu.field || '',
          edu.startDate || '',
          edu.endDate || '',
          edu.gpa || '',
          edu.description || '',
        ]);
      });
    }
    
    // Format skills sheet
    const skillsValues = [['Skills']];
    
    if (Array.isArray(resumeData.skills)) {
      // Group skills by category if available
      const skillsByCategory = {};
      
      resumeData.skills.forEach(skill => {
        if (typeof skill === 'string') {
          if (!skillsByCategory['General']) {
            skillsByCategory['General'] = [];
          }
          skillsByCategory['General'].push(skill);
        } else if (skill.name) {
          const category = skill.category || 'General';
          if (!skillsByCategory[category]) {
            skillsByCategory[category] = [];
          }
          skillsByCategory[category].push(skill.name);
        }
      });
      
      for (const [category, skills] of Object.entries(skillsByCategory)) {
        skillsValues.push([category]);
        skillsValues.push([skills.join(', ')]);
        skillsValues.push([]); // Empty row for spacing
      }
    }
    
    // Update all sheets
    const updates = [
      {
        range: 'Personal Info!A1',
        values: personalInfoValues,
      },
      {
        range: 'Experience!A1',
        values: experienceValues,
      },
      {
        range: 'Education!A1',
        values: educationValues,
      },
      {
        range: 'Skills!A1',
        values: skillsValues,
      }
    ];
    
    // Apply formatting to make it more readable
    for (const update of updates) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: update.range,
        valueInputOption: 'RAW',
        requestBody: { values: update.values },
      });
    }

    // Auto-resize columns for better readability
    const requests = [
      {
        autoResizeDimensions: {
          dimensions: {
            sheetId: 0, // Personal Info sheet
            dimension: 'COLUMNS',
            startIndex: 0,
            endIndex: 2
          }
        }
      },
      {
        autoResizeDimensions: {
          dimensions: {
            sheetId: 1, // Experience sheet
            dimension: 'COLUMNS',
            startIndex: 0,
            endIndex: 6
          }
        }
      }
    ];
    
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: requests
      }
    });

    return new Response(JSON.stringify({ 
      spreadsheetId, 
      success: true,
      url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error exporting to Google Sheets:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.stack,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
