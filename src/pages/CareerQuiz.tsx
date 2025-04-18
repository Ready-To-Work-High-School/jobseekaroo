
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
  RocketIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  icon: React.ReactNode;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What energizes you the most?",
    options: [
      "Solving complex problems",
      "Helping and supporting others",
      "Creating and designing things",
      "Leading and organizing teams"
    ],
    icon: <Lightbulb className="h-6 w-6 text-amber-500" />
  },
  {
    id: 2,
    question: "In a group project, what role do you naturally take?",
    options: [
      "The planner who organizes everything",
      "The creative who brings new ideas",
      "The mediator who keeps everyone happy",
      "The executor who gets things done"
    ],
    icon: <BriefcaseIcon className="h-6 w-6 text-blue-500" />
  },
  {
    id: 3,
    question: "What type of environment do you thrive in?",
    options: [
      "Fast-paced and dynamic",
      "Structured and organized",
      "Creative and flexible",
      "Collaborative and supportive"
    ],
    icon: <GraduationCap className="h-6 w-6 text-purple-500" />
  }
];

const CareerQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsSubmitted(false);
  };

  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

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
              className="text-center bg-white/80 backdrop-blur-sm shadow-lg rounded-lg p-8 border border-purple-100 dark:bg-purple-950/30 dark:border-purple-900/50"
            >
              <RocketIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Your Results Are Ready!</h2>
              <p className="text-muted-foreground mb-6">
                Based on your answers, we've identified some potential career paths that might be a great fit for you.
              </p>
              <Button 
                onClick={restartQuiz}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              >
                Take Quiz Again
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CareerQuiz;
