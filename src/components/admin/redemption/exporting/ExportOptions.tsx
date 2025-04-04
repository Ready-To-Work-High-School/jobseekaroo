
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FileSpreadsheet, FileText, Printer, Download, Loader2 } from 'lucide-react';
import { RedemptionCode } from '@/types/redemption';
import { useBulkExport } from '@/hooks/redemption/useBulkExport';
import { toast } from '@/hooks/use-toast';

interface ExportOptionsProps {
  selectedCodes: RedemptionCode[];
  allCodes: RedemptionCode[];
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ selectedCodes, allCodes }) => {
  const { exportCodes, isExporting } = useBulkExport();

  const handleExport = async (
    exportAllCodes: boolean,
    format: 'csv' | 'json' | 'txt' | 'excel' | 'pdf' = 'csv'
  ) => {
    try {
      const codesToExport = exportAllCodes ? allCodes : selectedCodes;
      
      if (codesToExport.length === 0) {
        toast({
          title: "No codes to export",
          description: "Select codes or use 'Export All' option",
          variant: "destructive",
        });
        return;
      }

      if (format === 'pdf') {
        window.print();
        toast({
          title: "Print dialog opened",
          description: "Save as PDF to export in PDF format",
        });
      } else if (format === 'excel') {
        await exportCodes(codesToExport, 'csv'); // Excel can open CSV
        toast({
          title: `Exported ${codesToExport.length} codes to Excel`,
          description: "CSV file generated for Excel",
        });
      } else {
        // Use the original export function for other formats
        await exportCodes(codesToExport, format as 'csv' | 'json' | 'txt');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the codes",
        variant: "destructive",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
        <div className="p-2">
          <h4 className="font-medium text-sm p-2">Export Options</h4>
          <div className="grid gap-1">
            {selectedCodes.length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start font-normal"
                  onClick={() => handleExport(false, 'csv')}
                  disabled={isExporting}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  <span>Export Selected as CSV</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start font-normal"
                  onClick={() => handleExport(false, 'excel')}
                  disabled={isExporting}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  <span>Export Selected as Excel</span>
                </Button>
              </>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start font-normal"
              onClick={() => handleExport(true, 'csv')}
              disabled={isExporting}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              <span>Export All as CSV</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start font-normal"
              onClick={() => handleExport(true, 'excel')}
              disabled={isExporting}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              <span>Export All as Excel</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start font-normal"
              onClick={() => handleExport(true, 'json')}
              disabled={isExporting}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Export All as JSON</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="justify-start font-normal"
              onClick={() => handleExport(true, 'pdf')}
              disabled={isExporting}
            >
              <Printer className="mr-2 h-4 w-4" />
              <span>Print/Export as PDF</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ExportOptions;
