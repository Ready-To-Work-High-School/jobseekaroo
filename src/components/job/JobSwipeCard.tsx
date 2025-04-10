
import React from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/job';
import { formatPayRange, formatRelativeDate } from './JobCardUtils';
import { MapPin, Clock, Briefcase, ThumbsUp, X, Star, DollarSign } from 'lucide-react';
import { useFadeIn } from '@/utils/animations';

interface JobSwipeCardProps {
  job: Job;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const JobSwipeCard: React.FC<JobSwipeCardProps> = ({ job, onSwipeLeft, onSwipeRight }) => {
  const fadeIn = useFadeIn(300);
  
  return (
    <motion.div
      className={`${fadeIn} w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow`}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      whileTap={{ scale: 0.95 }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = offset.x;
        if (swipe < -100) {
          onSwipeLeft?.();
        } else if (swipe > 100) {
          onSwipeRight?.();
        }
      }}
    >
      {/* Drag indicators */}
      <motion.div 
        className="absolute top-0 left-0 bottom-0 w-full h-full pointer-events-none z-10 flex items-center justify-start pl-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileDrag={{ opacity: 0.8 }}
        style={{ x: [-100, 0] }}
        transition={{ type: "spring" }}
      >
        <div className="bg-red-500/80 rounded-full p-2">
          <X className="h-8 w-8 text-white" />
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute top-0 right-0 bottom-0 w-full h-full pointer-events-none z-10 flex items-center justify-end pr-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileDrag={{ opacity: 0.8 }}
        style={{ x: [100, 0] }}
        transition={{ type: "spring" }}
      >
        <div className="bg-green-500/80 rounded-full p-2">
          <ThumbsUp className="h-8 w-8 text-white" />
        </div>
      </motion.div>
      
      <div className="relative h-40 w-full bg-gradient-to-r from-lavender-300 to-brand-500">
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <motion.h3 
            className="font-bold text-lg"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {job.title}
          </motion.h3>
          <motion.p 
            className="text-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {job.company.name}
          </motion.p>
        </div>
        
        {/* Featured/Top job indicator */}
        {job.featured && (
          <motion.div 
            className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Star className="h-3 w-3" /> Featured
          </motion.div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 text-slate-500" />
            <span>{job.location.city}, {job.location.state}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1 text-slate-500" />
            <span>{formatRelativeDate(job.postedDate)}</span>
          </div>
        </div>
        
        <motion.div 
          className="flex items-center mb-3 text-sm bg-green-50 p-2 rounded-md"
          whileHover={{ scale: 1.02 }}
        >
          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
          <span className="text-primary font-medium">
            {formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}
          </span>
        </motion.div>
        
        <p className="text-sm line-clamp-2 text-gray-600">
          {job.description}
        </p>
        
        <div className="flex gap-2 mt-4 flex-wrap">
          <motion.div 
            className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            {job.type}
          </motion.div>
          {job.isRemote && (
            <motion.div 
              className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              Remote
            </motion.div>
          )}
          {job.isFlexible && (
            <motion.div 
              className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              Flexible
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex border-t border-gray-100">
        <motion.div 
          className="flex-1 p-3 text-center hover:bg-gray-50 cursor-pointer"
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
          onClick={() => onSwipeLeft?.()}
        >
          <span className="flex items-center justify-center gap-1">
            <X className="h-4 w-4 text-gray-500" /> Skip
          </span>
        </motion.div>
        <div className="w-px bg-gray-100" />
        <motion.div 
          className="flex-1 p-3 text-center text-primary hover:bg-primary/10 cursor-pointer"
          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
          onClick={() => onSwipeRight?.()}
        >
          <span className="flex items-center justify-center gap-1">
            <ThumbsUp className="h-4 w-4" /> Apply
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobSwipeCard;
