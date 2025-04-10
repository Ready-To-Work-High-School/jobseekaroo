
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send, User, Bot, Upload, FileText, DownloadCloud, Sparkles, Layout, Coffee } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile } from "@/types/user";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  { 
    role: "assistant", 
    content: "Hello! I'm your resume assistant. I can help you write, review, or improve your resume. What would you like help with today?" 
  }
];

const RESUME_SUGGESTIONS = [
  "How do I highlight my skills effectively?",
  "Review my experience section",
  "Help me write a strong summary",
  "What should I include in my education section?",
  "How can I tailor my resume for a specific job?",
  "Analyze my resume for keywords",
  "Help me quantify my achievements",
  "What skills should I include as a [job role]?",
];

const ADVANCED_COMMANDS = [
  "Generate a cover letter based on my resume",
  "Rewrite my job descriptions with action verbs",
  "Suggest keywords for ATS optimization",
  "Format my resume for a [specific industry]",
  "Create a LinkedIn summary from my resume",
];

// Resume templates configuration
const RESUME_TEMPLATES = [
  { 
    id: "professional", 
    name: "Professional",
    color: "#1e40af",
    fontTitle: "Helvetica",
    fontBody: "Helvetica",
    description: "Clean, traditional design suitable for corporate environments"
  },
  { 
    id: "creative", 
    name: "Creative",
    color: "#047857", 
    fontTitle: "Helvetica",
    fontBody: "Helvetica",
    description: "Modern design with visual elements for creative industries"
  },
  { 
    id: "academic", 
    name: "Academic",
    color: "#7c3aed", 
    fontTitle: "Times",
    fontBody: "Times",
    description: "Formal layout emphasizing education and publications"
  },
  { 
    id: "minimalist", 
    name: "Minimalist",
    color: "#475569", 
    fontTitle: "Helvetica",
    fontBody: "Helvetica",
    description: "Simple design with focus on content and readability"
  }
];

const ResumeChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUploadedResume, setHasUploadedResume] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<{ data: any, template: string } | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("professional");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // If user profile is loaded and has skills, customize initial message
    if (userProfile?.skills?.length) {
      const skillsList = userProfile.skills.join(", ");
      const updatedInitialMessage = { 
        role: "assistant" as const, 
        content: `Hello! I'm your resume assistant. I notice you have skills in ${skillsList}. How can I help you improve your resume today?` 
      };
      setMessages([updatedInitialMessage]);
    }
  }, [userProfile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let response = "";
      
      // Generate a contextual response based on the user's input
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes("skills")) {
        response = "To highlight your skills effectively:\n\n1. List technical skills relevant to the position\n2. Include soft skills with examples of how you've demonstrated them\n3. Organize skills by proficiency level\n4. Prioritize skills mentioned in the job description\n5. Use concrete examples where possible";
      } else if (lowercaseInput.includes("experience")) {
        response = "For your experience section:\n\n• Use action verbs to start bullet points\n• Quantify achievements where possible (e.g., 'Increased sales by 20%')\n• Focus on accomplishments rather than responsibilities\n• Tailor experiences to highlight relevance to the target position\n• Include 3-5 bullet points per role";
      } else if (lowercaseInput.includes("summary") || lowercaseInput.includes("profile")) {
        response = "A strong summary should:\n\n• Be 3-4 sentences maximum\n• Highlight your years of experience and professional identity\n• Mention 1-2 key achievements\n• Include your career goals as they relate to the position\n• Incorporate relevant keywords from the job description";
      } else if (lowercaseInput.includes("education")) {
        response = "In your education section:\n\n• List degrees in reverse chronological order\n• Include institution name, location, degree, and graduation date\n• Add relevant coursework, academic achievements, and GPA if it's above 3.5\n• Include certifications and professional development\n• For recent graduates, place education before experience";
      } else if (lowercaseInput.includes("tailor") || lowercaseInput.includes("specific job")) {
        response = "To tailor your resume for a specific job:\n\n1. Analyze the job description for keywords\n2. Reorder your skills to prioritize what's mentioned first in the listing\n3. Modify your professional summary to match the job requirements\n4. Highlight experiences most relevant to the position\n5. Use similar language/terminology as the job posting";
      } else if (lowercaseInput.includes("keywords") || lowercaseInput.includes("ats")) {
        response = "For ATS optimization:\n\n• Include exact keywords from the job description\n• Use standard section headings (Experience, Education, Skills)\n• Avoid tables, images, or special characters\n• Use a clean, simple format\n• Submit in .docx or .pdf format as specified in the application\n• Include both spelled-out terms and acronyms (e.g., 'Search Engine Optimization (SEO)')";
      } else if (lowercaseInput.includes("cover letter")) {
        response = "For an effective cover letter:\n\n1. Address the hiring manager by name if possible\n2. Open with a compelling introduction that shows your enthusiasm\n3. Highlight 2-3 key achievements from your resume that match the job\n4. Explain why you're interested in both the role and the company\n5. Close with a call to action and express interest in an interview\n6. Keep it to one page with 3-4 paragraphs";
      } else if (lowercaseInput.includes("achievements") || lowercaseInput.includes("quantify")) {
        response = "To quantify achievements:\n\n• Add numbers to show scale (e.g., 'Managed a team of 12 employees')\n• Include percentages for improvements (e.g., 'Increased efficiency by 25%')\n• Add dollar amounts for budgets or revenue (e.g., 'Managed $500K annual budget')\n• Mention timeframes (e.g., 'Completed project 2 weeks ahead of schedule')\n• Include frequency (e.g., 'Processed 200+ customer requests weekly')";
      } else if (lowercaseInput.includes("upload") || lowercaseInput.includes("review my resume")) {
        response = "I'd be happy to review your existing resume. Click the upload button below the chat to upload your current resume, and I'll provide specific feedback on how to improve it.";
      } else if (lowercaseInput.includes("template") || lowercaseInput.includes("design") || lowercaseInput.includes("format")) {
        response = "I can help you choose the right template for your resume. We offer several professionally designed templates:\n\n• Professional: Clean design ideal for corporate roles\n• Creative: Modern layout for design and marketing positions\n• Academic: Format optimized for research and teaching positions\n• Minimalist: Simple, elegant design that focuses on content\n\nWhich style interests you most?";
      } else if (lowercaseInput.includes("generate") || lowercaseInput.includes("create") || lowercaseInput.includes("make") || lowercaseInput.includes("build")) {
        // Generate a resume based on the user profile
        await generateResumeFromProfile(selectedTemplate);
        response = `I've created a draft ${RESUME_TEMPLATES.find(t => t.id === selectedTemplate)?.name || "Professional"} resume based on your profile information. Here are some recommendations to complete it:\n\n1. Add more specific achievements to your work experience\n2. Consider adding certifications if you have any\n3. Include a link to your portfolio or LinkedIn profile\n\nYou can download the draft resume using the button at the top of this chat or try a different template if you prefer a different style.`;
      } else {
        response = "I'd be happy to help with your resume. Could you provide more specific details about what you're looking for assistance with? For example:\n\n• Reviewing a specific section\n• Crafting better bullet points\n• Highlighting certain skills or experiences\n• Tailoring your resume for a particular position\n• Choosing a template design that stands out";
      }
      
      // Add personalization if user profile exists
      if (userProfile?.skills?.length && lowercaseInput.includes("skills")) {
        const userSkills = userProfile.skills.join(", ");
        response += `\n\nI see that you already have these skills listed: ${userSkills}. Consider adding specific examples of how you've applied these skills in your past roles.`;
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleUploadResume = () => {
    // Trigger file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    setIsUploading(true);
    
    // Check if the file is a PDF or Word document
    if (!file.type.includes('pdf') && !file.type.includes('word')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      setIsUploading(false);
      return;
    }
    
    // Simulate file processing
    setTimeout(() => {
      setIsUploading(false);
      setHasUploadedResume(true);
      
      toast({
        title: "Resume Uploaded",
        description: "Your resume has been uploaded and is being analyzed.",
      });
      
      // Simulate AI response to uploaded resume
      setTimeout(() => {
        const analysisResponse = "I've analyzed your resume and here are my observations:\n\n1. Your summary could be more impactful by highlighting specific achievements\n2. Your job descriptions focus too much on responsibilities and not enough on accomplishments\n3. Consider adding more industry keywords to pass ATS systems\n4. Your skills section could be better organized by categories\n5. Education section looks good but could use minor formatting improvements\n\nWould you like me to help with any specific section?";
        
        setMessages(prev => [...prev, { role: "assistant", content: analysisResponse }]);
      }, 2000);
    }, 2000);
  };

  const generateResumeFromProfile = async (template: string) => {
    setIsGeneratingPdf(true);
    
    try {
      // In a real app, we would make an API call to generate the resume
      // For now, we'll create a simple data structure based on userProfile
      const resumeData = {
        personalInfo: {
          firstName: userProfile?.first_name || "John",
          lastName: userProfile?.last_name || "Doe",
          email: userProfile?.email || "email@example.com",
          phone: userProfile?.contact_details_encrypted ? "Retrieved from encrypted data" : "(123) 456-7890",
          location: userProfile?.location || "City, State",
          title: userProfile?.job_title || "Professional" // Using job_title instead of title
        },
        skills: userProfile?.skills || ["Communication", "Problem Solving", "Teamwork"],
        experience: [
          {
            title: userProfile?.job_title || "Job Title",
            company: userProfile?.company_name || "Company Name",
            location: userProfile?.location || "City, State",
            startDate: "2020-01",
            endDate: "Present",
            description: "• Collaborated with cross-functional teams to achieve project goals\n• Implemented new processes that improved efficiency by 15%\n• Managed client relationships and resolved customer issues"
          }
        ],
        education: [
          {
            institution: userProfile?.bio ? userProfile.bio.split(" ").slice(0, 2).join(" ") + " University" : "University Name", // Using part of bio as a fallback for school
            degree: "Degree",
            field: "Field of Study",
            startDate: "2016-09",
            endDate: "2020-05"
          }
        ]
      };
      
      // Store the generated resume data
      setGeneratedResume({
        data: resumeData,
        template: template
      });
      
      setHasUploadedResume(true);
    } catch (error) {
      console.error("Error generating resume:", error);
      toast({
        title: "Error",
        description: "Failed to generate resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const downloadGeneratedResume = async () => {
    if (!generatedResume) {
      // If we have uploaded a resume but haven't generated one, create a sample
      await generateResumeFromProfile(selectedTemplate);
    }
    
    setIsGeneratingPdf(true);
    
    try {
      // Get selected template configuration
      const templateConfig = RESUME_TEMPLATES.find(t => t.id === (generatedResume?.template || selectedTemplate)) || RESUME_TEMPLATES[0];
      
      const doc = new jsPDF();
      const data = generatedResume?.data || {
        personalInfo: {
          firstName: userProfile?.first_name || "John",
          lastName: userProfile?.last_name || "Doe",
          email: userProfile?.email || "email@example.com",
          phone: userProfile?.contact_details_encrypted ? "Retrieved from encrypted data" : "(123) 456-7890",
          location: userProfile?.location || "City, State",
          title: userProfile?.job_title || "Professional" // Using job_title instead of title
        },
        skills: userProfile?.skills || ["Communication", "Problem Solving", "Teamwork"],
        experience: [
          {
            title: userProfile?.job_title || "Job Title",
            company: userProfile?.company_name || "Company Name",
            location: userProfile?.location || "City, State",
            startDate: "2020-01",
            endDate: "Present",
            description: "• Implemented new processes\n• Managed client relationships\n• Collaborated with teams"
          }
        ],
        education: [
          {
            institution: userProfile?.bio ? userProfile.bio.split(" ").slice(0, 2).join(" ") + " University" : "University Name", // Using part of bio as a fallback for school
            degree: "Degree",
            field: "Field of Study",
            startDate: "2016-09",
            endDate: "2020-05"
          }
        ]
      };
      
      // Add content to PDF with visual enhancements based on selected template
      const fullName = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`;
      const themeColor = templateConfig.color;
      
      // Add visual header based on template
      if (templateConfig.id === "creative") {
        // Creative template has a side bar with color
        doc.setFillColor(themeColor);
        doc.rect(0, 0, 60, 297, "F");
        
        doc.setTextColor(255, 255, 255);
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(16);
        doc.text("CONTACT", 20, 60, { align: "center" });
        
        doc.setFont(templateConfig.fontBody, "normal");
        doc.setFontSize(9);
        doc.text("Email:", 20, 70, { align: "center" });
        doc.text(data.personalInfo.email, 20, 75, { align: "center" });
        doc.text("Phone:", 20, 85, { align: "center" });
        doc.text(data.personalInfo.phone, 20, 90, { align: "center" });
        doc.text("Location:", 20, 100, { align: "center" });
        doc.text(data.personalInfo.location, 20, 105, { align: "center" });
        
        doc.setTextColor(255, 255, 255);
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(16);
        doc.text("SKILLS", 20, 125, { align: "center" });
        
        doc.setFont(templateConfig.fontBody, "normal");
        doc.setFontSize(9);
        let skillY = 135;
        data.skills.forEach(skill => {
          doc.text(skill, 20, skillY, { align: "center" });
          skillY += 7;
        });
        
        // Main content area
        doc.setTextColor(0, 0, 0);
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(24);
        doc.text(fullName, 140, 25, { align: "center" });
        
        doc.setFontSize(16);
        doc.setFont(templateConfig.fontBody, "italic");
        doc.text(data.personalInfo.title, 140, 35, { align: "center" });
        
        doc.setDrawColor(themeColor);
        doc.setLineWidth(1);
        doc.line(70, 45, 210, 45);
        
        // Experience section
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(16);
        doc.text("EXPERIENCE", 140, 60);
        
        let expY = 70;
        data.experience.forEach(job => {
          doc.setFont(templateConfig.fontTitle, "bold");
          doc.setFontSize(12);
          doc.text(job.title, 70, expY);
          
          doc.setFont(templateConfig.fontBody, "normal");
          doc.setFontSize(11);
          doc.text(`${job.company}, ${job.location}`, 70, expY + 7);
          
          doc.setFont(templateConfig.fontBody, "italic");
          doc.setFontSize(10);
          doc.text(`${job.startDate} to ${job.endDate}`, 70, expY + 14);
          
          doc.setFont(templateConfig.fontBody, "normal");
          const descLines = doc.splitTextToSize(job.description, 135);
          doc.text(descLines, 70, expY + 22);
          
          expY += 45;
        });
        
        // Education section
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(16);
        doc.text("EDUCATION", 140, expY);
        
        expY += 10;
        data.education.forEach(edu => {
          doc.setFont(templateConfig.fontTitle, "bold");
          doc.setFontSize(12);
          doc.text(`${edu.degree} in ${edu.field}`, 70, expY);
          
          doc.setFont(templateConfig.fontBody, "normal");
          doc.setFontSize(11);
          doc.text(`${edu.institution}`, 70, expY + 7);
          
          doc.setFont(templateConfig.fontBody, "italic");
          doc.setFontSize(10);
          doc.text(`${edu.startDate} to ${edu.endDate}`, 70, expY + 14);
          
          expY += 25;
        });
      } else if (templateConfig.id === "minimalist") {
        // Minimalist template with clean typography
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(26);
        doc.text(fullName, 20, 20);
        
        doc.setFontSize(14);
        doc.setFont(templateConfig.fontBody, "normal");
        doc.text(data.personalInfo.title, 20, 30);
        
        doc.setDrawColor(100, 100, 100);
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);
        
        // Contact info in a single line
        doc.setFontSize(9);
        doc.text(`${data.personalInfo.email} • ${data.personalInfo.phone} • ${data.personalInfo.location}`, 105, 42, { align: "center" });
        
        // Experience section
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(14);
        doc.text("EXPERIENCE", 20, 55);
        
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(20, 58, 190, 58);
        
        let yPos = 65;
        data.experience.forEach(job => {
          doc.setFont(templateConfig.fontTitle, "bold");
          doc.setFontSize(12);
          doc.text(job.title, 20, yPos);
          
          doc.setFont(templateConfig.fontBody, "normal");
          doc.text(`${job.company}, ${job.location}`, 20, yPos + 7);
          
          doc.setFont(templateConfig.fontBody, "italic");
          doc.setFontSize(10);
          doc.text(`${job.startDate} to ${job.endDate}`, 170, yPos, { align: "right" });
          
          doc.setFont(templateConfig.fontBody, "normal");
          const descLines = doc.splitTextToSize(job.description, 170);
          doc.text(descLines, 20, yPos + 15);
          
          yPos += 35;
        });
        
        // Education section
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(14);
        doc.text("EDUCATION", 20, yPos);
        
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(20, yPos + 3, 190, yPos + 3);
        
        yPos += 10;
        data.education.forEach(edu => {
          doc.setFont(templateConfig.fontTitle, "bold");
          doc.setFontSize(12);
          doc.text(`${edu.degree} in ${edu.field}`, 20, yPos);
          
          doc.setFont(templateConfig.fontBody, "normal");
          doc.text(`${edu.institution}`, 20, yPos + 7);
          
          doc.setFont(templateConfig.fontBody, "italic");
          doc.setFontSize(10);
          doc.text(`${edu.startDate} to ${edu.endDate}`, 170, yPos, { align: "right" });
          
          yPos += 15;
        });
        
        // Skills section
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(14);
        doc.text("SKILLS", 20, yPos + 10);
        
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(20, yPos + 13, 190, yPos + 13);
        
        doc.setFont(templateConfig.fontBody, "normal");
        doc.setFontSize(11);
        doc.text(data.skills.join(" • "), 20, yPos + 22);
      } else if (templateConfig.id === "academic") {
        // Academic template with formal layout
        doc.setFont("Times", "bold");
        doc.setFontSize(18);
        doc.text(fullName, 105, 20, { align: "center" });
        
        doc.setFontSize(12);
        doc.text(data.personalInfo.title, 105, 28, { align: "center" });
        
        doc.setFont("Times", "normal");
        doc.setFontSize(11);
        doc.text(data.personalInfo.email, 70, 36);
        doc.text(data.personalInfo.phone, 140, 36);
        doc.text(data.personalInfo.location, 105, 42, { align: "center" });
        
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.line(20, 46, 190, 46);
        
        // Education section first (academic focus)
        doc.setFont("Times", "bold");
        doc.setFontSize(14);
        doc.text("EDUCATION", 20, 56);
        
        let yPos = 66;
        data.education.forEach(edu => {
          doc.setFont("Times", "bold");
          doc.setFontSize(12);
          doc.text(`${edu.degree} in ${edu.field}`, 20, yPos);
          
          doc.setFont("Times", "normal");
          doc.text(`${edu.institution}`, 20, yPos + 6);
          doc.text(`${edu.startDate} to ${edu.endDate}`, 20, yPos + 12);
          
          yPos += 20;
        });
        
        // Experience section
        doc.setFont("Times", "bold");
        doc.setFontSize(14);
        doc.text("PROFESSIONAL EXPERIENCE", 20, yPos + 10);
        
        yPos += 20;
        data.experience.forEach(job => {
          doc.setFont("Times", "bold");
          doc.setFontSize(12);
          doc.text(job.title, 20, yPos);
          
          doc.setFont("Times", "italic");
          doc.text(`${job.company}, ${job.location}`, 20, yPos + 6);
          
          doc.setFont("Times", "normal");
          doc.text(`${job.startDate} to ${job.endDate}`, 20, yPos + 12);
          
          const descLines = doc.splitTextToSize(job.description, 170);
          doc.text(descLines, 30, yPos + 20);
          
          yPos += 40;
        });
        
        // Skills section
        doc.setFont("Times", "bold");
        doc.setFontSize(14);
        doc.text("SKILLS AND COMPETENCIES", 20, yPos + 10);
        
        doc.setFont("Times", "normal");
        doc.setFontSize(12);
        doc.text(data.skills.join(", "), 20, yPos + 20, { maxWidth: 170 });
      } else {
        // Professional (default) template
        // Header with name and title
        doc.setFillColor(themeColor);
        doc.rect(0, 0, 210, 40, "F");
        
        doc.setTextColor(255, 255, 255);
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.setFontSize(24);
        doc.text(fullName, 105, 20, { align: "center" });
        
        doc.setFontSize(14);
        doc.setFont(templateConfig.fontBody, "normal");
        doc.text(data.personalInfo.title, 105, 30, { align: "center" });
        
        // Contact info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(`Email: ${data.personalInfo.email}`, 20, 50);
        doc.text(`Phone: ${data.personalInfo.phone}`, 20, 58);
        doc.text(`Location: ${data.personalInfo.location}`, 20, 66);
        
        // Skills section
        doc.setFontSize(16);
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.text("Skills", 20, 85);
        
        doc.setDrawColor(themeColor);
        doc.setLineWidth(1);
        doc.line(20, 88, 190, 88);
        
        doc.setFont(templateConfig.fontBody, "normal");
        doc.setFontSize(11);
        doc.text(data.skills.join(" • "), 20, 98, { maxWidth: 170 });
        
        // Experience section
        doc.setFontSize(16);
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.text("Experience", 20, 118);
        
        doc.setDrawColor(themeColor);
        doc.setLineWidth(1);
        doc.line(20, 121, 190, 121);
        
        let yPos = 131;
        data.experience.forEach(job => {
          doc.setFontSize(14);
          doc.setFont(templateConfig.fontTitle, "bold");
          doc.text(`${job.title}`, 20, yPos);
          
          doc.setFontSize(12);
          doc.setFont(templateConfig.fontBody, "normal");
          doc.text(`${job.company}, ${job.location}`, 20, yPos + 8);
          
          doc.setFontSize(10);
          doc.setFont(templateConfig.fontBody, "italic");
          doc.text(`${job.startDate} to ${job.endDate}`, 20, yPos + 16);
          
          doc.setFont(templateConfig.fontBody, "normal");
          const descLines = doc.splitTextToSize(job.description, 170);
          doc.text(descLines, 20, yPos + 26);
          
          yPos += 46;
        });
        
        // Education section
        doc.setFontSize(16);
        doc.setFont(templateConfig.fontTitle, "bold");
        doc.text("Education", 20, yPos);
        
        doc.setDrawColor(themeColor);
        doc.setLineWidth(1);
        doc.line(20, yPos + 3, 190, yPos + 3);
        
        yPos += 13;
        data.education.forEach(edu => {
          doc.setFontSize(14);
          doc.setFont(templateConfig.fontTitle, "bold");
          doc.text(`${edu.degree} in ${edu.field}`, 20, yPos);
          
          doc.setFontSize(12);
          doc.setFont(templateConfig.fontBody, "normal");
          doc.text(`${edu.institution}`, 20, yPos + 8);
          
          doc.setFontSize(10);
          doc.setFont(templateConfig.fontBody, "italic");
          doc.text(`${edu.startDate} to ${edu.endDate}`, 20, yPos + 16);
          
          yPos += 25;
        });
      }
      
      // Save the PDF
      const pdfName = `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      doc.save(pdfName);
      
      toast({
        title: "Resume Downloaded",
        description: "Your resume has been successfully downloaded.",
      });
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast({
        title: "Download Failed",
        description: "Failed to download resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const generateResume = (template: string) => {
    setSelectedTemplate(template);
    const templateName = RESUME_TEMPLATES.find(t => t.id === template)?.name || template;
    
    toast({
      title: "Generating Resume",
      description: `Creating a ${templateName} resume based on your profile information.`,
    });
    
    // Generate resume based on template
    generateResumeFromProfile(template).then(() => {
      const generateResponse = `I've created a draft ${templateName} resume based on your profile information. Here are some recommendations to complete it:\n\n1. Add more specific achievements to your work experience\n2. Consider adding certifications if you have any\n3. Include a link to your portfolio or LinkedIn profile\n\nYou can download the draft resume using the button at the top of this chat.`;
      
      setMessages(prev => [...prev, { role: "assistant", content: generateResponse }]);
    });
  };

  return (
    <div className="flex flex-col h-[70vh] rounded-lg border shadow-sm">
      <div className="bg-muted p-3 border-b flex justify-between items-center">
        <h3 className="font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" /> Resume AI Assistant
        </h3>
        <div className="flex gap-2">
          {hasUploadedResume && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex gap-1 items-center text-xs"
              onClick={downloadGeneratedResume}
              disabled={isGeneratingPdf}
            >
              {isGeneratingPdf ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <DownloadCloud className="h-3.5 w-3.5" />
              )}
              Download Resume
            </Button>
          )}
          <Button 
            size="sm" 
            variant="outline" 
            className="flex gap-1 items-center text-xs"
            onClick={handleUploadResume}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            Upload Resume
          </Button>
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="text-xs flex gap-1 items-center">
                <Layout className="h-3.5 w-3.5" />
                Templates
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {RESUME_TEMPLATES.map((template) => (
                <DropdownMenuItem 
                  key={template.id} 
                  onClick={() => generateResume(template.id)}
                  className="flex gap-2 cursor-pointer"
                >
                  <div className="h-4 w-4 rounded-sm" style={{ backgroundColor: template.color }}></div>
                  <div>
                    <span className="font-medium">{template.name}</span>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSuggestionClick("Help me choose a template")}>
                Help me choose a template
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="text-xs">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => generateResume("professional")}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Professional Resume
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => generateResume("creative")}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Creative Resume
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSuggestionClick("Help me write a cover letter")}>
                Create Cover Letter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSuggestionClick("Analyze my resume for ATS")}>
                ATS Analysis
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/resume-builder")}>
                <Coffee className="h-4 w-4 mr-2" />
                Go to Resume Builder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
                  message.role === "user" ? "bg-primary ml-2" : "bg-muted mr-2"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-5 w-5 text-white" />
                ) : (
                  <Bot className="h-5 w-5" />
                )}
              </div>
              <Card
                className={`p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="whitespace-pre-line text-sm">
                  {message.content}
                </div>
              </Card>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Suggested questions:
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {RESUME_SUGGESTIONS.slice(0, 4).map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {RESUME_SUGGESTIONS.slice(4).map((suggestion, index) => (
              <Button
                key={index + 4}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about resume writing..."
            className="min-h-[60px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="self-end"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
};

export default ResumeChat;
