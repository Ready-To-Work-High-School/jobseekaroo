
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Video, X, Play, Pause } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface RecordingCompleteProps {
  selectedQuestion: string;
  onReset: () => void;
}

const RecordingComplete = ({ selectedQuestion, onReset }: RecordingCompleteProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const { isOnline } = useNetworkStatus();
  const { toast } = useToast();

  // Simulate audio loading on component mount
  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;
    
    // Simulate loading audio data
    setIsLoading(true);
    loadingTimeout = setTimeout(() => {
      setAudioReady(true);
      setIsLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const handlePlay = () => {
    if (!isOnline) {
      toast({
        title: "Network Error",
        description: "You appear to be offline. Playback may not work properly.",
        variant: "destructive"
      });
      return;
    }
    
    if (!audioReady) {
      setIsLoading(true);
      // Simulate loading the audio
      setTimeout(() => {
        setIsLoading(false);
        setAudioReady(true);
        startPlayback();
      }, 1000);
    } else {
      startPlayback();
    }
  };

  const startPlayback = () => {
    setIsPlaying(true);
    toast({
      title: "Playing your recording",
      description: "Your recorded answer is now playing",
    });
    
    // Simulate end of playback after 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handlePause = () => {
    setIsPlaying(false);
    toast({
      title: "Paused",
      description: "Recording paused",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg border border-green-200">
        <div className="flex flex-col items-center text-center">
          <div className="mb-2">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <p className="font-medium text-green-600">Recording Complete!</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Answered: <span className="font-medium">{selectedQuestion}</span>
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="secondary" className="flex-1" onClick={onReset}>
          <X className="h-4 w-4 mr-2" /> Record Again
        </Button>
        <Button 
          className="flex-1 bg-primary"
          onClick={isPlaying ? handlePause : handlePlay}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Video className="h-4 w-4 mr-2 animate-spin" /> Loading...
            </>
          ) : isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" /> Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" /> Listen
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default RecordingComplete;
