
import { motion } from 'framer-motion';
import VeedVideoPlayer from '@/components/video/VeedVideoPlayer';

export const VideoSection = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-12"
    >
      {/* Gradient accent border around video */}
      <div className="p-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-amber-500">
        <div className="rounded-lg overflow-hidden shadow-xl relative">
          <VeedVideoPlayer 
            videoId="4e32ccc9-686f-4609-9a24-afe82be84ad6"
            title="Kickstart Your Career with AI-Powered Tools!"
            thumbnailUrl="/lovable-uploads/37c7b57e-b280-4ee0-abe9-5e3da84a418b.jpg"
          />
        </div>
      </div>
    </motion.div>
  );
};
