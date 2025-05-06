import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Play, Pause, RefreshCw, Share2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface RecordingCompleteProps {
  selectedQuestion: string;
  onReset: () => void;
}

const RecordingComplete: React.FC<RecordingCompleteProps> = ({ selectedQuestion, onReset }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const { isOnline } = useNetworkStatus();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate audio loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAudioReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleShare = () => {
    if (!isOnline) {
      toast({
        title: "Offline",
        description: "You are currently offline. Please check your internet connection to share.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Share Recording",
      description: "Sharing functionality is under development.",
    });
  };

  const handleDownload = () => {
    if (!isOnline) {
      toast({
        title: "Offline",
        description: "You are currently offline. Please check your internet connection to download.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Download Recording",
      description: "Downloading functionality is under development.",
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="mb-4">
          <h4 className="text-lg font-semibold">Recording Complete!</h4>
          <p className="text-sm text-gray-500">Question: {selectedQuestion}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={togglePlay}
              disabled={isLoading || !audioReady}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <span className="ml-2 text-sm text-gray-500">
              {isLoading ? 'Loading...' : audioReady ? 'Ready' : 'Not Ready'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handleShare}
              disabled={isLoading || !audioReady}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleDownload}
              disabled={isLoading || !audioReady}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={onReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Record Again
          </Button>
          <Button variant="ghost">
            <Check className="h-4 w-4 mr-2" />
            Save Response
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecordingComplete;
