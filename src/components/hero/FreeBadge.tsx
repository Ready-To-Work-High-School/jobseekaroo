
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

export const FreeBadge = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6 inline-block"
    >
      <Badge variant="outline" className="px-4 py-1 text-lg bg-amber-50 border-amber-200 text-amber-700">
        <Award className="h-5 w-5 mr-2" />
        Free for Students
      </Badge>
    </motion.div>
  );
};
