
import { motion } from 'framer-motion';
import CanvaEmbed from '@/components/shared/CanvaEmbed';

export const VideoSection = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-12"
    >
      <div className="p-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-amber-500">
        <div className="rounded-lg overflow-hidden shadow-xl">
          <CanvaEmbed 
            designId="DAGnt7_DWQs"
            designName="Job Seekers 4 HS Introduction"
            authorName="JS4HS Team"
            aspectRatio="56.25%"
            downloadUrl="https://www.canva.com/design/DAGnt7_DWQs/wVvFyiUq8Evef8u9TqzoRw/download?utm_content=DAGnt7_DWQs&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&type=4"
          />
        </div>
      </div>
    </motion.div>
  );
};
