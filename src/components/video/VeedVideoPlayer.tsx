import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface VeedVideoPlayerProps {
  videoId: string;
  title?: string;
  thumbnailUrl?: string;
  aspectRatio?: string;
}
const VeedVideoPlayer = ({
  videoId = "4e32ccc9-686f-4609-9a24-afe82be84ad6",
  title = "Interview Preparation Video",
  thumbnailUrl = "/lovable-uploads/37c7b57e-b280-4ee0-abe9-5e3da84a418b.jpg",
  // Default thumbnail
  aspectRatio = "56.25%" // 16:9 aspect ratio
}: VeedVideoPlayerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const embedUrl = `https://www.veed.io/embed/${videoId}`;
  return <>
      <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md" onClick={() => setIsOpen(true)} aria-label={`Play video: ${title}`}>
        <img src={thumbnailUrl} alt={`${title} preview`} className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105 duration-300" />
        
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-50 text-white hover:bg-white/20" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
          
          <div className="relative w-full" style={{
          paddingTop: aspectRatio
        }}>
            <iframe src={embedUrl} className="absolute top-0 left-0 w-full h-full border-0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={title}></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default VeedVideoPlayer;