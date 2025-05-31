
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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
  const { toast } = useToast();

  const handleRemoveBackground = async () => {
    setIsProcessing(true);
    try {
      // Fetch the original image
      const response = await fetch(originalImageSrc);
      const blob = await response.blob();
      
      // Load the image
      const imageElement = await loadImage(blob);
      
      // Remove background
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
        description: "There was an error processing the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
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
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Original</p>
          <img 
            src={originalImageSrc}
            alt="Original Logo"
            className="h-24 w-24 object-contain border rounded"
          />
        </div>
        
        {processedImageUrl && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Background Removed</p>
            <img 
              src={processedImageUrl}
              alt="Processed Logo"
              className="h-24 w-24 object-contain border rounded"
            />
          </div>
        )}
      </div>
      
      <Button 
        onClick={handleRemoveBackground}
        disabled={isProcessing}
        className="w-fit"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Removing Background...
          </>
        ) : (
          'Remove Background'
        )}
      </Button>
    </div>
  );
};

export default LogoBackgroundRemover;
