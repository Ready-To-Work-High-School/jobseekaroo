
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';
import { RedemptionCode } from '@/types/redemption';

interface RedemptionCodesTableProps {
  codes: RedemptionCode[];
  onCopyCode: (code: string) => void;
  onDeleteCode: (code: RedemptionCode) => void;
  formatDate: (date: Date) => string;
}

const RedemptionCodesTable = ({
  codes,
  onCopyCode,
  onDeleteCode,
  formatDate
}: RedemptionCodesTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-muted/50">
          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Code</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Created</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Expires</th>
          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
        </tr>
      </thead>
      <tbody>
        {codes.map((code) => (
          <tr key={code.id} className="border-t hover:bg-muted/50">
            <td className="px-4 py-3 text-sm font-mono">{code.code}</td>
            <td className="px-4 py-3 text-sm capitalize">{code.type}</td>
            <td className="px-4 py-3 text-sm">
              {code.used ? (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                  Used
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  Available
                </span>
              )}
            </td>
            <td className="px-4 py-3 text-sm">{formatDate(code.createdAt)}</td>
            <td className="px-4 py-3 text-sm">{formatDate(code.expiresAt)}</td>
            <td className="px-4 py-3 text-sm">
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onCopyCode(code.code)}
                  title="Copy code"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-600"
                  onClick={() => onDeleteCode(code)}
                  title="Delete code"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RedemptionCodesTable;
