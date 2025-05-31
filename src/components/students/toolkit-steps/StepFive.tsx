
import React from 'react';
import { CheckCircle, Star, TrendingUp } from 'lucide-react';

const StepFive = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">First Job Success</h3>
      
      <div className="bg-accent/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">You Got the Job! Now What?</h4>
        <p>Your first job is a learning experience. Focus on growth and building good habits.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h4 className="font-medium">First Week Tips</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Be on time every day</li>
            <li>• Ask questions when unsure</li>
            <li>• Take notes during training</li>
            <li>• Introduce yourself to colleagues</li>
            <li>• Follow dress code guidelines</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium">Build Good Habits</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Show initiative and enthusiasm</li>
            <li>• Be reliable and consistent</li>
            <li>• Communicate professionally</li>
            <li>• Accept feedback positively</li>
            <li>• Help your team when possible</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-medium">Long-term Growth</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Set learning goals</li>
            <li>• Seek feedback regularly</li>
            <li>• Build workplace relationships</li>
            <li>• Consider future opportunities</li>
            <li>• Update your resume regularly</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-accent/30 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Remember Your Value</h4>
        <p className="text-sm">
          You bring fresh perspective, energy, and willingness to learn. Don't be afraid to contribute ideas 
          and show your unique strengths. Every successful professional started with their first job!
        </p>
      </div>
    </div>
  );
};

export default StepFive;
