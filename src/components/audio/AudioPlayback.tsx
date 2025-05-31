
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Download } from 'lucide-react';

interface AudioPlaybackProps {
  audioUrl: string;
  audioBlob: Blob;
  questionText: string;
}

const AudioPlayback: React.FC<AudioPlaybackProps> = ({ audioUrl, audioBlob, questionText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const downloadRecording = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `interview-response-${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-green-600 mb-2">Recording Complete!</p>
            <p className="text-sm text-muted-foreground">
              Question: {questionText}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={togglePlayback} variant="outline" size="sm">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={downloadRecording} variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayback;
