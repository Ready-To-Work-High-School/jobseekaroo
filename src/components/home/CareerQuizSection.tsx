import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparkleGroup } from '@/components/animations/Sparkle';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Lightbulb, 
  BriefcaseIcon, 
  GraduationCap,
  Star,
  RocketIcon,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  icon: React.ReactNode;
}

interface CareerPath {
  title: string;
  description: string;
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

const careerPaths: Record<string, CareerPath> = {
  "tech": {
    title: "Tech & Innovation",
    description: "Your problem-solving skills and love for complex challenges make you perfect for technology careers like software engineering, data science, and cybersecurity.",
    icon: <RocketIcon className="h-8 w-8 text-blue-500" />
  },
  "healthcare": {
    title: "Healthcare & Support",
    description: "Your passion for helping others and collaborative nature suggests careers in nursing, counseling, social work, and healthcare administration.",
    icon: <Star className="h-8 w-8 text-emerald-500" />
  },
  "creative": {
    title: "Creative & Design",
    description: "Your innovative thinking and creative approach point towards careers in graphic design, marketing, UX/UI design, and digital media.",
    icon: <Lightbulb className="h-8 w-8 text-purple-500" />
  },
  "leadership": {
    title: "Business & Leadership",
    description: "Your organizational skills and ability to execute make you well-suited for project management, business consulting, and entrepreneurial roles.",
    icon: <BriefcaseIcon className="h-8 w-8 text-amber-500" />
  }
};

const CareerQuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [careerRecommendation, setCareerRecommendation] = useState<CareerPath | null>(null);
  const { user } = useAuth();

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      determineCareerPath(newAnswers);
      setIsSubmitted(true);
    }
  };

  const determineCareerPath = (quizAnswers: string[]) => {
    const careerPathScores = {
      "tech": 0,
      "healthcare": 0,
      "creative": 0,
      "leadership": 0
    };

    quizAnswers.forEach(answer => {
      if (answer.includes("complex problems") || answer.includes("executor")) {
        careerPathScores["tech"]++;
      }
      if (answer.includes("supporting others") || answer.includes("collaborative")) {
        careerPathScores["healthcare"]++;
      }
      if (answer.includes("creating") || answer.includes("creative")) {
        careerPathScores["creative"]++;
      }
      if (answer.includes("organizing") || answer.includes("leading")) {
        careerPathScores["leadership"]++;
      }
    });

    const topCareerPath = Object.entries(careerPathScores).reduce(
      (a, b) => (b[1] > a[1] ? b : a)
    )[0] as keyof typeof careerPaths;

    setCareerRecommendation(careerPaths[topCareerPath]);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsSubmitted(false);
    setCareerRecommendation(null);
  };

  const questionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
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
              <h3 className="text-2xl font-semibold">
                {quizQuestions[currentQuestion].question}
              </h3>
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
            <h3 className="text-2xl font-semibold mb-4">Your Results Are Ready!</h3>
            {user ? (
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
                onClick={restartQuiz}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              >
                Take Quiz Again
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CareerQuizSection;
