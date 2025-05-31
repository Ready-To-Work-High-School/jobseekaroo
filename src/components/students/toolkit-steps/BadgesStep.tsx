
import React from 'react';
import { Award, Trophy, Star, Shield } from 'lucide-react';

const BadgesStep = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Career Badges</h3>
      
      <div className="bg-accent/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Showcase Your Skills & Character</h4>
        <p>Earn digital badges that demonstrate your abilities and work ethic to potential employers.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h4 className="font-medium">Skill Badges</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Communication Excellence</li>
            <li>• Customer Service Skills</li>
            <li>• Time Management</li>
            <li>• Teamwork & Collaboration</li>
            <li>• Problem Solving</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium">Character Badges</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Reliability & Punctuality</li>
            <li>• Initiative & Leadership</li>
            <li>• Positive Attitude</li>
            <li>• Work Ethic</li>
            <li>• Integrity</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <h4 className="font-medium">How to Earn Badges</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div>
            <h5 className="font-medium text-sm mb-1">Through Quizzes</h5>
            <p className="text-xs text-muted-foreground">Complete skill assessments and knowledge tests</p>
          </div>
          <div>
            <h5 className="font-medium text-sm mb-1">Employer Endorsements</h5>
            <p className="text-xs text-muted-foreground">Receive recognition from supervisors and managers</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-6 bg-gradient-to-r from-gold-50 to-purple-50 dark:from-gold-950/50 dark:to-purple-950/50 rounded-lg">
        <div className="text-center">
          <Star className="h-8 w-8 text-gold-500 mx-auto mb-2" />
          <h4 className="font-medium mb-1">Start Earning Your Badges Today!</h4>
          <p className="text-sm text-muted-foreground">
            Complete the toolkit steps and begin building your professional reputation
          </p>
        </div>
      </div>
    </div>
  );
};

export default BadgesStep;
