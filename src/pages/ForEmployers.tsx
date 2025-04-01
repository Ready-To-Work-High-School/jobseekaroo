
import Layout from '@/components/Layout';
import { Separator } from "@/components/ui/separator";
import EmployerHeader from '@/components/employer/EmployerHeader';
import EmployerTabs from '@/components/employer/EmployerTabs';
import CallToAction from '@/components/employer/CallToAction';
import { useFadeIn } from '@/utils/animations';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

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
      
      {/* Admin API Demo Section */}
      <div className="max-w-5xl mx-auto mt-16 mb-8 pt-8 border-t">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-4 w-4 text-amber-600" />
          <Link 
            to="/admin?adminTest=true" 
            className="text-sm text-muted-foreground hover:text-blue-600 flex items-center gap-1"
            aria-label="Admin Access" 
            title="Admin Access"
          >
            <span>Developer API Demo</span>
            <img 
              src="/lovable-uploads/8587ce26-fbc1-463b-a0ef-e63f5fda9889.png" 
              alt="Admin Access" 
              className="w-3 h-3 object-contain rounded-md ml-1"
            />
          </Link>
        </div>
        <p className="text-xs text-center text-muted-foreground max-w-md mx-auto">
          The API demo demonstrates server functionality including user registration/login and post creation for educational purposes only.
        </p>
      </div>
    </Layout>
  );
};

export default ForEmployers;
