
import React, { Suspense } from 'react';
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
  Target,
} from 'lucide-react';
import { useSkills } from '@/contexts/SkillsContext';
import TabLoader from './TabLoader';
import SkillList from '@/components/skills/SkillList';
import SkillGapAnalysis from '@/components/skills/SkillGapAnalysis';
import SkillResourcesList from '@/components/skills/SkillResourcesList';
import SkillProgressTracker from '@/components/skills/SkillProgressTracker';

const SkillsTabs = () => {
  const {
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
  } = useSkills();

  // Extract skill names from user skills objects for components that expect string[]
  const skillNames = skills.map(skill => skill.skill_name);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="my-skills" className="flex items-center gap-2">
          <Bookmark className="h-4 w-4" />
          My Skills
        </TabsTrigger>
        <TabsTrigger value="progress" className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          Development
        </TabsTrigger>
        <TabsTrigger value="skill-gaps" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Skill Gaps
        </TabsTrigger>
        <TabsTrigger value="resources" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Resources
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-6">
        <Suspense fallback={<TabLoader />}>
          {activeTab === 'my-skills' && (
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
          )}
          
          {activeTab === 'progress' && (
            <SkillProgressTracker
              userSkills={skills}
              resources={resources}
              isLoading={isLoading}
              onViewResources={(skillName) => {
                setSelectedSkill(skillName);
                setActiveTab('resources');
              }}
            />
          )}
          
          {activeTab === 'skill-gaps' && (
            <SkillGapAnalysis 
              userSkills={skillNames}
              jobId="job-001" // Using a default job ID for demo purposes
            />
          )}
          
          {activeTab === 'resources' && (
            <SkillResourcesList 
              resources={resources} 
              selectedSkill={selectedSkill}
              onSelectSkill={setSelectedSkill}
              isLoading={isLoading}
            />
          )}
        </Suspense>
      </div>
    </Tabs>
  );
};

export default SkillsTabs;
