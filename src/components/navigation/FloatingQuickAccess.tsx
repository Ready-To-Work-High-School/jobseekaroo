
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, User, Briefcase, BookMarked, GraduationCap } from 'lucide-react';

export const FloatingQuickAccess = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white dark:bg-gray-950 shadow-lg rounded-l-lg p-4 space-y-2"
          >
            <Button asChild variant="ghost" className="w-full justify-start gap-2">
              <Link to="/profile">
                <User className="h-4 w-4" />
                My Profile
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start gap-2">
              <Link to="/student-dashboard">
                <GraduationCap className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start gap-2">
              <Link to="/saved-jobs">
                <BookMarked className="h-4 w-4" />
                Saved Jobs
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start gap-2">
              <Link to="/jobs">
                <Briefcase className="h-4 w-4" />
                Browse Jobs
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        variant="default"
        size="sm"
        className="rounded-l-lg rounded-r-none h-32 writing-vertical shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="rotate-180">Quick Access</span>
        <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
    </div>
  );
};
