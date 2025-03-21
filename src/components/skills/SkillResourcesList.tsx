import { useState } from 'react';
import { SkillResource } from '@/types/skills';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink, Search, X } from 'lucide-react';

interface SkillResourcesListProps {
  resources: SkillResource[];
  selectedSkill: string | null;
  onSelectSkill: (skill: string | null) => void;
  isLoading: boolean;
}

const SkillResourcesList = ({ 
  resources, 
  selectedSkill, 
  onSelectSkill,
  isLoading 
}: SkillResourcesListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const resourceTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'documentation': return 'bg-purple-50 text-purple-700 border-purple-300';
      case 'tutorial': return 'bg-green-50 text-green-700 border-green-300';
      case 'book': return 'bg-amber-50 text-amber-700 border-amber-300';
      case 'blog': return 'bg-pink-50 text-pink-700 border-pink-300';
      case 'guide': return 'bg-cyan-50 text-cyan-700 border-cyan-300';
      default: return 'bg-gray-50 text-gray-700 border-gray-300';
    }
  };
  
  // Get unique skill names from resources
  const skillNames = Array.from(new Set(resources.map(r => r.skill_name)));
  
  // Filter resources based on search and selected skill
  const filteredResources = resources.filter(r => {
    const matchesSearch = searchTerm 
      ? r.resource_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.skill_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    return matchesSearch;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold">Learning Resources</h2>
          <p className="text-muted-foreground">Find resources to learn new skills or improve existing ones</p>
        </div>
        <div className="w-full md:w-auto">
          {selectedSkill && (
            <div className="flex items-center gap-2 mb-2">
              <Badge className="px-3 py-1">
                {selectedSkill}
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => onSelectSkill(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={!selectedSkill ? "secondary" : "outline"} 
            size="sm"
            onClick={() => onSelectSkill(null)}
          >
            All
          </Button>
          {skillNames.map(skill => (
            <Button 
              key={skill}
              variant={selectedSkill === skill ? "secondary" : "outline"}
              size="sm"
              onClick={() => onSelectSkill(skill)}
            >
              {skill}
            </Button>
          ))}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredResources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{resource.resource_title}</CardTitle>
                    <CardDescription className="mt-1 flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {resource.skill_name}
                      </Badge>
                      <Badge variant="outline" className={`capitalize ${resourceTypeColor(resource.resource_type)}`}>
                        {resource.resource_type}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {resource.description || "No description available."}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href={resource.resource_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Resource
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-muted/40">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try changing your search terms or selecting a different skill.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SkillResourcesList;
