
import { useState } from 'react';
import { RedemptionCode } from '@/types/redemption';

export function useBulkExport() {
  const [isExporting, setIsExporting] = useState(false);

  const exportCodes = async (
    codes: RedemptionCode[],
    format: 'csv' | 'json' | 'txt' = 'csv'
  ) => {
    if (codes.length === 0) {
      return;
    }

    setIsExporting(true);
    
    try {
      let data: string;
      let fileName: string;
      let mimeType: string;
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      if (format === 'csv') {
        // Create CSV data
        const headers = ['ID', 'Code', 'Type', 'Used', 'Used By', 'Used At', 'Created At', 'Expires At'];
        const rows = codes.map(code => [
          code.id,
          code.code,
          code.type,
          code.used ? 'Yes' : 'No',
          code.usedBy || '',
          code.usedAt ? new Date(code.usedAt).toLocaleString() : '',
          new Date(code.createdAt).toLocaleString(),
          code.expiresAt ? new Date(code.expiresAt).toLocaleString() : ''
        ]);
        
        data = [
          headers.join(','),
          ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');
        
        fileName = `redemption-codes-${timestamp}.csv`;
        mimeType = 'text/csv';
      } else if (format === 'json') {
        // Create JSON data
        data = JSON.stringify(codes, null, 2);
        fileName = `redemption-codes-${timestamp}.json`;
        mimeType = 'application/json';
      } else {
        // Create plain text data
        data = codes.map(code => (
          `ID: ${code.id}\n` +
          `Code: ${code.code}\n` +
          `Type: ${code.type}\n` +
          `Used: ${code.used ? 'Yes' : 'No'}\n` +
          `Used By: ${code.usedBy || 'N/A'}\n` +
          `Used At: ${code.usedAt ? new Date(code.usedAt).toLocaleString() : 'N/A'}\n` +
          `Created At: ${new Date(code.createdAt).toLocaleString()}\n` +
          `Expires At: ${code.expiresAt ? new Date(code.expiresAt).toLocaleString() : 'N/A'}\n` +
          `--------------------------------------`
        )).join('\n\n');
        
        fileName = `redemption-codes-${timestamp}.txt`;
        mimeType = 'text/plain';
      }
      
      // Create and download the file
      const blob = new Blob([data], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error exporting codes:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportCodes
  };
}
