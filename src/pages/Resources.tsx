
import { Separator } from "@/components/ui/separator";
import { useFadeIn } from '@/utils/animations';
import Layout from '@/components/Layout';
import EducationalVideoSection from '@/components/resources/EducationalVideoSection';
import ResourceHeader from '@/components/resources/ResourceHeader';
import ResourceTabs from '@/components/resources/ResourceTabs';
import MeetingRequestCard from '@/components/resources/MeetingRequestCard';

const Resources = () => {
  const contentAnimation = useFadeIn(300);
  
  return (
    <Layout>
      <ResourceHeader />
      
      <div className={contentAnimation}>
        <ResourceTabs />
        
        <EducationalVideoSection />
        
        <Separator className="max-w-4xl mx-auto my-16" />
        
        <MeetingRequestCard />
      </div>
    </Layout>
  );
};

export default Resources;
