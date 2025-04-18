
import React from 'react';
import { Lightbulb, BriefcaseIcon, GraduationCap } from 'lucide-react';
import { QuizQuestion } from './types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What energizes you the most?",
    options: [
      "Solving complex problems",
      "Helping and supporting others", 
      "Creating and designing things",
      "Leading and organizing teams"
    ],
    icon: React.createElement(Lightbulb, { className: "h-6 w-6 text-amber-500" })
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
    icon: React.createElement(BriefcaseIcon, { className: "h-6 w-6 text-blue-500" })
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
    icon: React.createElement(GraduationCap, { className: "h-6 w-6 text-purple-500" })
  }
];
