
import { supabase } from '@/lib/supabase';

interface SheetData {
  values: any[][];
}

export async function importResumeFromGoogleSheets(spreadsheetId: string, range: string) {
  try {
    const { data, error } = await supabase.functions.invoke('google-sheets-import', {
      body: { spreadsheetId, range }
    });
    
    if (error) throw error;
    return data as SheetData;
  } catch (error) {
    console.error('Error importing from Google Sheets:', error);
    throw error;
  }
}

export async function exportResumeToGoogleSheets(resumeData: any) {
  try {
    const { data, error } = await supabase.functions.invoke('google-sheets-export', {
      body: { resumeData }
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error exporting to Google Sheets:', error);
    throw error;
  }
}
