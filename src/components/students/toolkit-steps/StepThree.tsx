
import React from 'react';
import { Search, MapPin, CalendarClock } from 'lucide-react';

const StepThree = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Job Search Strategy</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium">Search Smart</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Use specific job titles</li>
            <li>• Try variations of terms</li>
            <li>• Filter for entry-level positions</li>
            <li>• Search for "high school" friendly jobs</li>
          </ul>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h4 className="font-medium">Location Matters</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Consider commute distance</li>
            <li>• Look for remote opportunities</li>
            <li>• Check local businesses</li>
            <li>• Think about transportation options</li>
          </ul>
        </div>
        
        <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <CalendarClock className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h4 className="font-medium">Timing & Schedule</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Consider your school schedule</li>
            <li>• Look for weekend opportunities</li>
            <li>• Check summer positions</li>
            <li>• Apply for seasonal jobs</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-accent/30 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Application Tips</h4>
        <ul className="space-y-2 text-sm">
          <li>• Apply to multiple positions to increase your chances</li>
          <li>• Follow up within a week if you haven't heard back</li>
          <li>• Customize your application for each job</li>
          <li>• Research the company before applying</li>
          <li>• Use our platform's "Apply" button to track your applications</li>
        </ul>
      </div>
    </div>
  );
};

export default StepThree;
