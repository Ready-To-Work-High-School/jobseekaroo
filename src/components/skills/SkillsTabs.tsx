
import React, { Suspense, lazy } from 'react';
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

// Lazy load individual tab contents
const SkillList = lazy(() => import('@/components/skills/SkillList'));
const SkillGapAnalysis = lazy(() => import('@/components/skills/SkillGapAnalysis'));
const SkillResourcesList = lazy(() => import('@/components/skills/SkillResourcesList'));
const SkillProgressTracker = lazy(() => import('@/components/skills/SkillProgressTracker'));

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
      
      <TabsContent value="my-skills" className="mt-6">
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
        </Suspense>
      </TabsContent>
      
      <TabsContent value="progress" className="mt-6">
        <Suspense fallback={<TabLoader />}>
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
        </Suspense>
      </TabsContent>
      
      <TabsContent value="skill-gaps" className="mt-6">
        <Suspense fallback={<TabLoader />}>
          {activeTab === 'skill-gaps' && (
            <SkillGapAnalysis 
              userSkills={skills}
              onAddSkill={handleAddSkill}
            />
          )}
        </Suspense>
      </TabsContent>
      
      <TabsContent value="resources" className="mt-6">
        <Suspense fallback={<TabLoader />}>
          {activeTab === 'resources' && (
            <SkillResourcesList 
              resources={resources} 
              selectedSkill={selectedSkill}
              onSelectSkill={setSelectedSkill}
              isLoading={isLoading}
            />
          )}
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default SkillsTabs;
