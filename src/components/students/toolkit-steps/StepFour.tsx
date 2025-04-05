
import React from 'react';
import { Mic, Users, MessagesSquare, Lightbulb } from 'lucide-react';

const StepFour = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Interview Preparation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Practice Questions</h4>
          </div>
          <div className="p-4 space-y-3">
            <div className="space-y-1">
              <h5 className="font-medium">Tell me about yourself.</h5>
              <p className="text-sm text-muted-foreground">Briefly share your education, interests, and why you want the job.</p>
            </div>
            
            <div className="space-y-1">
              <h5 className="font-medium">Why do you want to work here?</h5>
              <p className="text-sm text-muted-foreground">Research the company beforehand and share what interests you.</p>
            </div>
            
            <div className="space-y-1">
              <h5 className="font-medium">What's your availability?</h5>
              <p className="text-sm text-muted-foreground">Be honest about your school schedule and other commitments.</p>
            </div>
            
            <div className="space-y-1">
              <h5 className="font-medium">What are your strengths?</h5>
              <p className="text-sm text-muted-foreground">Highlight qualities relevant to the job (responsible, team player, etc.).</p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted p-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Interview Day Tips</h4>
          </div>
          <div className="p-4">
            <ul className="space-y-3">
              <li className="flex gap-2">
                <span className="font-medium text-sm">⏰</span>
                <span className="text-sm">Arrive 10-15 minutes early</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">👔</span>
                <span className="text-sm">Dress neatly and appropriately</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">📱</span>
                <span className="text-sm">Turn off your phone</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">👋</span>
                <span className="text-sm">Give a firm handshake and smile</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">👁️</span>
                <span className="text-sm">Maintain good eye contact</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">❓</span>
                <span className="text-sm">Prepare questions to ask them</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">🙏</span>
                <span className="text-sm">Thank them for their time</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 p-4 bg-gradient-to-r from-primary/10 to-indigo-400/10 rounded-lg">
        <div className="flex-shrink-0">
          <Lightbulb className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h5 className="font-medium">Did you know?</h5>
          <p className="text-sm">You can use our Interview Practice tool to record yourself answering common interview questions and get feedback on your responses!</p>
        </div>
      </div>
      
      <div className="flex gap-3 p-4 bg-gradient-to-r from-blue-400/10 to-teal-400/10 rounded-lg">
        <div className="flex-shrink-0">
          <MessagesSquare className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h5 className="font-medium">Virtual Interview Tips</h5>
          <p className="text-sm">Test your camera and microphone beforehand, choose a quiet location with good lighting, and dress professionally from head to toe.</p>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
