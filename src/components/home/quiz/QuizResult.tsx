
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { RocketIcon, ArrowRight, ChevronRight } from 'lucide-react';
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
            <div className="flex justify-center mb-4">
              {careerRecommendation.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-2">{careerRecommendation.title}</h3>
            <p className="text-muted-foreground mb-6">
              {careerRecommendation.description}
            </p>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6 text-left">
              <h4 className="font-medium text-lg mb-2">Career Path Highlights:</h4>
              <ul className="space-y-2">
                {careerRecommendation.highlights?.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6 text-left">
              <h4 className="font-medium text-lg mb-2">Recommended Next Steps:</h4>
              <ul className="space-y-2">
                {careerRecommendation.nextSteps?.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <Link 
                to="/jobs" 
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                Browse Related Jobs
              </Link>
              <Link 
                to="/skill-development" 
                className="px-4 py-2 border border-purple-300 dark:border-purple-700 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
              >
                Explore Skills Training
              </Link>
            </div>
          </>
        )
      ) : (
        <div className="space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mb-4">
            <p className="text-amber-800 dark:text-amber-200">
              Sign in to view your personalized career path recommendation with detailed insights and next steps.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link 
              to="/sign-in" 
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              Get Detailed Results <ArrowRight className="h-4 w-4" />
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
