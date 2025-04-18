
import { RocketIcon, HeartPulse, Palette, Building, Leaf, Utensils, Construction } from 'lucide-react';
import { CareerPath } from './types';

export const careerPaths: Record<string, CareerPath> = {
  "tech": {
    title: "Tech & Innovation",
    description: "Your problem-solving skills and love for complex challenges make you perfect for technology careers like software engineering, data science, and cybersecurity.",
    icon: <RocketIcon className="h-8 w-8 text-blue-500" />
  },
  "healthcare": {
    title: "Healthcare & Support",
    description: "Your passion for helping others and collaborative nature suggests careers in nursing, counseling, social work, and healthcare administration.",
    icon: <HeartPulse className="h-8 w-8 text-emerald-500" />
  },
  "creative": {
    title: "Creative & Design",
    description: "Your innovative thinking and creative approach point towards careers in graphic design, marketing, UX/UI design, and digital media.",
    icon: <Palette className="h-8 w-8 text-purple-500" />
  },
  "leadership": {
    title: "Business & Leadership",
    description: "Your organizational skills and ability to execute make you well-suited for project management, business consulting, and entrepreneurial roles.",
    icon: <Building className="h-8 w-8 text-amber-500" />
  },
  "environment": {
    title: "Environmental Sciences",
    description: "Your care for sustainability and analytical mindset suggest careers in environmental science, conservation, renewable energy, and urban planning.",
    icon: <Leaf className="h-8 w-8 text-green-500" />
  },
  "hospitality": {
    title: "Hospitality & Culinary Arts",
    description: "Your people skills and attention to detail indicate potential in restaurant management, culinary arts, hotel administration, and event planning.",
    icon: <Utensils className="h-8 w-8 text-orange-500" />
  },
  "trades": {
    title: "Skilled Trades & Construction",
    description: "Your hands-on approach and problem-solving abilities suggest careers in electrical work, plumbing, construction management, and manufacturing.",
    icon: <Construction className="h-8 w-8 text-gray-500" />
  }
};
