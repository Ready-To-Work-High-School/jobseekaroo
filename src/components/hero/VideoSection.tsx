
import { motion } from 'framer-motion';

export const VideoSection = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-12"
    >
      {/* Gradient accent border around image */}
      <div className="p-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-amber-500">
        <div className="rounded-lg overflow-hidden shadow-xl relative">
          <img 
            src="/lovable-uploads/37c7b57e-b280-4ee0-abe9-5e3da84a418b.jpg" 
            alt="Kickstart Your Career with AI-Powered Tools!" 
            className="w-full h-auto"
          />
          {/* AI Badge */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-purple-600/90 text-white text-xs font-medium rounded-full flex items-center">
            <span className="mr-1">●</span> AI Generated
          </div>
        </div>
      </div>
    </motion.div>
  );
};
