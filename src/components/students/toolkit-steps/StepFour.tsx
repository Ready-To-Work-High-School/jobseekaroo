
import React from 'react';
import { Users, MessageSquare, Clock } from 'lucide-react';

const StepFour = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Interview Preparation</h3>
      
      <div className="bg-accent/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">First Impressions Matter</h4>
        <p>Preparation builds confidence and helps you showcase your best self.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium">Research & Prepare</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Learn about the company</li>
            <li>• Understand the job role</li>
            <li>• Prepare your questions</li>
            <li>• Review your resume</li>
          </ul>
        </div>
        
        <div className="bg-green-50 dark:bg-green-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h4 className="font-medium">Practice Answers</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• "Tell me about yourself"</li>
            <li>• "Why do you want this job?"</li>
            <li>• "What are your strengths?"</li>
            <li>• "Any questions for us?"</li>
          </ul>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-950/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-medium">Day of Interview</h4>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Arrive 10-15 minutes early</li>
            <li>• Dress professionally</li>
            <li>• Bring extra resumes</li>
            <li>• Stay calm and positive</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-accent/30 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Remember</h4>
        <p className="text-sm">
          The interview is also your chance to learn about the company and see if it's a good fit for you. 
          Ask thoughtful questions about the role, team, and company culture.
        </p>
      </div>
    </div>
  );
};

export default StepFour;
