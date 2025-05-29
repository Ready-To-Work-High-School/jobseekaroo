
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode } from 'lucide-react';

interface QRCodeHeaderProps {
  companyName?: string;
}

const QRCodeHeader: React.FC<QRCodeHeaderProps> = ({ companyName }) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <QrCode className="h-5 w-5" />
        Secure Job Posting QR Code
      </CardTitle>
      {companyName && (
        <p className="text-sm text-muted-foreground">
          Generated for: {companyName}
        </p>
      )}
    </CardHeader>
  );
};

export default QRCodeHeader;
