
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useFadeIn } from '@/utils/animations';
import { UserSkill, SkillResource } from '@/types/skills';
import { getUserSkills, createUserSkill, updateUserSkill, deleteUserSkill, getSkillResources } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { SkillGapAnalysis } from '@/components/skills/SkillGapAnalysis';
import { SkillList } from '@/components/skills/SkillList';
import { SkillResourcesList } from '@/components/skills/SkillResourcesList';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Bookmark,
  BookOpen,
  TrendingUp,
  Book,
} from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [resources, setResources] = useState<SkillResource[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-skills');
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const animation = useFadeIn(200);
  
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const userSkills = await getUserSkills(user.id);
          setSkills(userSkills);
        }
        
        // Load resources for the selected skill or all resources if no skill is selected
        const skillResources = await getSkillResources(selectedSkill || undefined);
        setResources(skillResources);
      } catch (error) {
        console.error('Error loading skills data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load skills data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, selectedSkill, toast]);
  
  const handleAddSkill = async (newSkill: Omit<UserSkill, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;
    
    try {
      const skill = await createUserSkill({
        ...newSkill,
        user_id: user.id
      });
      
      if (skill) {
        setSkills(prev => [...prev, skill]);
        toast({
          title: 'Skill Added',
          description: `${skill.skill_name} has been added to your skills`,
        });
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to add skill',
        variant: 'destructive',
      });
    }
  };
  
  const handleUpdateSkill = async (skillId: string, updates: Partial<UserSkill>) => {
    try {
      const updatedSkill = await updateUserSkill(skillId, updates);
      
      if (updatedSkill) {
        setSkills(prev => prev.map(skill => 
          skill.id === skillId ? updatedSkill : skill
        ));
        toast({
          title: 'Skill Updated',
          description: `${updatedSkill.skill_name} has been updated`,
        });
      }
    } catch (error) {
      console.error('Error updating skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to update skill',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteSkill = async (skillId: string, skillName: string) => {
    try {
      await deleteUserSkill(skillId);
      setSkills(prev => prev.filter(skill => skill.id !== skillId));
      toast({
        title: 'Skill Deleted',
        description: `${skillName} has been removed from your skills`,
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete skill',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <Layout>
      <div className={`container max-w-5xl py-8 ${animation}`}>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Skills Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your skills, track skill gaps, and find learning resources
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-skills" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                My Skills
              </TabsTrigger>
              <TabsTrigger value="skill-gaps" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Skill Gap Analysis
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Learning Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-skills" className="mt-6">
              <SkillList 
                skills={skills} 
                onAddSkill={handleAddSkill}
                onUpdateSkill={handleUpdateSkill}
                onDeleteSkill={handleDeleteSkill}
                isLoading={isLoading}
                onSelectSkill={(skill) => {
                  setSelectedSkill(skill);
                  setActiveTab('resources');
                }}
              />
            </TabsContent>
            
            <TabsContent value="skill-gaps" className="mt-6">
              <SkillGapAnalysis 
                userSkills={skills}
                onAddSkill={handleAddSkill}
              />
            </TabsContent>
            
            <TabsContent value="resources" className="mt-6">
              <SkillResourcesList 
                resources={resources} 
                selectedSkill={selectedSkill}
                onSelectSkill={setSelectedSkill}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
