
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AudioRecorder from '@/components/audio/AudioRecorder';
import AudioPlayback from '@/components/audio/AudioPlayback';

interface RecordedAnswer {
  audioBlob: Blob;
  audioUrl: string;
  questionText: string;
}

interface InterviewQuestionCardProps {
  question: string;
  questionIndex: number;
  isRecording: boolean;
  recordedAnswer?: RecordedAnswer;
  onRecordingStart: () => void;
  onRecordingStop: () => void;
  onRecordingComplete: (audioBlob: Blob, audioUrl: string) => void;
}

const InterviewQuestionCard: React.FC<InterviewQuestionCardProps> = ({
  question,
  questionIndex,
  isRecording,
  recordedAnswer,
  onRecordingStart,
  onRecordingStop,
  onRecordingComplete
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          Interview Question {questionIndex + 1}
        </CardTitle>
        <CardDescription>Respond as if you're in a real interview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-6 rounded-lg mb-4 text-lg font-medium">
          {question}
        </div>
        
        <div className="space-y-4">
          {!recordedAnswer ? (
            <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
              {isRecording ? (
                <div className="text-center">
                  <div className="animate-pulse mb-4">
                    <div className="h-12 w-12 bg-red-500 rounded-full mx-auto flex items-center justify-center">
                      <div className="h-6 w-6 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-red-500 font-medium mb-2">Recording...</p>
                  <p className="text-sm text-muted-foreground">Speak clearly and remember to maintain good posture</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">Click to start recording your response</p>
                </div>
              )}
              <AudioRecorder 
                onRecordingComplete={onRecordingComplete}
                isRecording={isRecording}
                onRecordingStart={onRecordingStart}
                onRecordingStop={onRecordingStop}
              />
            </div>
          ) : (
            <AudioPlayback 
              audioUrl={recordedAnswer.audioUrl}
              audioBlob={recordedAnswer.audioBlob}
              questionText={recordedAnswer.questionText}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewQuestionCard;
