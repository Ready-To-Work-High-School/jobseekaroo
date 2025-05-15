
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Send, Briefcase } from 'lucide-react';
import { JobFormData } from '@/types/jobs';
import { useToast } from '@/hooks/use-toast';

interface AIQuickJobPostProps {
  onJobGenerated: (jobData: JobFormData) => void;
  onCancel: () => void;
}

const AIQuickJobPost = ({ onJobGenerated, onCancel }: AIQuickJobPostProps) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const examplePrompts = [
    "Part-time retail associate at Target, $15-18/hr, 20 hours per week",
    "Summer intern for web development, remote, $20/hr, 30 hours per week",
    "Barista at local coffee shop, weekends only, $14-16/hr + tips"
  ];

  const handleGenerateJob = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a job description to generate a job posting.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // In a real implementation, this would call an OpenAI API endpoint
      // For now, we'll simulate the AI response with a timeout
      setTimeout(() => {
        // Example generated job data - in a real implementation, this would be returned from the API
        const generatedJob: JobFormData = {
          title: prompt.includes("retail associate") ? "Retail Associate" : "Entry-Level Position",
          company: prompt.includes("Target") ? "Target" : "Local Business",
          location: "Jacksonville, FL",
          type: prompt.includes("part-time") ? "part-time" : "full-time",
          requirements: "No experience necessary. Customer service skills preferred.",
          description: `We're looking for motivated individuals to join our team. ${prompt}`,
          hours_per_week: prompt.includes("20 hours") ? 20 : 30,
          pay_rate_min: prompt.includes("$15") ? 15 : 14,
          pay_rate_max: prompt.includes("$18") ? 18 : 16,
          contactEmail: "jobs@company.com",
          isPremium: false,
          prohibited_types: []
        };

        onJobGenerated(generatedJob);
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating job:', error);
      setIsGenerating(false);
      toast({
        title: "Generation failed",
        description: "Failed to generate job posting. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          AI Quick Job Post
        </CardTitle>
        <CardDescription>
          Describe the job in natural language, and let AI generate a full job posting for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Describe the job in a few sentences. Include details like position, company, pay rate, hours, and requirements."
          className="min-h-[120px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Example prompts:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((examplePrompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(examplePrompt)}
              >
                {examplePrompt.length > 30 ? `${examplePrompt.substring(0, 30)}...` : examplePrompt}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleGenerateJob} disabled={isGenerating} className="gap-2">
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Generate Job
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIQuickJobPost;
