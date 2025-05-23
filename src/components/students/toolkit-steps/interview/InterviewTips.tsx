
import React from 'react';
import { Lightbulb, MessagesSquare } from 'lucide-react';
import VeedVideoPlayer from '@/components/video/VeedVideoPlayer';

const InterviewTips = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 p-4 bg-gradient-to-r from-primary/10 to-indigo-400/10 rounded-lg">
        <div className="flex-shrink-0">
          <Lightbulb className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h5 className="font-medium">Pro Tip</h5>
          <p className="text-sm">Use our Interview Practice tool to record and improve your responses!</p>
        </div>
      </div>
      
      <VeedVideoPlayer 
        videoId="4e32ccc9-686f-4609-9a24-afe82be84ad6"
        title="Interview Tips and Tricks"
        thumbnailUrl="/lovable-uploads/37c7b57e-b280-4ee0-abe9-5e3da84a418b.jpg"
      />
      
      <div className="flex gap-3 p-4 bg-gradient-to-r from-blue-400/10 to-teal-400/10 rounded-lg">
        <div className="flex-shrink-0">
          <MessagesSquare className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h5 className="font-medium">Virtual Interview Tips</h5>
          <p className="text-sm">Test tech, choose quiet location, dress professionally.</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewTips;
