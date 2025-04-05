
import React from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/job';
import { formatPayRange, formatRelativeDate } from './JobCardUtils';
import { MapPin, Clock, Briefcase } from 'lucide-react';
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
      className={`${fadeIn} w-full bg-white rounded-xl shadow-md overflow-hidden`}
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
      <div className="relative h-40 w-full bg-gradient-to-r from-lavender-300 to-brand-500">
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h3 className="font-bold text-lg">{job.title}</h3>
          <p className="text-sm">{job.company.name}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location.city}, {job.location.state}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatRelativeDate(job.postedDate)}</span>
          </div>
        </div>
        
        <div className="flex items-center mb-3 text-sm">
          <Briefcase className="h-4 w-4 mr-1" />
          <span className="text-primary font-medium">
            {formatPayRange(job.payRate.min, job.payRate.max, job.payRate.period)}
          </span>
        </div>
        
        <p className="text-sm line-clamp-2 text-gray-600">
          {job.description}
        </p>
        
        <div className="flex gap-2 mt-4">
          <div className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
            {job.type}
          </div>
          {job.isRemote && (
            <div className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
              Remote
            </div>
          )}
          {job.isFlexible && (
            <div className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              Flexible
            </div>
          )}
        </div>
      </div>
      
      <div className="flex border-t border-gray-100">
        <motion.div 
          className="flex-1 p-3 text-center hover:bg-gray-50 cursor-pointer"
          whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          Skip
        </motion.div>
        <div className="w-px bg-gray-100" />
        <motion.div 
          className="flex-1 p-3 text-center text-primary hover:bg-primary/10 cursor-pointer"
          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
        >
          Apply
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobSwipeCard;
