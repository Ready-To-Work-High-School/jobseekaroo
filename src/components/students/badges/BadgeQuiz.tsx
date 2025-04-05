
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { StudentBadge } from './StudentBadges';
import { Award } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

interface BadgeQuizProps {
  open: boolean;
  onClose: () => void;
  badge: StudentBadge;
  onBadgeEarned: (badgeId: string) => void;
}

const BadgeQuiz: React.FC<BadgeQuizProps> = ({ open, onClose, badge, onBadgeEarned }) => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Quiz questions for this badge
  const quizQuestions: QuizQuestion[] = [
    {
      id: '1',
      question: badge.type === 'character' ? 
        'Your manager asks you to come in for an extra shift on short notice. What would you do?' : 
        'Which project management technique helps ensure tasks are completed on time?',
      options: badge.type === 'character' ? [
        { id: 'a', text: 'Ignore the request and hope they ask someone else' },
        { id: 'b', text: 'Decline without explanation' },
        { id: 'c', text: 'Consider your schedule and respond promptly, even if you have to decline' },
        { id: 'd', text: 'Always say yes regardless of your personal commitments' }
      ] : [
        { id: 'a', text: 'Working longer hours' },
        { id: 'b', text: 'Setting deadlines and breaking tasks into manageable steps' },
        { id: 'c', text: 'Asking for extensions' },
        { id: 'd', text: 'Waiting until the last minute for adrenaline' }
      ],
      correctOptionId: badge.type === 'character' ? 'c' : 'b',
    },
    {
      id: '2',
      question: badge.type === 'character' ? 
        'A team member is struggling with their part of a project. What do you do?' : 
        'What is an effective way to prioritize tasks at work?',
      options: badge.type === 'character' ? [
        { id: 'a', text: 'Report them to the manager' },
        { id: 'b', text: 'Ignore it and focus on your own work' },
        { id: 'c', text: 'Offer to help and provide resources if you can' },
        { id: 'd', text: 'Take over their work without asking' }
      ] : [
        { id: 'a', text: 'Working on the easiest tasks first' },
        { id: 'b', text: 'Using urgency and importance to categorize tasks' },
        { id: 'c', text: 'Doing whatever your boss mentioned last' },
        { id: 'd', text: 'Ignoring deadlines completely' }
      ],
      correctOptionId: badge.type === 'character' ? 'c' : 'b',
    },
    {
      id: '3',
      question: badge.type === 'character' ? 
        'You realize you made a mistake in your work. What is your next step?' : 
        'What should you do when you receive constructive criticism?',
      options: badge.type === 'character' ? [
        { id: 'a', text: 'Hope no one notices' },
        { id: 'b', text: 'Blame someone else' },
        { id: 'c', text: 'Acknowledge it, fix it, and learn from it' },
        { id: 'd', text: 'Make excuses for why it happened' }
      ] : [
        { id: 'a', text: 'Argue and defend yourself' },
        { id: 'b', text: 'Ignore it completely' },
        { id: 'c', text: 'Take it personally and feel discouraged' },
        { id: 'd', text: 'Listen carefully and use it as an opportunity to improve' }
      ],
      correctOptionId: badge.type === 'character' ? 'c' : 'd',
    }
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption === quizQuestions[currentQuestionIndex].correctOptionId) {
      setCorrectAnswers(prev => prev + 1);
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const handleFinish = () => {
    const passThreshold = quizQuestions.length * 0.7; // 70% to pass
    const passed = correctAnswers >= passThreshold;
    
    if (passed) {
      toast({
        title: "Congratulations!",
        description: `You've earned the ${badge.name} badge.`,
      });
      onBadgeEarned(badge.id);
    } else {
      toast({
        title: "Nice try!",
        description: "You didn't quite reach the passing score. Feel free to try again!",
        variant: "destructive",
      });
    }
    
    onClose();
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setCorrectAnswers(0);
    setShowResults(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setTimeout(resetQuiz, 300);
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            {showResults ? "Quiz Results" : `${badge.name} Badge Quiz`}
          </DialogTitle>
          <DialogDescription>
            {showResults ? 
              `You scored ${correctAnswers} out of ${quizQuestions.length} questions.` : 
              `Answer these questions to earn your ${badge.name} badge.`
            }
          </DialogDescription>
        </DialogHeader>
        
        {!showResults ? (
          <div className="space-y-4">
            <div className="text-sm text-right text-muted-foreground">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </div>
            
            <div className="font-medium mb-2">
              {quizQuestions[currentQuestionIndex].question}
            </div>
            
            <RadioGroup value={selectedOption || ""} onValueChange={handleOptionSelect}>
              {quizQuestions[currentQuestionIndex].options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md">
                  <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="cursor-pointer w-full">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <DialogFooter>
              <Button
                onClick={handleNext}
                disabled={!selectedOption}
              >
                {currentQuestionIndex < quizQuestions.length - 1 ? "Next" : "Submit"}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`text-center p-4 rounded-md ${correctAnswers >= quizQuestions.length * 0.7 ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
              {correctAnswers >= quizQuestions.length * 0.7 ? (
                <h3 className="text-lg font-medium">Congratulations!</h3>
              ) : (
                <h3 className="text-lg font-medium">Keep Learning</h3>
              )}
              
              <p className="text-sm mt-1">
                {correctAnswers >= quizQuestions.length * 0.7 ? 
                  "You've earned this badge!" : 
                  "You'll need to score at least 70% to earn this badge."}
              </p>
            </div>
            
            <DialogFooter>
              <Button onClick={handleFinish}>
                {correctAnswers >= quizQuestions.length * 0.7 ? "Claim Badge" : "Try Again Later"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BadgeQuiz;
