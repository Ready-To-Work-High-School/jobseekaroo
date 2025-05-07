
import React from 'react';
import { RocketIcon, HeartPulse, Palette, Building, Leaf, Utensils, Construction } from 'lucide-react';
import { CareerPath } from './types';

export const careerPaths: Record<string, CareerPath> = {
  "tech": {
    title: "Tech & Innovation",
    description: "Your problem-solving skills and love for complex challenges make you perfect for technology careers like software engineering, data science, and cybersecurity.",
    icon: React.createElement(RocketIcon, { className: "h-8 w-8 text-blue-500" }),
    highlights: [
      "Strong demand across many industries",
      "Higher than average starting salaries",
      "Opportunities for remote and flexible work",
      "Clear paths for advancement and specialization"
    ],
    nextSteps: [
      "Complete a coding bootcamp or online course",
      "Build a portfolio with personal projects",
      "Prepare for technical interviews",
      "Connect with tech professionals for mentorship"
    ]
  },
  "healthcare": {
    title: "Healthcare & Support",
    description: "Your passion for helping others and collaborative nature suggests careers in nursing, counseling, social work, and healthcare administration.",
    icon: React.createElement(HeartPulse, { className: "h-8 w-8 text-emerald-500" }),
    highlights: [
      "Stable employment with growing demand",
      "Meaningful work with direct impact on lives",
      "Various specialization options",
      "Clear certification and advancement paths"
    ],
    nextSteps: [
      "Research specific healthcare roles that interest you",
      "Look into certification requirements",
      "Consider our Healthcare Pathways Program",
      "Shadow professionals in your chosen field"
    ]
  },
  "creative": {
    title: "Creative & Design",
    description: "Your innovative thinking and creative approach point towards careers in graphic design, marketing, UX/UI design, and digital media.",
    icon: React.createElement(Palette, { className: "h-8 w-8 text-purple-500" }),
    highlights: [
      "Opportunity to blend art and technology",
      "Growing demand in digital economy",
      "Portfolio-based career advancement",
      "Options for freelance and entrepreneurship"
    ],
    nextSteps: [
      "Build a professional portfolio",
      "Learn industry-standard design tools",
      "Take courses in your specific design interest",
      "Connect with design communities online"
    ]
  },
  "leadership": {
    title: "Business & Leadership",
    description: "Your organizational skills and ability to execute make you well-suited for project management, business consulting, and entrepreneurial roles.",
    icon: React.createElement(Building, { className: "h-8 w-8 text-amber-500" }),
    highlights: [
      "Transferable skills across industries",
      "Clear paths for advancement",
      "Opportunities to lead teams and initiatives",
      "Balance of strategic thinking and practical execution"
    ],
    nextSteps: [
      "Take courses in business fundamentals",
      "Look for leadership opportunities in current roles",
      "Build a professional network",
      "Consider business or project management certifications"
    ]
  },
  "environment": {
    title: "Environmental Sciences",
    description: "Your care for sustainability and analytical mindset suggest careers in environmental science, conservation, renewable energy, and urban planning.",
    icon: React.createElement(Leaf, { className: "h-8 w-8 text-green-500" }),
    highlights: [
      "Growing field with increasing importance",
      "Work that contributes to global sustainability",
      "Blend of fieldwork and analytical thinking",
      "Opportunities in public and private sectors"
    ],
    nextSteps: [
      "Research specific environmental career paths",
      "Look for volunteer opportunities in conservation",
      "Consider specialized environmental certifications",
      "Connect with professionals in the field"
    ]
  },
  "hospitality": {
    title: "Hospitality & Culinary Arts",
    description: "Your people skills and attention to detail indicate potential in restaurant management, culinary arts, hotel administration, and event planning.",
    icon: React.createElement(Utensils, { className: "h-8 w-8 text-orange-500" }),
    highlights: [
      "Dynamic work environment with variety",
      "Opportunities to work globally",
      "Skills that translate to entrepreneurship",
      "Creative expression through service and presentation"
    ],
    nextSteps: [
      "Consider specialized training or certifications",
      "Gain experience through entry-level positions",
      "Build customer service and management skills",
      "Network within the hospitality industry"
    ]
  },
  "trades": {
    title: "Skilled Trades & Construction",
    description: "Your hands-on approach and problem-solving abilities suggest careers in electrical work, plumbing, construction management, and manufacturing.",
    icon: React.createElement(Construction, { className: "h-8 w-8 text-gray-500" }),
    highlights: [
      "High demand and job security",
      "Competitive wages without extensive education debt",
      "Tangible results from your work",
      "Clear apprenticeship to journeyman to master path"
    ],
    nextSteps: [
      "Research apprenticeship programs",
      "Look into trade schools and certification requirements",
      "Connect with professionals in your trade of interest",
      "Consider unions and professional organizations"
    ]
  }
};
