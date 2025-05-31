
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
          {/* JS4HS Logo */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5 }} 
            className="flex justify-center items-center mb-8"
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 opacity-30 blur-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                  transition: { duration: 4, repeat: Infinity, repeatType: "mirror" }
                }}
              />
              <img 
                src="/lovable-uploads/87366ebd-ac00-4f9c-b742-0a3330f31904.png" 
                alt="Job Seekers 4 High Schools Logo" 
                className="h-24 w-24 object-contain relative z-10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='7'%3E%3C/circle%3E%3Cpolyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88'%3E%3C/polyline%3E%3C/svg%3E";
                }}
              />
            </div>
          </motion.div>

          <FreeBadge />
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 relative"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl block text-blue-600 mb-2">
              Job Seekers 4 High School
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
              Your First Job, Made Simple.
            </span>
            <HeartIcon />
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }} 
            className="mb-8 text-gray-600 font-semibold text-lg"
          >
            A safe, mobile-first platform connecting certified high school students with local businesses.
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
