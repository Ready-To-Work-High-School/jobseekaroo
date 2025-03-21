
import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Download, Save, Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSaveResume = () => {
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Resume Saved",
        description: "Your resume has been saved successfully.",
      });
    }, 1500);
  };

  const handleGenerateResume = () => {
    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Resume Generated",
        description: "Your resume has been generated and is ready to download.",
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Resume Builder</h1>
          <p className="text-muted-foreground max-w-3xl">
            Create a professional resume with our step-by-step builder. Fill in your information and we'll format it beautifully.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={activeSection} value={activeSection} onValueChange={setActiveSection}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">First Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Your first name"
                            defaultValue={userProfile?.first_name || ''}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Last Name</label>
                          <input 
                            type="text" 
                            className="w-full p-2 border rounded-md" 
                            placeholder="Your last name"
                            defaultValue={userProfile?.last_name || ''}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Professional Title</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="e.g. Software Engineer"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input 
                          type="tel" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="(123) 456-7890"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border rounded-md" 
                          placeholder="City, State"
                          defaultValue={userProfile?.location || ''}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Professional Summary</label>
                        <textarea 
                          className="w-full p-2 border rounded-md min-h-[100px]" 
                          placeholder="Write a brief professional summary..."
                          defaultValue={userProfile?.bio || ''}
                        ></textarea>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button onClick={() => setActiveSection("experience")}>
                          Next: Experience
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <div className="space-y-6">
                      <div className="border p-4 rounded-md">
                        <h3 className="font-medium mb-3">Work Experience #1</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Job Title</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md" 
                              placeholder="e.g. Senior Developer"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Company</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md" 
                              placeholder="Company name"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Start Date</label>
                              <input 
                                type="month" 
                                className="w-full p-2 border rounded-md" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">End Date</label>
                              <input 
                                type="month" 
                                className="w-full p-2 border rounded-md" 
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Job Description</label>
                            <textarea 
                              className="w-full p-2 border rounded-md min-h-[100px]" 
                              placeholder="Describe your responsibilities and achievements..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">+ Add Another Experience</Button>
                      
                      <div className="pt-4 flex justify-between">
                        <Button variant="outline" onClick={() => setActiveSection("personal")}>
                          Back: Personal
                        </Button>
                        <Button onClick={() => setActiveSection("education")}>
                          Next: Education
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="education">
                    <div className="space-y-6">
                      <div className="border p-4 rounded-md">
                        <h3 className="font-medium mb-3">Education #1</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">School/Institution</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md" 
                              placeholder="e.g. University of California"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Degree</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md" 
                              placeholder="e.g. Bachelor of Science"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Field of Study</label>
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md" 
                              placeholder="e.g. Computer Science"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Start Date</label>
                              <input 
                                type="month" 
                                className="w-full p-2 border rounded-md" 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">End Date</label>
                              <input 
                                type="month" 
                                className="w-full p-2 border rounded-md" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">+ Add Another Education</Button>
                      
                      <div className="pt-4 flex justify-between">
                        <Button variant="outline" onClick={() => setActiveSection("experience")}>
                          Back: Experience
                        </Button>
                        <Button onClick={handleGenerateResume} disabled={isGenerating}>
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              Generate Resume
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center min-h-[400px] bg-muted/20">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Complete the form to see your resume preview
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="w-1/2 mr-2">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  variant="default" 
                  className="w-1/2 ml-2"
                  onClick={handleSaveResume}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Not sure how to fill out your resume? Our AI assistant can help you craft the perfect content.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/resume-assistant')}
                  >
                    Go to Resume Assistant
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeBuilder;
