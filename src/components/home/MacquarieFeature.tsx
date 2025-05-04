
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MacquarieFeature = () => {
  return (
    <motion.div 
      className="relative my-12 mx-4 md:mx-auto max-w-5xl bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-xl overflow-hidden shadow-lg border border-blue-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Macquarie Tag */}
      <div className="absolute top-4 left-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-r-full shadow-md flex items-center gap-1.5">
        <img 
          src="/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png" 
          alt="Macquarie Logo" 
          className="w-4 h-4 object-contain"
        />
        Macquarie Group
      </div>
      
      {/* Limited Spots Badge */}
      <div className="absolute top-4 right-4">
        <Badge variant="destructive" className="animate-pulse">
          Limited Spots
        </Badge>
      </div>
      
      <div className="p-6 pt-16">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-blue-100">
              <img 
                src="/lovable-uploads/56ca4b63-43dc-4b12-839f-533334c1e97e.png" 
                alt="Macquarie Group Logo" 
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-blue-800">Macquarie Group Summer Internship</h3>
              <p className="text-blue-600 font-medium">Financial Services Leadership Program</p>
            </div>
            
            <p className="text-gray-700">
              Gain hands-on experience in financial services at Macquarie Group. This internship offers exposure to investment banking, asset management, and commercial banking operations with mentorship from industry professionals.
            </p>
            
            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>Jacksonville, FL (Hybrid)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>June - August 2025</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <span>Paid Internship</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="h-4 w-4 text-blue-600" />
                <span>10 Positions Available</span>
              </div>
            </div>
            
            {/* Application Button */}
            <div className="pt-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply for Macquarie Internship
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MacquarieFeature;
