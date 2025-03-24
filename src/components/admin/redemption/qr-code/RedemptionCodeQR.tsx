
import React from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface RedemptionCodeQRProps {
  code: string;
  baseUrl?: string;
  size?: number;
}

const RedemptionCodeQR: React.FC<RedemptionCodeQRProps> = ({
  code,
  baseUrl = window.location.origin,
  size = 200
}) => {
  const redemptionUrl = `${baseUrl}/redemption-code?code=${code}`;
  
  const downloadQRCode = () => {
    const svg = document.getElementById(`qr-code-${code}`) as HTMLElement;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `redemption-code-${code}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  
  return (
    <Card className="w-fit">
      <CardContent className="pt-6 flex flex-col items-center">
        <div className="bg-white p-3 rounded-md mb-3">
          <QRCode
            id={`qr-code-${code}`}
            value={redemptionUrl}
            size={size}
            level="H"
          />
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm font-mono">{code}</p>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
            onClick={downloadQRCode}
          >
            <Download className="h-4 w-4 mr-2" />
            Download QR Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedemptionCodeQR;
