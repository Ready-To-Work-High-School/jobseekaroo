
import { motion } from 'framer-motion';

export const VideoSection = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-12"
    >
      <div className="p-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-amber-500">
        <div className="rounded-lg overflow-hidden shadow-xl p-6 bg-white">
          <h3 className="text-xl font-medium text-center mb-2">Video Content Coming Soon</h3>
          <p className="text-center text-muted-foreground">
            We're working on creating great video content to help you understand our platform better.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
