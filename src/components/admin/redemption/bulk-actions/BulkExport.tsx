
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CheckIcon, Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import { RedemptionCode } from '@/types/redemption';
import { toast } from '@/hooks/use-toast';

interface BulkExportProps {
  selectedCodes: RedemptionCode[];
  allCodes: RedemptionCode[];
  onExport: (codes: RedemptionCode[], format: 'csv' | 'json' | 'txt') => Promise<void>;
}

const BulkExport: React.FC<BulkExportProps> = ({ selectedCodes, allCodes, onExport }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'txt'>('csv');

  const handleExport = async (
    exportAllCodes: boolean,
    format: 'csv' | 'json' | 'txt' = exportFormat
  ) => {
    try {
      setIsExporting(true);
      setExportFormat(format);
      
      const codesToExport = exportAllCodes ? allCodes : selectedCodes;
      
      if (codesToExport.length === 0) {
        toast({
          title: "No codes to export",
          description: "Select codes or use 'Export All' option",
          variant: "destructive",
        });
        return;
      }

      await onExport(codesToExport, format);
      
      toast({
        title: `Exported ${codesToExport.length} codes`,
        description: `Successfully exported to ${format.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the codes",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getExportButtonText = () => {
    if (isExporting) return 'Exporting...';
    if (selectedCodes.length > 0) return `Export ${selectedCodes.length} selected`;
    return 'Export';
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
          {getExportButtonText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
        <div className="p-2">
          <h4 className="font-medium text-sm p-2">Export Options</h4>
          <div className="grid gap-1">
            {selectedCodes.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="justify-start font-normal"
                onClick={() => handleExport(false, 'csv')}
                disabled={isExporting}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                <span>Export Selected as CSV</span>
                {exportFormat === 'csv' && !isExporting && <CheckIcon className="ml-auto h-4 w-4" />}
              </Button>
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
              onClick={() => handleExport(true, 'txt')}
              disabled={isExporting}
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Export All as Plain Text</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BulkExport;
