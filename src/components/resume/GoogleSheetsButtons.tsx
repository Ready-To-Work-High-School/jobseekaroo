
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Upload, Download, AlertCircle, Info, CheckCircle, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { importResumeFromGoogleSheets, exportResumeToGoogleSheets, type ResumeData } from "@/lib/google/sheets";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface GoogleSheetsButtonsProps {
  onImport: (data: ResumeData) => void;
  resumeData: ResumeData;
}

const GoogleSheetsButtons = ({ onImport, resumeData }: GoogleSheetsButtonsProps) => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [sheetRange, setSheetRange] = useState("Sheet1!A1:Z1000");
  const [importTab, setImportTab] = useState<'id' | 'guide'>('id');
  const [importMethod, setImportMethod] = useState<'specific' | 'all'>('all');
  const [lastExportedUrl, setLastExportedUrl] = useState<string | null>(null);

  const handleImportClick = () => {
    setImportDialogOpen(true);
  };

  const handleImport = async () => {
    if (!spreadsheetId) {
      toast({
        title: "Error",
        description: "Please enter a valid Spreadsheet ID",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsImporting(true);
      console.log(`[Debug] Importing from spreadsheet: ${spreadsheetId}, range: ${importMethod === 'specific' ? sheetRange : 'All'}`);
      
      const data = await importResumeFromGoogleSheets(
        spreadsheetId, 
        importMethod === 'specific' ? sheetRange : undefined
      );
      
      console.log("[Debug] Import response:", data);
      
      // Add more detailed logging
      if (!data.success) {
        console.error("[Error] Import was not successful", data);
        throw new Error("Import was not successful");
      }
      
      if (data.resumeData) {
        console.log("[Debug] Resume data found, importing...");
        onImport(data.resumeData);
        setImportDialogOpen(false);
        
        toast({
          title: "Success",
          description: "Resume data imported from Google Sheets",
        });
      } else if (data.values && data.values.length) {
        console.log("[Debug] Raw sheet data found, processing...");
        const resumeData = processSimpleSheetData(data.values);
        onImport(resumeData);
        setImportDialogOpen(false);
        
        toast({
          title: "Success",
          description: "Resume data imported from Google Sheets",
        });
      } else {
        console.warn("[Warning] No usable data found in spreadsheet");
        throw new Error("No usable data found in the spreadsheet");
      }
    } catch (error) {
      console.error("[Error] Import error:", error);
      toast({
        title: "Import Error",
        description: error instanceof Error ? error.message : "Failed to import from Google Sheets",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = async () => {
    if (!resumeData || Object.keys(resumeData).length === 0) {
      toast({
        title: "Error",
        description: "No resume data to export",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExporting(true);
      console.log("Exporting resume data:", resumeData);
      
      const result = await exportResumeToGoogleSheets(resumeData);
      console.log("Export response:", result);
      
      if (result.success && result.spreadsheetId) {
        const url = result.url || `https://docs.google.com/spreadsheets/d/${result.spreadsheetId}`;
        setLastExportedUrl(url);
        
        toast({
          title: "Success",
          description: (
            <div className="flex flex-col gap-2">
              <span>Resume exported to Google Sheets</span>
              <a 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500 hover:text-blue-700 transition-colors"
              >
                Open Spreadsheet
              </a>
            </div>
          ),
          duration: 8000,
        });
      } else {
        throw new Error("Failed to export resume");
      }
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to export to Google Sheets",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Basic processor for simple table data
  const processSimpleSheetData = (values: any[][]): ResumeData => {
    const resume: ResumeData = {
      name: '',
      email: '',
      phone: '',
      summary: '',
      experience: [],
      skills: []
    };

    try {
      // First row might be headers
      const firstRow = values[0];
      if (firstRow.includes('Name') || firstRow.includes('Email')) {
        // This is likely a key-value format
        for (const row of values) {
          if (row.length < 2) continue;
          
          switch (row[0].toLowerCase()) {
            case 'name':
              resume.name = row[1];
              break;
            case 'email':
              resume.email = row[1];
              break;
            case 'phone':
              resume.phone = row[1];
              break;
            case 'summary':
              resume.summary = row[1];
              break;
            case 'skills':
              resume.skills = row[1].split(',').map((s: string) => s.trim());
              break;
          }
          
          // Look for experience section
          if (row[0] === 'Experience' && values.indexOf(row) + 1 < values.length) {
            let i = values.indexOf(row) + 1;
            while (i < values.length && values[i].length > 0) {
              const exp = values[i];
              if (exp.length >= 3) {
                resume.experience?.push({
                  title: exp[0] || '',
                  company: exp[1] || '',
                  startDate: exp[2] || '',
                  description: exp[3] || ''
                });
              }
              i++;
            }
          }
        }
      } else {
        // This might be a table format with headers
        // Try to extract based on column names
        if (values.length > 1) {
          const headers = firstRow.map((h: string) => h.toLowerCase());
          
          // Find name, email, etc from columns
          const nameIndex = headers.findIndex(h => h.includes('name'));
          const emailIndex = headers.findIndex(h => h.includes('email'));
          const phoneIndex = headers.findIndex(h => h.includes('phone'));
          
          if (nameIndex >= 0 && values[1][nameIndex]) {
            resume.name = values[1][nameIndex];
          }
          if (emailIndex >= 0 && values[1][emailIndex]) {
            resume.email = values[1][emailIndex];
          }
          if (phoneIndex >= 0 && values[1][phoneIndex]) {
            resume.phone = values[1][phoneIndex];
          }
        }
      }
    } catch (err) {
      console.error("Error processing sheet data:", err);
    }

    return resume;
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleImportClick}
          disabled={isImporting}
        >
          {isImporting ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Import from Sheets
        </Button>
        
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export to Sheets
        </Button>
        
        {lastExportedUrl && (
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => window.open(lastExportedUrl, '_blank')}
          >
            <FileSpreadsheet className="h-4 w-4" />
            View Last Export
          </Button>
        )}
      </div>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Import from Google Sheets</DialogTitle>
            <DialogDescription>
              Enter the Spreadsheet ID and choose an import method.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={importTab} onValueChange={(v) => setImportTab(v as 'id' | 'guide')}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="id">Import Sheet</TabsTrigger>
              <TabsTrigger value="guide">Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="id" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="spreadsheet-id">Spreadsheet ID</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <p className="text-sm">
                        The Spreadsheet ID is in the URL: 
                        <span className="block font-mono text-xs bg-muted p-1 mt-1 rounded">
                          https://docs.google.com/spreadsheets/d/<span className="font-bold">SPREADSHEET_ID</span>/edit
                        </span>
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
                <Input
                  id="spreadsheet-id"
                  value={spreadsheetId}
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                  placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="import-method">Import Method</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Info className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <p className="text-sm">
                        <strong>All Sheets:</strong> Tries to import data from all sheets and auto-detect resume structure.
                        <br /><br />
                        <strong>Specific Range:</strong> Import from a specific range like "Sheet1!A1:Z100".
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    id="all-sheets" 
                    name="import-method"
                    checked={importMethod === 'all'}
                    onChange={() => setImportMethod('all')}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="all-sheets">All Sheets</Label>
                  
                  <input 
                    type="radio" 
                    id="specific-range" 
                    name="import-method"
                    checked={importMethod === 'specific'}
                    onChange={() => setImportMethod('specific')}
                    className="h-4 w-4 ml-4"
                  />
                  <Label htmlFor="specific-range">Specific Range</Label>
                </div>
              </div>
              
              {importMethod === 'specific' && (
                <div className="space-y-2">
                  <Label htmlFor="sheet-range">Sheet Range</Label>
                  <Input
                    id="sheet-range"
                    value={sheetRange}
                    onChange={(e) => setSheetRange(e.target.value)}
                    placeholder="Sheet1!A1:Z100"
                  />
                </div>
              )}

              <Alert variant="default" className="bg-amber-50 border border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription className="text-amber-800 text-sm">
                  Make sure you've shared the sheet with the service account email in your Supabase Edge Function secrets.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="guide">
              <div className="space-y-4 text-sm">
                <div className="rounded-md border p-4">
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Spreadsheet Format Tips
                  </h4>
                  <p className="mb-2">For best results, structure your sheet with:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Separate sheets for Personal Info, Experience, Education, and Skills</li>
                    <li>Clear column headers: Name, Email, Company, Title, etc.</li>
                    <li>Use consistent date formats (MM/YYYY)</li>
                  </ul>
                </div>
                
                <div className="rounded-md border p-4">
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Sharing Steps
                  </h4>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Open your Google Sheet</li>
                    <li>Click "Share" in the top-right</li>
                    <li>Add the service account email as an Editor</li>
                    <li>Click "Done"</li>
                  </ol>
                </div>
                
                <div className="rounded-md border p-4">
                  <h4 className="font-medium text-sm mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                    Troubleshooting
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>If import fails, check that the sheet is shared correctly</li>
                    <li>Verify the Spreadsheet ID is correct</li>
                    <li>Make sure the Google Sheets API is enabled in your Google Cloud project</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setImportDialogOpen(false)} disabled={isImporting}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleImport} disabled={isImporting || !spreadsheetId}>
              {isImporting ? "Importing..." : "Import"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GoogleSheetsButtons;
