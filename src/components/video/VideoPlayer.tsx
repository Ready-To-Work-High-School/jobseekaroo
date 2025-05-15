
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
}

const VideoPlayer = ({ thumbnailUrl, videoUrl, title }: VideoPlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<number | null>(null);

  // Clean up interval when component unmounts
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
      }
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      if (progressInterval.current) {
        window.clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (progressInterval.current) {
          window.clearInterval(progressInterval.current);
          progressInterval.current = null;
        }
      } else {
        videoRef.current.play();
        // Update progress every 500ms
        progressInterval.current = window.setInterval(() => {
          if (videoRef.current) {
            setProgress(
              (videoRef.current.currentTime / videoRef.current.duration) * 100
            );
          }
        }, 500);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <div 
        className="relative group cursor-pointer" 
        onClick={() => setIsOpen(true)}
        aria-label={`Play video: ${title}`}
      >
        <img 
          src={thumbnailUrl} 
          alt={`${title} preview`} 
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center rounded-lg">
          <div 
            className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
            aria-hidden="true"
          >
            <Play className="w-8 h-8 text-blue-600 ml-1" />
          </div>
          {/* AI Badge */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-purple-600/90 text-white text-xs font-medium rounded-full flex items-center">
            <span className="mr-1">●</span> AI Generated
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 z-50 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="aspect-video w-full relative">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full"
              playsInline
              onClick={togglePlayPause}
              onEnded={() => setIsPlaying(false)}
            />
            
            {/* Video controls overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-center text-white">
                <h3 className="font-medium text-lg">{title}</h3>
              </div>
              
              <div className="space-y-2">
                {/* Progress bar */}
                <div className="w-full bg-gray-600 h-1 rounded overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full rounded"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/10" 
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayer;
