
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ResumeChat from "@/components/resume/ResumeChat";
import ResumeTemplates from "@/components/resume/ResumeTemplates";

const ResumeAssistant = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Assistant</h1>
          <p className="text-muted-foreground max-w-3xl">
            Get help crafting the perfect resume for your job applications. Our AI assistant can help you improve your resume or start from a template.
          </p>
        </div>

        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="chat">AI Resume Assistant</TabsTrigger>
            <TabsTrigger value="templates">Resume Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-0">
            <ResumeChat />
          </TabsContent>
          
          <TabsContent value="templates" className="mt-0">
            <ResumeTemplates />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ResumeAssistant;
