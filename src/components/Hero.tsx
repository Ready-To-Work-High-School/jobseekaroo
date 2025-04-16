
import { motion } from 'framer-motion';
import { SparkleGroup } from './animations/Sparkle';
import { FreeBadge } from './hero/FreeBadge';
import { HeartIcon } from './hero/HeartIcon';
import { FeatureCards } from './hero/FeatureCards';
import { HeroButtons } from './hero/HeroButtons';
import { VideoSection } from './hero/VideoSection';
import { EmployerSection } from './hero/EmployerSection';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
      {/* Background pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] -z-10" 
      />
      
      {/* Animated sparkles */}
      <SparkleGroup count={8} />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FreeBadge />
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 relative"
          >
            <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
              Your First Job, Made Simple.
            </span>
            <HeartIcon />
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg mb-8 text-gray-600"
          >
            A safe, mobile-first platform connecting certified high school students with local businesses. Exclusive to Westside High School students in Entrepreneurship or Nursing Academy.
          </motion.p>

          <FeatureCards />
          <HeroButtons />
          <VideoSection />
          <EmployerSection />
        </div>
      </div>
    </div>
  );
};

export default Hero;
