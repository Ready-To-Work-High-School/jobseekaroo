
import React from 'react';

const InterviewTips: React.FC = () => {
  return (
    <div className="bg-muted p-4 rounded-md mt-8">
      <h3 className="font-medium mb-2">Interview Tips</h3>
      <ul className="space-y-1 text-sm">
        <li>• Answer questions using the STAR method: Situation, Task, Action, Result</li>
        <li>• Maintain good eye contact with the interviewer</li>
        <li>• Speak clearly and at a moderate pace</li>
        <li>• Take a moment to think before answering difficult questions</li>
        <li>• Prepare 2-3 questions to ask the interviewer at the end</li>
      </ul>
    </div>
  );
};

export default InterviewTips;
