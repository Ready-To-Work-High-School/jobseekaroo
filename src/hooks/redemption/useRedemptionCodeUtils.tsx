
import { RedemptionCode } from '@/types/redemption';

export function useRedemptionCodeUtils() {
  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const exportCodes = (codes: RedemptionCode[]) => {
    const csvContent = [
      ['Code', 'Type', 'Status', 'Created', 'Expires', 'Used By', 'Used At'].join(','),
      ...codes.map(code => [
        code.code,
        code.type,
        code.used ? 'Used' : 'Available',
        formatDate(code.createdAt),
        formatDate(code.expiresAt || ''),
        code.usedBy || 'N/A',
        formatDate(code.usedAt || '')
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `redemption-codes-${new Date().toISOString().slice(0,10)}.csv`);
    a.click();
  };

  return {
    formatDate,
    exportCodes
  };
}
