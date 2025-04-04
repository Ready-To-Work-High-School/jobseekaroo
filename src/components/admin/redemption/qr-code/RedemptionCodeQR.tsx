
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Shield, Lock } from 'lucide-react';
import { RedemptionCode } from '@/types/redemption';

interface RedemptionCodeQRProps {
  code: string;
  codeData?: RedemptionCode;
  baseUrl?: string;
  size?: number;
  withSecurityFeatures?: boolean;
}

const RedemptionCodeQR: React.FC<RedemptionCodeQRProps> = ({
  code,
  codeData,
  baseUrl = window.location.origin,
  size = 200,
  withSecurityFeatures = true
}) => {
  const [securityHash, setSecurityHash] = useState<string>("");
  const [qrValue, setQrValue] = useState<string>("");
  
  // Generate a security hash from the code and potentially other data
  useEffect(() => {
    // Simple hash function for demo purposes
    const generateHash = (input: string) => {
      return Array.from(input)
        .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
        .toString(16)
        .substring(0, 8);
    };
    
    const timestamp = new Date().toISOString();
    const hash = generateHash(code + timestamp);
    setSecurityHash(hash);
    
    // Create QR value with more security information
    const secureData = {
      code,
      hash,
      timestamp,
      oneTimeUse: true,
      ...(codeData ? { 
        type: codeData.type,
        expiresAt: codeData.expiresAt
      } : {})
    };
    
    // Create the QR value - either a simple URL or a more secure encoded payload
    if (withSecurityFeatures) {
      // Encode the data as a secure JSON payload in the URL
      const encodedData = btoa(JSON.stringify(secureData));
      setQrValue(`${baseUrl}/redemption-code?secure=${encodedData}`);
    } else {
      setQrValue(`${baseUrl}/redemption-code?code=${code}`);
    }
  }, [code, codeData, baseUrl, withSecurityFeatures]);
  
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
        <div className="bg-white p-3 rounded-md mb-3 relative">
          <QRCode
            id={`qr-code-${code}`}
            value={qrValue}
            size={size}
            level="H"
          />
          
          {withSecurityFeatures && (
            <div className="absolute -top-2 -right-2 bg-green-100 text-green-800 rounded-full p-1">
              <Shield className="h-4 w-4" />
            </div>
          )}
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm font-mono">{code}</p>
          
          {withSecurityFeatures && (
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" /> 
              <span>One-time use</span>
              <span className="ml-1 bg-slate-100 px-1 rounded font-mono">{securityHash}</span>
            </div>
          )}
          
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
