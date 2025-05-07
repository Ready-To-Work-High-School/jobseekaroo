
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { SparkleGroup } from '@/components/animations/Sparkle';
import { 
  Lightbulb, 
  BriefcaseIcon, 
  GraduationCap,
  Star,
  RocketIcon,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { quizQuestions } from '@/components/home/quiz/quizQuestions';
import { careerPaths } from '@/components/home/quiz/careerPaths';
import { determineCareerPath } from '@/components/home/quiz/quizUtils';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  icon: React.ReactNode;
}

const CareerQuiz = () => {
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

  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const careerRecommendation = careerPathKey ? careerPaths[careerPathKey] : null;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/30 dark:to-background">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <SparkleGroup count={5} />
        </div>
        
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="h-8 w-8 text-yellow-500" />
              <h1 className="text-4xl font-bold">Career Path Discovery Quiz</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Let's explore your interests and strengths to find your ideal career path
            </p>
          </motion.div>

          {!isSubmitted ? (
            <motion.div
              key={currentQuestion}
              variants={questionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-8 border border-purple-100 dark:bg-purple-950/30 dark:border-purple-900/50"
            >
              <div className="flex items-center gap-3 mb-6">
                {quizQuestions[currentQuestion].icon}
                <h2 className="text-2xl font-semibold">
                  {quizQuestions[currentQuestion].question}
                </h2>
              </div>

              <div className="grid gap-4">
                {quizQuestions[currentQuestion].options.map((option, index) => (
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
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-sm text-muted-foreground text-center">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-8 border border-purple-100 dark:bg-purple-950/30 dark:border-purple-900/50"
            >
              {user ? (
                careerRecommendation && (
                  <div className="text-center">
                    <RocketIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Your Career Recommendation</h2>
                    
                    <div className="flex justify-center my-6">
                      {careerRecommendation.icon}
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                      {careerRecommendation.title}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                      {careerRecommendation.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                        <h4 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Career Highlights</h4>
                        <ul className="space-y-3">
                          {careerRecommendation.highlights?.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                        <h4 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Recommended Next Steps</h4>
                        <ul className="space-y-3">
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
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                      <Link 
                        to="/jobs" 
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 transition-colors flex-1 sm:flex-grow-0 text-center"
                      >
                        Browse Related Jobs
                      </Link>
                      <Link 
                        to="/skill-development" 
                        className="px-6 py-3 border border-purple-300 dark:border-purple-700 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors flex-1 sm:flex-grow-0 text-center"
                      >
                        Explore Skills Training
                      </Link>
                    </div>
                    
                    <Button 
                      onClick={restartQuiz}
                      variant="outline"
                      className="mt-6"
                    >
                      Take Quiz Again
                    </Button>
                  </div>
                )
              ) : (
                <div className="text-center">
                  <RocketIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-4">Your Results Are Ready!</h2>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg mb-6 max-w-xl mx-auto">
                    <p className="text-amber-800 dark:text-amber-200 mb-4">
                      Sign in to view your personalized career recommendation with detailed insights and guidance.
                    </p>
                    <Link 
                      to="/sign-in" 
                      className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Get Detailed Results <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  
                  <Button 
                    onClick={restartQuiz}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                  >
                    Take Quiz Again
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CareerQuiz;
