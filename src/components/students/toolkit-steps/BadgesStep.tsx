
import React from 'react';
import { Badge, Award, Star, Trophy } from 'lucide-react';

const BadgesStep = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Career Badges</h3>
      
      <div className="bg-accent/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Badges & Recognition</h4>
        <p>Earn badges to showcase your skills and achievements to potential employers.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Badge className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Skill Badges</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              <li>• Communication Pro</li>
              <li>• Digital Literacy</li>
              <li>• Customer Service Expert</li>
              <li>• Team Collaboration</li>
              <li>• Problem Solver</li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Achievement Badges</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              <li>• Perfect Attendance</li>
              <li>• Job Readiness</li>
              <li>• Resume Master</li>
              <li>• Interview Ace</li>
              <li>• First Job Success</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Employer Endorsements</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              <li>• Reliability</li>
              <li>• Positive Attitude</li>
              <li>• Quick Learner</li>
              <li>• Initiative Taker</li>
              <li>• Teamwork</li>
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Character Badges</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm">
              <li>• Responsibility</li>
              <li>• Adaptability</li>
              <li>• Integrity</li>
              <li>• Perseverance</li>
              <li>• Leadership</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-950/50 dark:to-indigo-950/50 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
        <h4 className="font-medium flex items-center gap-2 mb-2">
          <span className="text-lg">🏆</span> How to Earn Badges
        </h4>
        <p className="text-sm">
          Complete quizzes, get employer endorsements, finish courses, and demonstrate skills through our interactive assessments.
        </p>
      </div>
    </div>
  );
};

export default BadgesStep;
