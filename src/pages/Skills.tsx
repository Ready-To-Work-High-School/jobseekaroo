
import { Suspense } from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { SkillsProvider } from '@/contexts/SkillsContext';
import SkillsHeader from '@/components/skills/SkillsHeader';
import SkillsTabs from '@/components/skills/SkillsTabs';
import { Skeleton } from '@/components/ui/skeleton';
import TabLoader from '@/components/skills/TabLoader';

const Skills = () => {
  const animation = useFadeIn(200);
  
  return (
    <Layout>
      <div className={`container max-w-5xl mx-auto px-4 py-8 ${animation}`}>
        <div className="flex flex-col gap-6">
          <SkillsHeader />
          
          <Suspense fallback={<TabLoader />}>
            <SkillsProvider>
              <SkillsTabs />
            </SkillsProvider>
          </Suspense>
        </div>
      </div>
    </Layout>
  );
};

export default Skills;
