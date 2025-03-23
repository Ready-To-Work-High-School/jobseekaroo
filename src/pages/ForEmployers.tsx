
import Layout from '@/components/Layout';
import { Separator } from "@/components/ui/separator";
import EmployerHeader from '@/components/employer/EmployerHeader';
import EmployerTabs from '@/components/employer/EmployerTabs';
import CallToAction from '@/components/employer/CallToAction';
import { useFadeIn } from '@/utils/animations';

const ForEmployers = () => {
  const contentAnimation = useFadeIn(300);
  
  return (
    <Layout>
      <EmployerHeader />
      
      <div className={contentAnimation}>
        <EmployerTabs />
      </div>
      
      <Separator className="my-16" />
      
      <CallToAction />
    </Layout>
  );
};

export default ForEmployers;
