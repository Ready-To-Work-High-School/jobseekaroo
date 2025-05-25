
import Layout from '@/components/Layout';
import { Separator } from "@/components/ui/separator";
import EmployerHeader from '@/components/employer/EmployerHeader';
import EmployerTabs from '@/components/employer/EmployerTabs';
import CallToAction from '@/components/employer/CallToAction';
import { useFadeIn } from '@/utils/animations';
import FreemiumBanner from '@/components/employer/premium/FreemiumBanner';
import PremiumFeaturesDisplay from '@/components/employer/premium/PremiumFeaturesDisplay';
import { Badge } from '@/components/ui/badge';
import { Database, Sparkles } from 'lucide-react';
import AnimatedStar from '@/components/animations/AnimatedStar';
import EmployerBenefits from '@/components/employer/EmployerBenefits';
import EmployerWhatYouGetSection from '@/components/employer/EmployerWhatYouGetSection';
import EmployerSignUpPrompt from '@/components/employer/EmployerSignUpPrompt';

const ForEmployers = () => {
  const contentAnimation = useFadeIn(300);
  
  return (
    <Layout>
      <EmployerHeader />
      
      <div className={`container max-w-6xl mx-auto px-4 ${contentAnimation}`}>
        {/* Prominently display the FreemiumBanner at the top */}
        <FreemiumBanner />
        
        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="gap-1 font-medium">
            <Database className="h-3.5 w-3.5" />
            Powered by Supabase
          </Badge>
          <Badge variant="outline" className="gap-1 font-medium">
            Hosted on Render
          </Badge>
        </div>
        
        {/* What You Get Section */}
        <EmployerWhatYouGetSection />
        
        {/* Sign Up Prompt */}
        <EmployerSignUpPrompt />
        
        <EmployerTabs />
        
        {/* Premium Features Display */}
        <PremiumFeaturesDisplay />
        
        {/* Benefits Section */}
        <div className="my-12">
          <EmployerBenefits />
        </div>
      </div>
      
      <Separator className="my-16" />
      
      <CallToAction />
    </Layout>
  );
};

export default ForEmployers;
