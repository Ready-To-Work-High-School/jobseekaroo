
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send, User, Bot, Upload, FileText, DownloadCloud } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile } from "@/types/user";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

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

const ResumeChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUploadedResume, setHasUploadedResume] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { userProfile } = useAuth();

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
      } else {
        response = "I'd be happy to help with your resume. Could you provide more specific details about what you're looking for assistance with? For example:\n\n• Reviewing a specific section\n• Crafting better bullet points\n• Highlighting certain skills or experiences\n• Tailoring your resume for a particular position";
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
    setIsUploading(true);
    
    // Simulate file upload
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

  const generateResume = (template: string) => {
    toast({
      title: "Generating Resume",
      description: `Creating a ${template} resume based on your profile information.`,
    });
    
    // Simulate generation response
    setTimeout(() => {
      const generateResponse = `I've created a draft ${template} resume based on your profile information. Here are some recommendations to complete it:\n\n1. Add more specific achievements to your work experience\n2. Consider adding certifications if you have any\n3. Include a link to your portfolio or LinkedIn profile\n\nYou can download the draft resume using the button at the top of this chat.`;
      
      setMessages(prev => [...prev, { role: "assistant", content: generateResponse }]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[70vh] rounded-lg border">
      <div className="bg-muted p-3 border-b flex justify-between items-center">
        <h3 className="font-medium">Resume AI Assistant</h3>
        <div className="flex gap-2">
          {hasUploadedResume && (
            <Button size="sm" variant="outline" className="flex gap-1 items-center text-xs">
              <DownloadCloud className="h-3.5 w-3.5" />
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="text-xs">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => generateResume("Professional")}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Professional Resume
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => generateResume("Creative")}>
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
