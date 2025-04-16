
import { motion } from 'framer-motion';

export const VideoSection = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-12 rounded-lg overflow-hidden shadow-xl"
    >
      <iframe 
        src="https://www.veed.io/embed/a2f96110-1b4c-4e7f-bc4d-73bcb4c28a67?watermark=0&color=purple&sharing=0&title=1" 
        width="744" 
        height="504" 
        frameBorder="0" 
        title="Kickstart Your Career with Ease!" 
        className="w-full aspect-video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  );
};
