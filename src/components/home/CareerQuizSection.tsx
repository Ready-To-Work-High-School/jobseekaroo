
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparkleGroup } from '@/components/animations/Sparkle';
import { Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { quizQuestions } from './quiz/quizQuestions';
import { careerPaths } from './quiz/careerPaths';
import { determineCareerPath } from './quiz/quizUtils';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResult from './quiz/QuizResult';

const CareerQuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [careerPathKey, setCareerPathKey] = useState<string | null>(null);
  const { user } = useAuth();

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const recommendedPath = determineCareerPath(newAnswers);
      setCareerPathKey(recommendedPath);
      setIsSubmitted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsSubmitted(false);
    setCareerPathKey(null);
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-b-lg bg-gradient-to-r from-purple-600 via-amber-500 to-blue-600 text-white font-semibold tracking-wide shadow-lg animate-pulse-slow">
        Discover Your Dream Career
      </div>

      <div className="container max-w-4xl mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold">What's Your Dream Job?</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Take this quick quiz to explore career paths that match your interests and strengths
          </p>
        </motion.div>

        {!isSubmitted ? (
          <QuizQuestion
            question={quizQuestions[currentQuestion]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion}
            totalQuestions={quizQuestions.length}
          />
        ) : (
          <QuizResult
            careerRecommendation={careerPathKey ? careerPaths[careerPathKey] : null}
            isAuthenticated={!!user}
            onRestartQuiz={restartQuiz}
          />
        )}
      </div>
    </section>
  );
};

export default CareerQuizSection;
