
import React from 'react';
import { Calendar, Clock, Coins, Award } from 'lucide-react';

const StepFive = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">First Job Success</h3>
      
      <div className="bg-accent/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Congratulations!</h4>
        <p>You've made it to the final step - preparing for success in your first job. Here are some tips to help you shine!</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h4 className="font-medium">First Week Tips</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              <li>• Arrive early to make a good impression</li>
              <li>• Bring required documents (ID, work permit, etc.)</li>
              <li>• Take notes during training</li>
              <li>• Ask questions when you're unsure</li>
              <li>• Learn coworkers' names</li>
              <li>• Observe workplace culture</li>
              <li>• Follow instructions carefully</li>
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
              <li>• Create a schedule for school and work</li>
              <li>• Set aside dedicated study time</li>
              <li>• Use free periods at school wisely</li>
              <li>• Communicate conflicts in advance</li>
              <li>• Use a planner or calendar app</li>
              <li>• Prioritize tasks by importance</li>
              <li>• Don't overcommit yourself</li>
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
              <li>• Set up direct deposit for paychecks</li>
              <li>• Create a simple budget</li>
              <li>• Save a percentage of each paycheck</li>
              <li>• Track your expenses</li>
              <li>• Understand your pay stub</li>
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
              <li>• Be open to learning new skills</li>
              <li>• Take on additional responsibilities</li>
              <li>• Ask for feedback from supervisors</li>
              <li>• Set career goals</li>
              <li>• Look for mentorship opportunities</li>
              <li>• Consider how this job connects to your future</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-950/50 dark:to-teal-950/50 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h4 className="font-medium flex items-center gap-2 mb-2">
          <span className="text-lg">🎉</span> Toolkit Complete!
        </h4>
        <p className="text-sm">
          You've completed the First Job Toolkit! Remember that you can always come back to review any section. We wish you success in your employment journey!
        </p>
      </div>
    </div>
  );
};

export default StepFive;
