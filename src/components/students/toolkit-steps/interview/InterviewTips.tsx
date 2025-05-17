
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const InterviewTips = () => {
  return (
    <Card className="bg-blue-50 border-blue-200 overflow-hidden">
      <CardHeader className="bg-blue-100/50 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
          Interview Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 text-sm space-y-2">
        <p className="font-medium">Before the Interview:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Research the company</li>
          <li>Prepare questions to ask</li>
          <li>Plan your outfit the night before</li>
          <li>Get directions to the interview location</li>
        </ul>
        
        <p className="font-medium mt-3">During the Interview:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Make eye contact</li>
          <li>Speak clearly and confidently</li>
          <li>Use examples to support your answers</li>
          <li>Ask questions about the job and company</li>
        </ul>
        
        <p className="font-medium mt-3">After the Interview:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Send a thank-you note or email</li>
          <li>Follow up if you haven't heard back</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default InterviewTips;
