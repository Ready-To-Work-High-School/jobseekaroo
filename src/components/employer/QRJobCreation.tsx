
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, QrCode, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRJobCreationProps {
  baseUrl?: string;
  size?: number;
}

const QRJobCreation: React.FC<QRJobCreationProps> = ({
  baseUrl,
  size = 200
}) => {
  // Use the correct JobSeekers4HS website URL
  const jobSeekersUrl = 'https://jobseekers4hs.org';
  const [qrValue] = useState(jobSeekersUrl);
  const { toast } = useToast();

  const downloadQRCode = () => {
    const svg = document.getElementById('job-creation-qr') as HTMLElement;
    if (!svg) return;
    
    try {
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
        downloadLink.download = 'jobseekers4hs-qr-code.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.onerror = () => {
        toast({
          title: "Download Error",
          description: "Failed to generate QR code image",
          variant: "destructive"
        });
      };
      
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    } catch (error) {
      console.error('QR code download error:', error);
      toast({
        title: "Download Error",
        description: "Failed to download QR code",
        variant: "destructive"
      });
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'JobSeekers4HS - Student Job Platform',
          text: 'Scan this QR code to access JobSeekers4HS - the premier job platform for high school students',
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
      description: "JobSeekers4HS link copied to clipboard"
    });
  };

  return (
    <Card className="w-fit mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          JobSeekers4HS Access QR Code
          <Shield className="h-4 w-4 text-green-600" />
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
            Scan to access JobSeekers4HS
          </p>
          <p className="text-xs font-mono bg-muted px-2 py-1 rounded break-all">
            {qrValue}
          </p>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <Shield className="h-3 w-3" />
            <span>Secure & Verified URL</span>
          </div>
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
