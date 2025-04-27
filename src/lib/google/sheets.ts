
import { supabase } from '@/lib/supabase';

interface SheetData {
  values?: any[][];
  sheets?: Record<string, any[][]>;
  resumeData?: ResumeData;
  success: boolean;
}

export interface ResumeData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  website?: string;
  summary?: string;
  skills?: string[] | { name: string; category?: string }[];
  experience?: Array<{
    company?: string;
    title?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    duration?: string;
  }>;
  education?: Array<{
    institution?: string;
    degree?: string;
    field?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
    description?: string;
  }>;
}

export async function importResumeFromGoogleSheets(spreadsheetId: string, range?: string): Promise<SheetData> {
  try {
    console.log(`Importing from Google Sheets: ${spreadsheetId}, range: ${range || 'All sheets'}`);
    
    const { data, error } = await supabase.functions.invoke('google-sheets-import', {
      body: { spreadsheetId, range }
    });
    
    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Function error: ${error.message}`);
    }
    
    if (!data) {
      throw new Error("No data returned from Google Sheets");
    }
    
    console.log("Import data received:", data);
    
    // Validate the data structure
    validateImportedData(data);
    
    return data as SheetData;
  } catch (error) {
    console.error('Error importing from Google Sheets:', error);
    throw error;
  }
}

export async function exportResumeToGoogleSheets(resumeData: ResumeData): Promise<{ 
  spreadsheetId: string; 
  success: boolean;
  url?: string;
}> {
  try {
    console.log("Exporting to Google Sheets:", resumeData);
    
    // Validate the resume data before sending
    validateResumeData(resumeData);
    
    const { data, error } = await supabase.functions.invoke('google-sheets-export', {
      body: { resumeData }
    });
    
    if (error) {
      console.error("Supabase function error:", error);
      throw new Error(`Function error: ${error.message}`);
    }
    
    if (!data) {
      throw new Error("No response from Google Sheets export");
    }
    
    console.log("Export response:", data);
    
    if (!data.spreadsheetId || !data.success) {
      throw new Error("Export was not successful");
    }
    
    return data as { 
      spreadsheetId: string; 
      success: boolean;
      url?: string;
    };
  } catch (error) {
    console.error('Error exporting to Google Sheets:', error);
    throw error;
  }
}

// Validate imported data structure
function validateImportedData(data: any): void {
  if (!data.success) {
    throw new Error("Import was not successful");
  }
  
  if (!data.values && !data.sheets && !data.resumeData) {
    throw new Error("No valid data structure found in import response");
  }
}

// Validate resume data before export
function validateResumeData(resumeData: ResumeData): void {
  if (!resumeData) {
    throw new Error("Resume data is required");
  }
  
  // Check for minimum required fields
  if (!resumeData.name && !resumeData.email && !resumeData.summary) {
    throw new Error("Resume data must contain at least name, email, or summary");
  }
}
