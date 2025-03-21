
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface ResumeTemplate {
  id: string;
  title: string;
  description: string;
  image: string;
  suitable: string[];
}

const templates: ResumeTemplate[] = [
  {
    id: "template-1",
    title: "Professional",
    description: "A clean, straightforward layout suitable for most industries.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    suitable: ["Business", "Finance", "Management"]
  },
  {
    id: "template-2",
    title: "Creative",
    description: "A dynamic layout highlighting portfolio work and creativity.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    suitable: ["Design", "Marketing", "Arts"]
  },
  {
    id: "template-3",
    title: "Entry-Level",
    description: "Emphasizes skills and education for those with limited experience.",
    image: "/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png",
    suitable: ["Students", "Recent Graduates", "Career Changers"]
  }
];

const ResumeTemplates = () => {
  const { toast } = useToast();

  const handleUseTemplate = (templateId: string) => {
    toast({
      title: "Template Selected",
      description: "This feature will be available soon. Stay tuned!",
    });
  };

  return (
    <div>
      <p className="text-muted-foreground mb-6">
        Choose a template as a starting point for your resume. Our AI assistant will help you fill it with your information.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <div className="aspect-[3/4] relative overflow-hidden bg-muted">
              <img 
                src={template.image} 
                alt={template.title} 
                className="object-cover w-full h-full opacity-70"
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
            
            <CardFooter>
              <Button 
                onClick={() => handleUseTemplate(template.id)}
                variant="outline"
                className="w-full"
              >
                Use Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
