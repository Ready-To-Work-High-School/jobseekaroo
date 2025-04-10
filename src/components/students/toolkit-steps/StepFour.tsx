
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
    // In a real implementation, this would use the MediaRecorder API
    // For now we'll just simulate recording with a timer
    setTimeout(() => {
      // After a simulated recording time, we set a fake video URL
      setIsRecording(false);
      setRecordedVideo("mock-video-url");  // This would be a real blob URL in a complete implementation
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
      
      {/* Interview Practice Recording Tool */}
      <Card className="p-4 border-primary/20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-2 mb-4">
          <Video className="h-6 w-6 text-primary" />
          <h4 className="font-medium text-lg">Interview Practice Recorder</h4>
        </div>
        
        {!recordedVideo ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Record yourself answering common interview questions and review your responses to improve your interview skills.
            </p>
            
            {isRecording ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center p-6 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex flex-col items-center">
                    <div className="animate-pulse mb-2">
                      <Mic className="h-12 w-12 text-red-500" />
                    </div>
                    <p className="font-medium text-red-600">Recording in progress...</p>
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
                <p className="font-medium">Select a question to practice:</p>
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
                <p className="font-medium text-green-600">Recording complete!</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  You've recorded your answer to: <span className="font-medium">{selectedQuestion}</span>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="secondary" className="flex-1" onClick={resetRecording}>
                <X className="h-4 w-4 mr-2" /> Discard & Try Again
              </Button>
              <Button className="flex-1 bg-primary">
                <Video className="h-4 w-4 mr-2" /> Review Recording
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
