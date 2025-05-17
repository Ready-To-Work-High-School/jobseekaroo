
import { motion } from 'framer-motion';

export const VideoSection = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-12"
    >
      <div className="max-w-md mx-auto p-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-amber-500">
        <div className="rounded-lg overflow-hidden shadow-xl p-1 bg-white">
          <div style={{
            position: "relative",
            width: "100%",
            height: 0,
            paddingTop: "177.7778%",
            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
            overflow: "hidden",
            borderRadius: "8px",
            willChange: "transform"
          }}>
            <iframe 
              loading="lazy" 
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "none",
                padding: 0,
                margin: 0
              }}
              src="https://www.canva.com/design/DAGnuMOkAoo/Nqyj_uTxO5b16aAd3X6Fhw/watch?embed"
              allowFullScreen={true}
              allow="fullscreen"
              title="JS4HS Introduction Video"
            />
          </div>
          <div className="text-center mt-2 mb-1">
            <a 
              href="https://www.canva.com/design/DAGnuMOkAoo/Nqyj_uTxO5b16aAd3X6Fhw/watch?utm_content=DAGnuMOkAoo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd5803f3478" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Design by Coleman, Pamela Y.
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
