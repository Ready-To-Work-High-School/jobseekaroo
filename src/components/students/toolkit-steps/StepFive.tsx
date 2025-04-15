
import React from 'react';
import { Calendar, Clock, Coins, Award } from 'lucide-react';

const StepFive = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">First Job Success</h3>
      
      <div className="bg-accent/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Congratulations!</h4>
        <p>You've completed the First Job Toolkit. Here are key tips for success!</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h4 className="font-medium">First Week Tips</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              <li>• Arrive early</li>
              <li>• Bring required documents</li>
              <li>• Take notes during training</li>
              <li>• Ask questions</li>
              <li>• Learn coworkers' names</li>
              <li>• Observe workplace culture</li>
              <li>• Follow instructions</li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Time Management</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              <li>• Balance school and work</li>
              <li>• Set study time</li>
              <li>• Use school free periods</li>
              <li>• Communicate conflicts</li>
              <li>• Use a planner</li>
              <li>• Prioritize tasks</li>
              <li>• Don't overcommit</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Money Management</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              <li>• Set up direct deposit</li>
              <li>• Create a budget</li>
              <li>• Save part of each paycheck</li>
              <li>• Track expenses</li>
              <li>• Understand pay stub</li>
              <li>• Learn about taxes</li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Growth Opportunities</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              <li>• Learn new skills</li>
              <li>• Take on extra tasks</li>
              <li>• Seek feedback</li>
              <li>• Set career goals</li>
              <li>• Find mentors</li>
              <li>• Connect to future</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-950/50 dark:to-teal-950/50 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h4 className="font-medium flex items-center gap-2 mb-2">
          <span className="text-lg">🎉</span> Congratulations!
        </h4>
        <p className="text-sm">
          You've completed the First Job Toolkit. Return anytime for guidance on your journey!
        </p>
      </div>
    </div>
  );
};

export default StepFive;
