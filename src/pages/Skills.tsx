
import { lazy, Suspense } from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { SkillsProvider } from '@/contexts/SkillsContext';
import SkillsHeader from '@/components/skills/SkillsHeader';
import SkillsTabs from '@/components/skills/SkillsTabs';

const Skills = () => {
  const animation = useFadeIn(200);
  
  return (
    <Layout>
      <div className={`container max-w-5xl py-8 ${animation}`}>
        <div className="flex flex-col gap-6">
          <SkillsHeader />
          
          <SkillsProvider>
            <SkillsTabs />
          </SkillsProvider>
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
