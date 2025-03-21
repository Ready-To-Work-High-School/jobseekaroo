
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ResumeChat from "@/components/resume/ResumeChat";
import ResumeTemplates from "@/components/resume/ResumeTemplates";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, MessageSquare, FileSymlink } from "lucide-react";

const ResumeAssistant = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Assistant</h1>
            <p className="text-muted-foreground max-w-3xl">
              Get help crafting the perfect resume for your job applications. Our AI assistant can help you improve your resume or start from a template.
            </p>
          </div>
          <Button 
            onClick={() => navigate('/resume-builder')}
            className="self-start md:self-auto"
          >
            <FileSymlink className="mr-2 h-4 w-4" />
            Go to Resume Builder
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  AI Resume Assistant
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Resume Templates
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="mt-0">
                <ResumeChat />
              </TabsContent>
              
              <TabsContent value="templates" className="mt-0">
                <ResumeTemplates />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Use our structured resume builder to create a professional resume step by step.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/resume-builder')}
                >
                  Go to Resume Builder
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resume Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Use Action Verbs</h3>
                  <p className="text-xs text-muted-foreground">Start bullet points with words like "Achieved," "Managed," "Developed"</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Quantify Achievements</h3>
                  <p className="text-xs text-muted-foreground">Include numbers to show impact: "Increased sales by 20%"</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Keep It Concise</h3>
                  <p className="text-xs text-muted-foreground">Aim for a one-page resume unless you have extensive experience</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Tailor to the Job</h3>
                  <p className="text-xs text-muted-foreground">Customize your resume for each application</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeAssistant;
