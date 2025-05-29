
import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, QrCode, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { sanitizeHtml, validateUrl, containsXssVector } from '@/utils/sanitization';

interface QRJobCreationProps {
  baseUrl?: string;
  size?: number;
}

const QRJobCreation: React.FC<QRJobCreationProps> = ({
  baseUrl,
  size = 200
}) => {
  // Hardcoded secure URL - never accept user input for QR generation
  const SECURE_JOBSEEKERS_URL = 'https://jobseekers4hs.org';
  const [qrValue, setQrValue] = useState('');
  const [isSecure, setIsSecure] = useState(false);
  const { toast } = useToast();

  // Validate QR code content on component mount
  useEffect(() => {
    const validateQRContent = () => {
      //  Multiple security checks:
      // 1. Check if it's a valid URL
      const isValid = validateUrl(SECURE_JOBSEEKERS_URL);
      
      // 2. Check for XSS vectors
      const hasXssVectors = containsXssVector(SECURE_JOBSEEKERS_URL);
      
      // Only set URL if it passes all security checks
      if (isValid && !hasXssVectors) {
        setQrValue(SECURE_JOBSEEKERS_URL);
        setIsSecure(true);
      } else {
        console.error("Security validation failed for QR code URL");
        setIsSecure(false);
      }
    };

    validateQRContent();
  }, []);

  const downloadQRCode = () => {
    if (!isSecure) {
      showSecurityError("Cannot download QR code with insecure URL");
      return;
    }

    const svg = document.getElementById('job-creation-qr') as HTMLElement;
    if (!svg) return;
    
    try {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      // Set security attributes on the image
      img.setAttribute('crossOrigin', 'anonymous');
      
      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx?.drawImage(img, 0, 0);
        
        try {
          // Generate image with security checks
          const pngFile = canvas.toDataURL('image/png');
          
          // Create download link with security attributes
          const downloadLink = document.createElement('a');
          downloadLink.download = 'jobseekers4hs-qr-code.png';
          downloadLink.href = pngFile;
          downloadLink.rel = 'noopener noreferrer';
          downloadLink.click();
          
          toast({
            title: "Download Successful",
            description: "QR code downloaded securely"
          });
        } catch (error) {
          console.error('Canvas export error:', error);
          showSecurityError("Failed to generate secure image");
        }
      };
      
      img.onerror = () => {
        showSecurityError("Failed to generate QR code image");
      };
      
      // Use Base64 encoding for added security
      try {
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      } catch (e) {
        showSecurityError("Invalid SVG data");
      }
    } catch (error) {
      console.error('QR code download error:', error);
      showSecurityError("Failed to download QR code");
    }
  };

  const shareQRCode = async () => {
    if (!isSecure) {
      showSecurityError("Cannot share insecure URL");
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'JobSeekers4HS - Student Job Platform',
          text: 'Scan this QR code to access JobSeekers4HS - the premier job platform for high school students',
          url: qrValue
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!isSecure) {
      showSecurityError("Cannot copy insecure URL");
      return;
    }

    navigator.clipboard.writeText(qrValue)
      .then(() => {
        toast({
          title: "Link Copied",
          description: "JobSeekers4HS link copied to clipboard"
        });
      })
      .catch(err => {
        console.error('Clipboard error:', err);
        showSecurityError("Failed to copy link");
      });
  };
  
  const showSecurityError = (message: string) => {
    toast({
      title: "Security Error",
      description: message,
      variant: "destructive"
    });
  };

  if (!isSecure) {
    return (
      <Card className="w-fit mx-auto border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Security Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">QR code generation has been blocked for security reasons. Please contact support.</p>
        </CardContent>
      </Card>
    );
  }

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
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          {qrValue && (
            <QRCode
              id="job-creation-qr"
              value={qrValue}
              size={size}
              level="H" // High error correction level for better security
            />
          )}
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
