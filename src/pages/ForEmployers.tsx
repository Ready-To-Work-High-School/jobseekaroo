
import Layout from '@/components/Layout';
import { Separator } from "@/components/ui/separator";
import EmployerHeader from '@/components/employer/EmployerHeader';
import EmployerTabs from '@/components/employer/EmployerTabs';
import CallToAction from '@/components/employer/CallToAction';
import { useFadeIn } from '@/utils/animations';
import { Link } from 'react-router-dom';
import { Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ForEmployers = () => {
  const contentAnimation = useFadeIn(300);
  
  return (
    <Layout>
      <EmployerHeader />
      
      <div className={contentAnimation}>
        <div className="max-w-5xl mx-auto mb-4 flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="gap-1 font-medium">
            <Database className="h-3.5 w-3.5" />
            Powered by Supabase
          </Badge>
          <Badge variant="outline" className="gap-1 font-medium">
            Hosted on Render
          </Badge>
        </div>
        
        <EmployerTabs />
      </div>
      
      <Separator className="my-16" />
      
      <CallToAction />
    </Layout>
  );
};

export default ForEmployers;
