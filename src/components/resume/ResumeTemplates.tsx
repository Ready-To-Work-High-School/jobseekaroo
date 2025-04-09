
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, Copy, Eye, FileText } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getSecureFileURL } from "@/lib/supabase/encryption/file-security";

interface ResumeTemplate {
  id: string;
  title: string;
  description: string;
  image: string;
  pdfUrl: string;
  suitable: string[];
  color?: string;
}

const templates: ResumeTemplate[] = [
  {
    id: "template-1",
    title: "Professional",
    description: "A clean, straightforward layout suitable for most industries.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/professional-template.pdf",
    suitable: ["Business", "Finance", "Management"],
    color: "bg-blue-50"
  },
  {
    id: "template-2",
    title: "Creative",
    description: "A dynamic layout highlighting portfolio work and creativity.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/creative-template.pdf",
    suitable: ["Design", "Marketing", "Arts"],
    color: "bg-purple-50"
  },
  {
    id: "template-3",
    title: "Entry-Level",
    description: "Emphasizes skills and education for those with limited experience.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/entry-level-template.pdf",
    suitable: ["Students", "Recent Graduates", "Career Changers"],
    color: "bg-green-50"
  },
  {
    id: "template-4",
    title: "Technical",
    description: "Focuses on technical skills and project experience.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/technical-template.pdf",
    suitable: ["IT", "Engineering", "Development"],
    color: "bg-cyan-50"
  },
  {
    id: "template-5",
    title: "Executive",
    description: "Highlights leadership experience and accomplishments.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/executive-template.pdf",
    suitable: ["Directors", "VPs", "C-Suite"],
    color: "bg-slate-50"
  },
  {
    id: "template-6",
    title: "Minimal",
    description: "Simple and elegant with focus on content over design.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    pdfUrl: "/pdf/resume-templates/minimal-template.pdf",
    suitable: ["All Industries", "Legal", "Academic"],
    color: "bg-gray-50"
  }
];

const ResumeTemplates = () => {
  const { toast } = useToast();
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);

  const handleUseTemplate = (templateId: string) => {
    toast({
      title: "Template Selected",
      description: "Template ready to be customized with your information.",
    });
    
    // Find the selected template
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setPreviewTemplate(template);
    }
  };

  const handlePreviewClose = () => {
    setPreviewTemplate(null);
  };

  const handleDownloadTemplate = async () => {
    if (!previewTemplate) return;
    
    // In a real implementation, we would use secure file URLs for premium templates
    // For now, we'll use direct links for public templates
    toast({
      title: "Download Started",
      description: "Your template is being downloaded.",
    });
    
    try {
      // For demonstration - in a real app, we might check if user has permission
      const link = document.createElement('a');
      link.href = previewTemplate.pdfUrl;
      link.download = `${previewTemplate.title.toLowerCase()}-resume-template.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        handlePreviewClose();
      }, 1500);
    } catch (error) {
      console.error("Error downloading template:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the template. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewPdf = () => {
    if (previewTemplate) {
      setIsPdfPreviewOpen(true);
    }
  };

  const handleCopyTemplate = () => {
    toast({
      title: "Template Copied",
      description: "Template content copied to clipboard.",
    });
  };

  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Choose a template as a starting point for your resume. Our AI assistant will help you fill it with your information.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className={`aspect-[3/4] relative overflow-hidden ${template.color || "bg-muted"}`}>
              <img 
                src={template.image} 
                alt={template.title} 
                className="object-cover w-full h-full opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">{template.title}</h3>
                </div>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {template.suitable.map((item, index) => (
                  <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-2">
              <Button 
                onClick={() => handleUseTemplate(template.id)}
                variant="default"
                className="w-full"
              >
                Use Template
              </Button>
              <Button
                onClick={() => setPreviewTemplate(template)}
                variant="outline"
                size="icon"
                title="Preview template"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Template Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={handlePreviewClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.title} Template Preview</DialogTitle>
          </DialogHeader>
          <div className={`aspect-[3/4] relative overflow-hidden ${previewTemplate?.color || "bg-muted"} border rounded-md`}>
            <img 
              src={previewTemplate?.image} 
              alt={previewTemplate?.title} 
              className="object-cover w-full h-full"
            />
          </div>
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopyTemplate}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" onClick={handleViewPdf} className="gap-2">
                <FileText className="h-4 w-4" />
                View PDF
              </Button>
              <Button variant="outline" onClick={handlePreviewClose}>Cancel</Button>
            </div>
            <Button onClick={handleDownloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* PDF Preview Dialog */}
      <Dialog open={isPdfPreviewOpen} onOpenChange={setIsPdfPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.title} PDF Template</DialogTitle>
          </DialogHeader>
          <div className="h-[70vh] overflow-auto">
            {previewTemplate && (
              <iframe 
                src={previewTemplate.pdfUrl} 
                title={`${previewTemplate.title} Resume Template`} 
                className="w-full h-full border-0"
              />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPdfPreviewOpen(false)} variant="outline">
              Close
            </Button>
            <Button onClick={handleDownloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeTemplates;
