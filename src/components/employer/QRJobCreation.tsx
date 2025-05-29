
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRJobCreationProps {
  baseUrl?: string;
  size?: number;
}

const QRJobCreation: React.FC<QRJobCreationProps> = ({
  baseUrl = window.location.origin,
  size = 200
}) => {
  const [qrValue] = useState(`${baseUrl}/quick-job-post`);
  const { toast } = useToast();

  const downloadQRCode = () => {
    const svg = document.getElementById('job-creation-qr') as HTMLElement;
    if (!svg) return;
    
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
      downloadLink.download = 'job-creation-qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quick Job Posting',
          text: 'Scan this QR code to quickly post a job on JobSeekers4HS',
          url: qrValue
        });
      } catch (error) {
        console.error('Error sharing:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrValue);
    toast({
      title: "Link Copied",
      description: "Job posting link copied to clipboard"
    });
  };

  return (
    <Card className="w-fit mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Quick Job Posting QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <QRCode
            id="job-creation-qr"
            value={qrValue}
            size={size}
            level="H"
          />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Scan to create a job posting
          </p>
          <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
            {qrValue}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={downloadQRCode}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={shareQRCode}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRJobCreation;
