
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import InterviewTypeSelector from '@/components/interview/InterviewTypeSelector';
import InterviewProgress from '@/components/interview/InterviewProgress';
import InterviewQuestionCard from '@/components/interview/InterviewQuestionCard';
import InterviewNavigation from '@/components/interview/InterviewNavigation';
import InterviewTips from '@/components/interview/InterviewTips';

const INTERVIEW_QUESTIONS = {
  entry: [
    "Tell me about yourself.",
    "Why do you want to work here?",
    "What's your availability?",
    "What are your strengths?",
    "How would you handle a difficult customer?",
    "Tell me about a time when you worked in a team.",
    "Do you have any questions for me?",
  ],
  retail: [
    "How would you handle a situation where a customer is dissatisfied with a product?",
    "Can you describe your cash handling experience?",
    "How would you prioritize tasks during a busy period?",
    "How would you respond to a customer asking for a discount?",
    "How do you stay motivated during slow periods?",
    "How would you handle a shoplifting situation?",
  ],
  food: [
    "How would you handle multiple orders coming in at once?",
    "How would you ensure food safety standards are maintained?",
    "How would you deal with a customer complaint about their meal?",
    "How do you work under time pressure?",
    "What would you do if you noticed a coworker not following hygiene protocols?",
    "How would you handle a situation where you made a mistake with a customer's order?",
  ]
};

interface RecordedAnswer {
  audioBlob: Blob;
  audioUrl: string;
  questionText: string;
}

const MockInterview = () => {
  const [category, setCategory] = useState<'entry' | 'retail' | 'food'>('entry');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingStates, setRecordingStates] = useState<{[key: number]: boolean}>({});
  const [recordedAnswers, setRecordedAnswers] = useState<{[key: number]: RecordedAnswer}>({});
  const { toast } = useToast();
  
  const questions = INTERVIEW_QUESTIONS[category];
  const isCurrentlyRecording = recordingStates[currentQuestionIndex] || false;
  
  const handleRecordingStart = () => {
    setRecordingStates(prev => ({
      ...prev,
      [currentQuestionIndex]: true
    }));
    toast({
      title: "Recording started",
      description: "Answer the question as if you're in a real interview.",
    });
  };

  const handleRecordingStop = () => {
    setRecordingStates(prev => ({
      ...prev,
      [currentQuestionIndex]: false
    }));
  };

  const handleRecordingComplete = (audioBlob: Blob, audioUrl: string) => {
    const questionText = questions[currentQuestionIndex];
    setRecordedAnswers({
      ...recordedAnswers,
      [currentQuestionIndex]: {
        audioBlob,
        audioUrl,
        questionText
      }
    });
    
    toast({
      title: "Recording complete",
      description: "Your answer has been saved. You can play it back or download it.",
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      toast({
        title: "Interview complete",
        description: "You've completed all questions for this category.",
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCategoryChange = (newCategory: 'entry' | 'retail' | 'food') => {
    setCategory(newCategory);
    setCurrentQuestionIndex(0);
    setRecordedAnswers({});
    setRecordingStates({});
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Mock Interview Simulator | Job Seekers 4 HS</title>
        <meta
          name="description"
          content="Practice your interview skills with our interactive mock interview simulator."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="p-0 mr-2">
            <Link to="/interview-prep">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Interview Prep
            </Link>
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Mock Interview Simulator</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <InterviewTypeSelector 
              category={category}
              onCategoryChange={handleCategoryChange}
            />
            
            <div className="mt-4">
              <InterviewProgress 
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
              />
            </div>
          </div>
          
          <div className="md:col-span-3">
            <InterviewQuestionCard 
              question={questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              isRecording={isCurrentlyRecording}
              recordedAnswer={recordedAnswers[currentQuestionIndex]}
              onRecordingStart={handleRecordingStart}
              onRecordingStop={handleRecordingStop}
              onRecordingComplete={handleRecordingComplete}
            />
            
            <InterviewNavigation 
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              hasRecordedAnswer={!!recordedAnswers[currentQuestionIndex]}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        </div>
        
        <InterviewTips />
      </div>
    </Layout>
  );
};

export default MockInterview;
