
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send, User, Bot } from "lucide-react";

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
  "How can I tailor my resume for a specific job?"
];

const ResumeChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      } else {
        response = "I'd be happy to help with your resume. Could you provide more specific details about what you're looking for assistance with? For example:\n\n• Reviewing a specific section\n• Crafting better bullet points\n• Highlighting certain skills or experiences\n• Tailoring your resume for a particular position";
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

  return (
    <div className="flex flex-col h-[70vh] rounded-lg border">
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
          <div className="flex flex-wrap gap-2">
            {RESUME_SUGGESTIONS.map((suggestion, index) => (
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
