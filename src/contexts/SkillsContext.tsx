
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import { UserSkill, SkillResource } from '@/types/skills';
import { 
  getUserSkills, 
  createUserSkill, 
  updateUserSkill, 
  deleteUserSkill, 
  getSkillResources 
} from '@/lib/supabase/skills';

interface SkillsContextType {
  skills: UserSkill[];
  resources: SkillResource[];
  selectedSkill: string | null;
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSelectedSkill: (skill: string | null) => void;
  handleAddSkill: (newSkill: Omit<UserSkill, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  handleUpdateSkill: (skillId: string, updates: Partial<UserSkill>) => Promise<void>;
  handleDeleteSkill: (skillId: string, skillName: string) => Promise<void>;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export function SkillsProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [resources, setResources] = useState<SkillResource[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-skills');
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
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
        
        const skillResources = await getSkillResources(selectedSkill || undefined);
        setResources(skillResources);
      } catch (error) {
        console.error('Error loading skills data:', error);
        toast.error('Failed to load skills data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, selectedSkill]);
  
  const handleAddSkill = async (newSkill: Omit<UserSkill, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;
    
    try {
      const skill = await createUserSkill({
        ...newSkill,
        user_id: user.id
      });
      
      if (skill) {
        setSkills(prev => [...prev, skill]);
        toast.success(`${skill.skill_name} has been added to your skills`);
      }
    } catch (error) {
      console.error('Error adding skill:', error);
      toast.error('Failed to add skill');
    }
  };
  
  const handleUpdateSkill = async (skillId: string, updates: Partial<UserSkill>) => {
    try {
      const updatedSkill = await updateUserSkill(skillId, updates);
      
      if (updatedSkill) {
        setSkills(prev => prev.map(skill => 
          skill.id === skillId ? updatedSkill : skill
        ));
        toast.success(`${updatedSkill.skill_name} has been updated`);
      }
    } catch (error) {
      console.error('Error updating skill:', error);
      toast.error('Failed to update skill');
    }
  };
  
  const handleDeleteSkill = async (skillId: string, skillName: string) => {
    try {
      await deleteUserSkill(skillId);
      setSkills(prev => prev.filter(skill => skill.id !== skillId));
      toast.success(`${skillName} has been removed from your skills`);
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill');
    }
  };
  
  return (
    <SkillsContext.Provider value={{
      skills,
      resources,
      selectedSkill,
      isLoading,
      activeTab,
      setActiveTab,
      setSelectedSkill,
      handleAddSkill,
      handleUpdateSkill,
      handleDeleteSkill
    }}>
      {children}
    </SkillsContext.Provider>
  );
}

export function useSkills() {
  const context = useContext(SkillsContext);
  
  if (context === undefined) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  
  return context;
}
