
import Layout from '@/components/Layout';
import { Separator } from "@/components/ui/separator";
import EmployerHeader from '@/components/employer/EmployerHeader';
import EmployerTabs from '@/components/employer/EmployerTabs';
import CallToAction from '@/components/employer/CallToAction';
import { useFadeIn } from '@/utils/animations';
import { Link } from 'react-router-dom';
import { Database, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
        
        {/* Premium Services Callout */}
        <div className="max-w-5xl mx-auto mb-8 bg-gradient-to-r from-amber-50 to-blue-50 p-4 rounded-lg border border-amber-100 dark:from-amber-950/30 dark:to-blue-950/30 dark:border-amber-900/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-amber-500" />
              <div>
                <h3 className="font-medium">Premium Employer Services</h3>
                <p className="text-sm text-muted-foreground">Access advanced analytics and premium company profiles</p>
              </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
              <Link to="/employer-premium">
                Explore Premium Features
              </Link>
            </Button>
          </div>
        </div>
        
        <EmployerTabs />
      </div>
      
      <Separator className="my-16" />
      
      <CallToAction />
    </Layout>
  );
};

export default ForEmployers;
