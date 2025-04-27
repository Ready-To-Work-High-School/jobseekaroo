
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Upload, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { importResumeFromGoogleSheets, exportResumeToGoogleSheets } from "@/lib/google/sheets";

interface GoogleSheetsButtonsProps {
  onImport: (data: any) => void;
  resumeData: any;
}

const GoogleSheetsButtons = ({ onImport, resumeData }: GoogleSheetsButtonsProps) => {
  const { toast } = useToast();

  const handleImport = async () => {
    try {
      // For now, we'll use a test spreadsheet ID. In production, we'd want to let users select their sheet
      const data = await importResumeFromGoogleSheets('YOUR_TEST_SPREADSHEET_ID', 'Sheet1!A1:Z100');
      onImport(data);
      toast({
        title: "Success",
        description: "Resume data imported from Google Sheets",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import from Google Sheets",
        variant: "destructive",
      });
    }
  };

  const handleExport = async () => {
    try {
      const result = await exportResumeToGoogleSheets(resumeData);
      if (result.success) {
        toast({
          title: "Success",
          description: "Resume exported to Google Sheets",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export to Google Sheets",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleImport}
      >
        <Upload className="h-4 w-4" />
        Import from Sheets
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleExport}
      >
        <Download className="h-4 w-4" />
        Export to Sheets
      </Button>
    </div>
  );
};

export default GoogleSheetsButtons;
