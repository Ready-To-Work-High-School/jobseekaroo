
import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  thumbnailUrl: string;
  videoUrl: string;
  title: string;
}

const VideoPlayer = ({ thumbnailUrl, videoUrl, title }: VideoPlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        <img 
          src={thumbnailUrl} 
          alt={`${title} preview`} 
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center rounded-lg">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-blue-600 ml-1" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 z-50 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="aspect-video w-full">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoPlayer;
