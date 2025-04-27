
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Upload, Download, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { importResumeFromGoogleSheets, exportResumeToGoogleSheets } from "@/lib/google/sheets";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GoogleSheetsButtonsProps {
  onImport: (data: any) => void;
  resumeData: any;
}

const GoogleSheetsButtons = ({ onImport, resumeData }: GoogleSheetsButtonsProps) => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [sheetRange, setSheetRange] = useState("Sheet1!A1:Z100");

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
      console.log("Importing from spreadsheet:", spreadsheetId);
      
      const data = await importResumeFromGoogleSheets(spreadsheetId, sheetRange);
      console.log("Import response:", data);
      
      if (!data?.values || !data.values.length) {
        throw new Error("No data found in the spreadsheet");
      }
      
      onImport(data);
      setImportDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Resume data imported from Google Sheets",
      });
    } catch (error) {
      console.error("Import error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to import from Google Sheets",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      console.log("Exporting resume data:", resumeData);
      
      const result = await exportResumeToGoogleSheets(resumeData);
      console.log("Export response:", result);
      
      if (result.success && result.spreadsheetId) {
        toast({
          title: "Success",
          description: (
            <div className="flex flex-col gap-2">
              <span>Resume exported to Google Sheets</span>
              <a 
                href={`https://docs.google.com/spreadsheets/d/${result.spreadsheetId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500"
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
      </div>

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import from Google Sheets</DialogTitle>
            <DialogDescription>
              Enter the Spreadsheet ID and range to import data.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="spreadsheet-id">Spreadsheet ID</Label>
              <Input
                id="spreadsheet-id"
                value={spreadsheetId}
                onChange={(e) => setSpreadsheetId(e.target.value)}
                placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              />
              <p className="text-sm text-muted-foreground">
                You can find the ID in the URL: https://docs.google.com/spreadsheets/d/
                <span className="font-mono">SPREADSHEET_ID</span>/edit
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sheet-range">Sheet Range</Label>
              <Input
                id="sheet-range"
                value={sheetRange}
                onChange={(e) => setSheetRange(e.target.value)}
                placeholder="Sheet1!A1:Z100"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded p-3 flex gap-2 text-sm">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <div className="text-amber-800">
                Make sure the Google Sheets API is enabled and you've shared the sheet with the service account email in your Supabase Edge Function secrets.
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={isImporting}>
              {isImporting ? "Importing..." : "Import"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GoogleSheetsButtons;
