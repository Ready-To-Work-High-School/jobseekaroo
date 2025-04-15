
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
            <li>• Try job title variations</li>
            <li>• Filter for entry-level jobs</li>
            <li>• Search high school-friendly roles</li>
          </ul>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h4 className="font-medium">Location Matters</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Check commute distance</li>
            <li>• Explore remote options</li>
            <li>• Research local businesses</li>
            <li>• Consider transportation</li>
          </ul>
        </div>
        
        <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <CalendarClock className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h4 className="font-medium">Timing & Schedule</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Plan around school schedule</li>
            <li>• Look for weekend jobs</li>
            <li>• Check summer positions</li>
            <li>• Apply for seasonal work</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-accent/30 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Application Tips</h4>
        <ul className="space-y-2 text-sm">
          <li>• Apply to multiple positions</li>
          <li>• Follow up within a week</li>
          <li>• Customize each application</li>
          <li>• Research companies first</li>
          <li>• Use platform's "Apply" button</li>
        </ul>
      </div>
    </div>
  );
};

export default StepThree;
