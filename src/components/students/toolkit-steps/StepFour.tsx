
import React, { useState } from 'react';
import { Mic, Users, MessagesSquare, Lightbulb, Video, Play, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const StepFour = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  
  const commonQuestions = [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What's your availability?",
    "What are your strengths?"
  ];
  
  const startRecording = (question: string) => {
    setSelectedQuestion(question);
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecordedVideo("mock-video-url");
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
  };
  
  const resetRecording = () => {
    setRecordedVideo(null);
    setSelectedQuestion(null);
  };
  
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
              <h5 className="font-medium">About Yourself</h5>
              <p className="text-sm text-muted-foreground">Share your background briefly</p>
            </div>
            
            <div className="space-y-1">
              <h5 className="font-medium">Why This Job?</h5>
              <p className="text-sm text-muted-foreground">Show your interest and research</p>
            </div>
            
            <div className="space-y-1">
              <h5 className="font-medium">Your Availability</h5>
              <p className="text-sm text-muted-foreground">Explain your school schedule</p>
            </div>
            
            <div className="space-y-1">
              <h5 className="font-medium">Your Strengths</h5>
              <p className="text-sm text-muted-foreground">Highlight key skills</p>
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
                <span className="text-sm">Dress professionally</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">📱</span>
                <span className="text-sm">Silence phone</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">👋</span>
                <span className="text-sm">Firm handshake, smile</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">👁️</span>
                <span className="text-sm">Maintain eye contact</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">❓</span>
                <span className="text-sm">Prepare questions</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-sm">🙏</span>
                <span className="text-sm">Thank them</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Interview Practice Recording Tool */}
      <Card className="p-4 border-primary/20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2 mb-4">
          <Video className="h-6 w-6 text-primary" />
          <h4 className="font-medium text-lg">Interview Practice</h4>
        </div>
        
        {!recordedVideo ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Record and review your interview responses.
            </p>
            
            {isRecording ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex flex-col items-center">
                    <div className="animate-pulse mb-2">
                      <Mic className="h-12 w-12 text-red-500" />
                    </div>
                    <p className="font-medium text-red-600">Recording...</p>
                    <p className="text-sm text-muted-foreground mt-1">Answering: {selectedQuestion}</p>
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={stopRecording}
                >
                  <X className="h-4 w-4 mr-2" /> Stop Recording
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-medium">Select a question:</p>
                <div className="grid grid-cols-1 gap-2">
                  {commonQuestions.map((question, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="justify-start text-left h-auto py-3" 
                      onClick={() => startRecording(question)}
                    >
                      <Play className="h-4 w-4 mr-2 text-primary" /> {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                  <Check className="h-10 w-10 text-green-500" />
                </div>
                <p className="font-medium text-green-600">Recording Complete!</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  Answered: <span className="font-medium">{selectedQuestion}</span>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="secondary" className="flex-1" onClick={resetRecording}>
                <X className="h-4 w-4 mr-2" /> Retry
              </Button>
              <Button className="flex-1 bg-primary">
                <Video className="h-4 w-4 mr-2" /> Review
              </Button>
            </div>
          </div>
        )}
      </Card>
      
      <div className="flex gap-3 p-4 bg-gradient-to-r from-primary/10 to-indigo-400/10 rounded-lg">
        <div className="flex-shrink-0">
          <Lightbulb className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h5 className="font-medium">Pro Tip</h5>
          <p className="text-sm">Use our Interview Practice tool to record and improve your responses!</p>
        </div>
      </div>
      
      <div className="flex gap-3 p-4 bg-gradient-to-r from-blue-400/10 to-teal-400/10 rounded-lg">
        <div className="flex-shrink-0">
          <MessagesSquare className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h5 className="font-medium">Virtual Interview Tips</h5>
          <p className="text-sm">Test tech, choose quiet location, dress professionally.</p>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
