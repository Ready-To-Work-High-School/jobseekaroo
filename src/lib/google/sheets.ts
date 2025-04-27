
import { supabase } from '@/lib/supabase';

interface SheetData {
  values: any[][];
}

export async function importResumeFromGoogleSheets(spreadsheetId: string, range: string) {
  try {
    console.log(`Importing from Google Sheets: ${spreadsheetId}, range: ${range}`);
    
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
    return data as SheetData;
  } catch (error) {
    console.error('Error importing from Google Sheets:', error);
    throw error;
  }
}

export async function exportResumeToGoogleSheets(resumeData: any) {
  try {
    console.log("Exporting to Google Sheets:", JSON.stringify(resumeData).substring(0, 100) + "...");
    
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
    return data;
  } catch (error) {
    console.error('Error exporting to Google Sheets:', error);
    throw error;
  }
}
