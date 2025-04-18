
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QuizQuestion as QuizQuestionType } from './types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (answer: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-8 border border-purple-100 dark:bg-purple-950/30 dark:border-purple-900/50">
      <div className="flex items-center gap-3 mb-6">
        {question.icon}
        <h3 className="text-2xl font-semibold">
          {question.question}
        </h3>
      </div>

      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              className={cn(
                "w-full text-left justify-start p-6 h-auto font-normal hover:bg-purple-50 dark:hover:bg-purple-950/50",
                "border-purple-100 dark:border-purple-900/50"
              )}
              onClick={() => onAnswer(option)}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-sm text-muted-foreground text-center">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
    </div>
  );
};

export default QuizQuestion;
