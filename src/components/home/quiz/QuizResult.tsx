
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { RocketIcon, ArrowRight } from 'lucide-react';
import { CareerPath } from './types';

interface QuizResultProps {
  careerRecommendation: CareerPath | null;
  isAuthenticated: boolean;
  onRestartQuiz: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  careerRecommendation,
  isAuthenticated,
  onRestartQuiz
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-8 border border-purple-100 dark:bg-purple-950/30 dark:border-purple-900/50"
    >
      <RocketIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
      <h3 className="text-2xl font-semibold mb-4">Your Results Are Ready!</h3>
      {isAuthenticated ? (
        careerRecommendation && (
          <>
            {careerRecommendation.icon}
            <h3 className="text-2xl font-semibold mb-4">{careerRecommendation.title}</h3>
            <p className="text-muted-foreground mb-6">
              {careerRecommendation.description}
            </p>
          </>
        )
      ) : (
        <div className="space-y-4">
          <p className="text-muted-foreground mb-6">
            Sign in to view your personalized career path recommendation
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              to="/sign-in" 
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              Get Results <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
      <div className="mt-6">
        <Button 
          onClick={onRestartQuiz}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
        >
          Take Quiz Again
        </Button>
      </div>
    </motion.div>
  );
};

export default QuizResult;
