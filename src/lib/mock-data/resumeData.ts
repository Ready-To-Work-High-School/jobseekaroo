
import { FileText, Download, Briefcase, MessageSquare, User, Award, Building2 } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export type ResumeResource = {
  title: string;
  description: string;
  type: string;
  icon: LucideIcon;
  action: string;
  url: string;
  badgeId?: string;
};

export interface ResumeTemplateData {
  id: string;
  title: string;
  description: string;
  image: string;
  pdfUrl: string;
  suitable: string[];
  skills: string[];
  color?: string;
  isPremium?: boolean;
}

export const resumeTemplates: ResumeTemplateData[] = [
  {
    id: "template-1",
    title: "Professional",
    description: "A clean, straightforward layout suitable for most industries.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/professional-template.pdf",
    suitable: ["Business", "Finance", "Management"],
    skills: ["Organization", "Communication", "Leadership"],
    color: "bg-blue-50"
  },
  {
    id: "template-2",
    title: "Creative",
    description: "A dynamic layout highlighting portfolio work and creativity.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/creative-template.pdf",
    suitable: ["Design", "Marketing", "Arts"],
    skills: ["Creativity", "Visual Design", "Innovation"],
    color: "bg-purple-50"
  },
  {
    id: "template-3",
    title: "Entry-Level",
    description: "Emphasizes skills and education for those with limited experience.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/entry-level-template.pdf",
    suitable: ["Students", "Recent Graduates", "Career Changers"],
    skills: ["Education Focus", "Adaptability", "Potential"],
    color: "bg-green-50"
  },
  {
    id: "template-4",
    title: "Technical",
    description: "Focuses on technical skills and project experience.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/technical-template.pdf",
    suitable: ["IT", "Engineering", "Development"],
    skills: ["Technical Expertise", "Problem Solving", "Project Management"],
    color: "bg-cyan-50"
  },
  {
    id: "template-5",
    title: "Executive",
    description: "Highlights leadership experience and accomplishments.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/executive-template.pdf",
    suitable: ["Directors", "VPs", "C-Suite"],
    skills: ["Leadership", "Strategic Planning", "Executive Management"],
    color: "bg-slate-50",
    isPremium: true
  },
  {
    id: "template-6",
    title: "Minimal",
    description: "Simple and elegant with focus on content over design.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/minimal-template.pdf",
    suitable: ["All Industries", "Legal", "Academic"],
    skills: ["Clarity", "Professionalism", "Directness"],
    color: "bg-gray-50"
  }
];

export const resumeResources: ResumeResource[] = [
  {
    title: "Resume Writing Guide",
    description: "Learn how to create a professional resume that highlights your skills and experience.",
    type: "PDF Guide",
    icon: FileText,
    action: "Download",
    url: "/pdf/resume-resources/resume-writing-guide.pdf"
  },
  {
    title: "Resume Templates for High School Students",
    description: "Ready-to-use templates designed specifically for students with limited work experience.",
    type: "Templates",
    icon: FileText,
    action: "Download",
    url: "/pdf/resume-resources/high-school-templates.pdf"
  },
  {
    title: "How to List Your Credentials",
    description: "Tips for effectively showcasing your Entrepreneurship Academy credentials.",
    type: "Article",
    icon: Award,
    action: "Read",
    url: "/pdf/resume-resources/listing-credentials-guide.pdf"
  },
  {
    title: "Employer Dashboard Demo",
    description: "Preview what employers see when they review your resume and credentials.",
    type: "Dashboard Demo",
    icon: Building2,
    action: "View Demo",
    url: "/employer/dashboard"
  }
];

export const interviewResources: ResumeResource[] = [
  {
    title: "Interview Preparation Guide",
    description: "Essential tips and strategies to help you prepare for job interviews and make a great impression.",
    type: "PDF Guide",
    icon: MessageSquare,
    action: "Download",
    url: "/pdf/interview-resources/interview-prep-guide.pdf"
  },
  {
    title: "Common Interview Questions",
    description: "Practice answering these frequently asked questions to prepare for your interviews.",
    type: "Guide",
    icon: MessageSquare,
    action: "Download",
    url: "/pdf/interview-resources/common-questions.pdf"
  },
  {
    title: "Employer Badge Recognition",
    description: "Learn how employers can award badges to recognize your skills and character traits.",
    type: "Feature Overview",
    icon: Award,
    action: "Learn More",
    url: "/employer/badges",
    badgeId: "achievement"
  },
  {
    title: "JS4HS Certification",
    description: "Learn about our Job Seekers for High Schools certification program and how it can benefit your career.",
    type: "Badge",
    icon: Award,
    action: "Learn More",
    url: "/programs/js4hs",
    badgeId: "js4hs"
  }
];
