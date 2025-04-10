
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resumeResources, interviewResources } from "@/lib/mock-data/resumeData";
import { Download, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { BadgeIcon } from "../badges/BadgeIcon";

const ResumeResources = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResourceAction = (url: string, title: string, action: string) => {
    if (!url) {
      toast({
        title: "Resource Not Available",
        description: "This resource is currently being updated. Please check back later.",
      });
      return;
    }

    // Check if it's an employer dashboard link
    if (url === "/employer-dashboard" || url === "/employer/dashboard") {
      navigate("/employer/dashboard");
      return;
    }
    
    // Check if it's an employer badges link
    if (url === "/employer-badges" || url === "/employer/badges") {
      navigate("/employer/badges");
      return;
    }

    // Check if it's an external URL
    if (url.startsWith('http')) {
      window.open(url, '_blank');
    } else {
      // For PDF downloads
      const link = document.createElement('a');
      link.href = url;
      link.download = title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `${title} is being downloaded.`,
      });
    }
  };

  return (
    <div>
      <Tabs defaultValue="resume">
        <TabsList className="mb-6">
          <TabsTrigger value="resume">Resume Resources</TabsTrigger>
          <TabsTrigger value="interview">Interview Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resume" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {resource.icon ? (
                      <resource.icon className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Download className="h-5 w-5 text-blue-600" />
                    )}
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <Button 
                    variant={resource.url ? "default" : "outline"} 
                    className="w-full gap-2"
                    onClick={() => handleResourceAction(resource.url, resource.title, resource.action)}
                  >
                    {resource.action === "Download" ? (
                      <Download className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    {resource.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="interview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {resource.icon ? (
                      <resource.icon className="h-5 w-5 text-blue-600" />
                    ) : (
                      resource.type === "Badge" ? (
                        <BadgeIcon badgeId={resource.badgeId || "achievement"} />
                      ) : (
                        <Download className="h-5 w-5 text-blue-600" />
                      )
                    )}
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <Button 
                    variant={resource.url ? "default" : "outline"} 
                    className="w-full gap-2"
                    onClick={() => handleResourceAction(resource.url, resource.title, resource.action)}
                  >
                    {resource.action === "Download" ? (
                      <Download className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    {resource.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeResources;
