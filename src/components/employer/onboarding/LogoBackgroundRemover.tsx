
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from 'lucide-react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { useToast } from '@/hooks/use-toast';

interface LogoBackgroundRemoverProps {
  originalImageSrc: string;
  onProcessedImage?: (processedImageUrl: string) => void;
}

const LogoBackgroundRemover: React.FC<LogoBackgroundRemoverProps> = ({
  originalImageSrc,
  onProcessedImage
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const { toast } = useToast();

  const handleRemoveBackground = async () => {
    setIsProcessing(true);
    setLoadingMessage('Loading AI model...');
    
    try {
      // Fetch the original image
      setLoadingMessage('Preparing image...');
      const response = await fetch(originalImageSrc);
      const blob = await response.blob();
      
      // Load the image
      const imageElement = await loadImage(blob);
      
      // Remove background
      setLoadingMessage('Processing with AI...');
      const processedBlob = await removeBackground(imageElement);
      
      // Create URL for the processed image
      const url = URL.createObjectURL(processedBlob);
      setProcessedImageUrl(url);
      
      if (onProcessedImage) {
        onProcessedImage(url);
      }
      
      toast({
        title: "Background removed successfully",
        description: "The logo background has been removed, keeping only the circular content.",
      });
    } catch (error) {
      console.error('Background removal failed:', error);
      toast({
        title: "Background removal failed",
        description: error instanceof Error ? error.message : "There was an error processing the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setLoadingMessage('');
    }
  };

  const handleDownload = () => {
    if (processedImageUrl) {
      const link = document.createElement('a');
      link.href = processedImageUrl;
      link.download = 'logo-no-background.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Clean up URL when component unmounts
  useEffect(() => {
    return () => {
      if (processedImageUrl) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, [processedImageUrl]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold text-center">Logo Background Removal</h3>
      
      <div className="flex space-x-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Original</p>
          <img 
            src={originalImageSrc}
            alt="Original Logo"
            className="h-24 w-24 object-contain border rounded shadow-sm"
          />
        </div>
        
        {processedImageUrl && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Background Removed</p>
            <img 
              src={processedImageUrl}
              alt="Processed Logo"
              className="h-24 w-24 object-contain border rounded shadow-sm"
            />
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        <Button 
          onClick={handleRemoveBackground}
          disabled={isProcessing}
          className="w-fit"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {loadingMessage || 'Processing...'}
            </>
          ) : (
            'Remove Background'
          )}
        </Button>
        
        {processedImageUrl && (
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="w-fit"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        )}
      </div>
      
      {isProcessing && (
        <p className="text-sm text-muted-foreground text-center">
          This process may take a moment as we load the AI model...
        </p>
      )}
    </div>
  );
};

export default LogoBackgroundRemover;
