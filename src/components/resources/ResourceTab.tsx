
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, ExternalLink, Video } from 'lucide-react';
import { type Resource } from '@/lib/mock-data/resourcesData';

interface ResourceTabProps {
  resources: Resource[];
}

const ResourceTab = ({ resources }: ResourceTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources.map((resource, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-blue-100 mt-1">
                  <resource.icon className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {resource.type}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="py-4">
            <CardDescription className="text-base">
              {resource.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="pt-0">
            {resource.url ? (
              <Button variant="outline" className="gap-2" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.action === "Download" ? <Download className="h-4 w-4" /> :
                    resource.action === "Watch" ? <Video className="h-4 w-4" /> :
                    resource.action === "Read" ? <BookOpen className="h-4 w-4" /> :
                    <ExternalLink className="h-4 w-4" />}
                  {resource.action}
                </a>
              </Button>
            ) : (
              <Button variant="outline" className="gap-2">
                {resource.action === "Download" ? <Download className="h-4 w-4" /> :
                  resource.action === "Watch" ? <Video className="h-4 w-4" /> :
                  resource.action === "Read" ? <BookOpen className="h-4 w-4" /> :
                  <ExternalLink className="h-4 w-4" />}
                {resource.action}
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ResourceTab;
