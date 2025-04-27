
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
    const { spreadsheetId, range } = await req.json();
    
    if (!spreadsheetId) {
      return new Response(JSON.stringify({ error: "Spreadsheet ID is required" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: Deno.env.get('GOOGLE_SHEETS_CLIENT_EMAIL'),
        private_key: Deno.env.get('GOOGLE_SHEETS_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    console.log(`Attempting to fetch data from spreadsheet: ${spreadsheetId}, range: ${range || 'All'}`);
    
    // If no specific range is provided, fetch all sheets in the spreadsheet
    if (!range) {
      // First get the sheet names
      const spreadsheetData = await sheets.spreadsheets.get({
        spreadsheetId,
      });
      
      const sheetNames = spreadsheetData.data.sheets?.map(sheet => sheet.properties?.title) || [];
      console.log(`Found sheets: ${sheetNames.join(', ')}`);
      
      if (sheetNames.length === 0) {
        throw new Error("No sheets found in the spreadsheet");
      }
      
      // Fetch data from each sheet
      const allData = {};
      for (const sheetName of sheetNames) {
        if (!sheetName) continue;
        
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: `${sheetName}!A1:Z1000`, // Fetch a large range to ensure we get all data
        });
        
        allData[sheetName] = response.data.values || [];
      }
      
      // Process the data to reconstruct a resume object
      const resumeData = processResumeSheets(allData);
      
      return new Response(JSON.stringify({ 
        sheets: allData,
        resumeData,
        success: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } 
    // If a specific range is provided, fetch just that range
    else {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      if (!response.data.values || response.data.values.length === 0) {
        return new Response(JSON.stringify({ 
          error: "No data found in specified range",
          values: [],
          success: false
        }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Try to determine if this is a standard format we recognize
      const resumeData = processSheetData(response.data.values);

      return new Response(JSON.stringify({ 
        values: response.data.values,
        resumeData,
        success: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error importing from Google Sheets:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Process data from multiple sheets to reconstruct a resume object
function processResumeSheets(sheetsData) {
  const resume = {
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: [],
    education: [],
    skills: []
  };

  // Process Personal Info sheet
  if (sheetsData['Personal Info']) {
    const personalInfo = sheetsData['Personal Info'];
    for (const row of personalInfo) {
      if (row.length < 2) continue;
      const [key, value] = row;
      if (!value) continue;
      
      switch(key.toLowerCase()) {
        case 'name':
          resume.name = value;
          break;
        case 'title':
          resume.title = value;
          break;
        case 'email':
          resume.email = value;
          break;
        case 'phone':
          resume.phone = value;
          break;
        case 'location':
          resume.location = value;
          break;
        case 'linkedin':
          resume.linkedin = value;
          break;
        case 'website':
          resume.website = value;
          break;
        case 'summary':
          resume.summary = value;
          break;
      }
    }
  }

  // Process Experience sheet
  if (sheetsData['Experience']) {
    const experience = sheetsData['Experience'];
    if (experience.length > 1) { // Skip if only headers exist
      const headers = experience[0].map(h => h.toLowerCase());
      
      for (let i = 1; i < experience.length; i++) {
        const row = experience[i];
        if (row.length < 3) continue; // Need at least company, title, dates
        
        const exp = {};
        row.forEach((value, index) => {
          if (index >= headers.length) return;
          
          const header = headers[index];
          switch(header) {
            case 'company':
              exp.company = value;
              break;
            case 'title':
              exp.title = value;
              break;
            case 'location':
              exp.location = value;
              break;
            case 'start date':
              exp.startDate = value;
              break;
            case 'end date':
              exp.endDate = value;
              break;
            case 'description':
              exp.description = value;
              break;
          }
        });
        
        if (exp.company && exp.title) {
          resume.experience.push(exp);
        }
      }
    }
  }

  // Process Education sheet
  if (sheetsData['Education']) {
    const education = sheetsData['Education'];
    if (education.length > 1) { // Skip if only headers exist
      const headers = education[0].map(h => h.toLowerCase());
      
      for (let i = 1; i < education.length; i++) {
        const row = education[i];
        if (row.length < 2) continue; // Need at least institution and degree
        
        const edu = {};
        row.forEach((value, index) => {
          if (index >= headers.length) return;
          
          const header = headers[index];
          switch(header) {
            case 'institution':
              edu.institution = value;
              break;
            case 'degree':
              edu.degree = value;
              break;
            case 'field':
              edu.field = value;
              break;
            case 'start date':
              edu.startDate = value;
              break;
            case 'end date':
              edu.endDate = value;
              break;
            case 'gpa':
              edu.gpa = value;
              break;
            case 'description':
              edu.description = value;
              break;
          }
        });
        
        if (edu.institution) {
          resume.education.push(edu);
        }
      }
    }
  }

  // Process Skills sheet
  if (sheetsData['Skills']) {
    const skills = sheetsData['Skills'];
    let currentCategory = 'General';
    
    for (let i = 0; i < skills.length; i++) {
      const row = skills[i];
      if (!row || row.length === 0) continue;
      
      if (row.length === 1 && row[0] !== 'Skills') {
        // This is likely a category
        currentCategory = row[0];
      } else if (row.length >= 1 && i > 0) {
        // This contains skills
        const skillList = row.join(', ').split(',').map(s => s.trim()).filter(s => s);
        
        skillList.forEach(skill => {
          resume.skills.push({
            name: skill,
            category: currentCategory
          });
        });
      }
    }
  }

  return resume;
}

// Process simple single-sheet data
function processSheetData(values) {
  const resume = {
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: [],
    skills: []
  };

  // Try to infer the data structure
  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    if (row.length < 2) continue;
    
    // Look for key-value pairs
    if (row.length === 2) {
      const [key, value] = row;
      if (!value) continue;
      
      switch(key.toLowerCase()) {
        case 'name':
          resume.name = value;
          break;
        case 'email':
          resume.email = value;
          break;
        case 'phone':
          resume.phone = value;
          break;
        case 'summary':
          resume.summary = value;
          break;
        case 'skills':
          resume.skills = value.split(',').map(s => s.trim());
          break;
      }
    }
    
    // Look for experience data
    if (row[0] === 'Experience' && i + 1 < values.length) {
      const expRows = [];
      let j = i + 1;
      
      // Collect all experience entries
      while (j < values.length && values[j].length > 0) {
        expRows.push(values[j]);
        j++;
      }
      
      // Process each experience entry
      for (let k = 0; k < expRows.length; k++) {
        const exp = expRows[k];
        if (exp.length >= 3) {
          resume.experience.push({
            title: exp[0] || '',
            company: exp[1] || '',
            duration: exp[2] || '',
            description: exp[3] || ''
          });
        }
      }
      
      i = j; // Skip processed rows
    }
  }
  
  return resume;
}
