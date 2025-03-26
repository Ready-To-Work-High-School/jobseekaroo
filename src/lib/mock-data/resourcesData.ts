
import { 
  FileText, 
  BookOpen, 
  Video, 
  Download, 
  ExternalLink, 
  FileCheck, 
  Briefcase, 
  MessageSquare 
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export type Resource = {
  title: string;
  description: string;
  type: string;
  icon: LucideIcon;
  action: string;
  url: string;
};

export const resumeResources: Resource[] = [
  {
    title: "Resume Writing Guide",
    description: "Learn how to create a professional resume that highlights your skills and experience.",
    type: "PDF Guide",
    icon: FileText,
    action: "Download",
    url: "" // Empty url
  },
  {
    title: "Resume Templates for High School Students",
    description: "Ready-to-use templates designed specifically for students with limited work experience.",
    type: "Templates",
    icon: FileCheck,
    action: "Download",
    url: "" // Empty url
  },
  {
    title: "How to List Your Credentials",
    description: "Tips for effectively showcasing your Entrepreneurship Academy credentials.",
    type: "Article",
    icon: BookOpen,
    action: "Read",
    url: "" // Empty url
  },
  {
    title: "Resume Review Checklist",
    description: "A comprehensive checklist to ensure your resume is complete and error-free.",
    type: "Checklist",
    icon: FileCheck,
    action: "Download",
    url: "" // Empty url
  }
];

export const interviewResources: Resource[] = [
  {
    title: "Interview Preparation Video",
    description: "Essential tips and strategies to help you prepare for job interviews and make a great impression.",
    type: "Video",
    icon: Video,
    action: "Watch",
    url: "https://www.youtube.com/watch?v=ytckc4Gljlo"
  },
  {
    title: "Google Interview Warmup",
    description: "Practice interviewing with an interactive tool from Google that helps you prepare for interviews.",
    type: "Interactive Tool",
    icon: MessageSquare,
    action: "Use Tool",
    url: "https://grow.google/certificates/interview-warmup/"
  },
  {
    title: "Common Interview Questions",
    description: "Practice answering these frequently asked questions to prepare for your interviews.",
    type: "Guide",
    icon: MessageSquare,
    action: "View",
    url: "" // Empty url
  },
  {
    title: "What to Wear to an Interview",
    description: "Guidelines for appropriate interview attire for different types of jobs.",
    type: "Article",
    icon: BookOpen,
    action: "Read",
    url: "" // Empty url
  }
];

export const workplaceResources: Resource[] = [
  {
    title: "Workplace Etiquette Guide",
    description: "Essential tips for professional behavior in the workplace.",
    type: "PDF Guide",
    icon: FileText,
    action: "Download",
    url: "" // Empty url
  },
  {
    title: "Time Management Skills",
    description: "Strategies for balancing school and work responsibilities.",
    type: "Article",
    icon: BookOpen,
    action: "Read",
    url: "" // Empty url
  },
  {
    title: "Florida Ready to Work",
    description: "Learn essential employability skills to enhance your career readiness.",
    type: "External Resource",
    icon: ExternalLink,
    action: "Visit",
    url: "https://www.floridareadytowork.com/employability-skills"
  },
  {
    title: "Understanding Your First Paycheck",
    description: "A guide to reading your pay stub and understanding taxes and deductions.",
    type: "Guide",
    icon: FileText,
    action: "View",
    url: "" // Empty url
  }
];

export const credentialResources: Resource[] = [
  {
    title: "What is ESB Certification?",
    description: "Learn about the Entrepreneurship & Small Business certification and its benefits.",
    type: "Video",
    icon: Video,
    action: "Watch",
    url: "https://www.youtube.com/watch?v=bjjLKdTgl6g"
  },
  {
    title: "Entrepreneurship & Small Business Certification Guide",
    description: "Information about the ESB certification and how to prepare for it.",
    type: "Guide",
    icon: Briefcase,
    action: "View",
    url: "" // Empty url
  },
  {
    title: "Duval Ready Diploma Requirements",
    description: "Learn what you need to do to earn the Duval Ready Diploma designation.",
    type: "Checklist",
    icon: FileCheck,
    action: "Download",
    url: "" // Empty url
  },
  {
    title: "Industry Credentials Overview",
    description: "A comprehensive list of industry credentials available through the academy.",
    type: "List",
    icon: FileText,
    action: "View",
    url: "" // Empty url
  }
];
