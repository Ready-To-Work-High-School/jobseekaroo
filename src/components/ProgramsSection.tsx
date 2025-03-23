
import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import EntrepreneurshipStoreSection from './programs/EntrepreneurshipStoreSection';
import CredentialsBadges from './programs/CredentialsBadges';
import { Alert, AlertDescription } from './ui/alert';
import { cn } from '@/lib/utils';
import SectionSeparator from './home/SectionSeparator';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useRef } from 'react';
import { protectElement } from '@/utils/textProtection';
import { Card, CardContent } from './ui/card';
import { Sparkles, GraduationCap, ArrowRight, Award, BadgeCheck } from 'lucide-react';
import { Badge } from './ui/badge';

const ProgramsSection = () => {
  const animation = useFadeIn(300);
  const {
    user
  } = useAuth();
  const sectionRef = useRef<HTMLElement>(null);

  // Function to get the redirect path based on auth status
  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };

  // Apply text protection to the section
  useEffect(() => {
    if (sectionRef.current) {
      protectElement(sectionRef.current);
    }
  }, []);

  return <section ref={sectionRef} className={`py-16 bg-secondary/5 ${animation} protected-content`}>
      <div className="container-custom">
        {/* ESB and IBM Badges Display */}
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">Industry Recognized Certifications</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* ESB Badge */}
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-amber-200">
              <div className="relative">
                <Badge variant="amber" className="absolute -top-2 -right-2">ESB Certified</Badge>
                <img 
                  src="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png" 
                  alt="ESB Certification" 
                  className="w-32 h-32 object-contain" 
                />
              </div>
              <p className="mt-2 font-medium text-center">Entrepreneurship & Small Business</p>
              <p className="text-xs text-gray-600 text-center">Industry-standard credential by Certiport</p>
            </div>
            
            {/* IBM Badge */}
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-blue-200">
              <div className="relative">
                <Badge variant="info" className="absolute -top-2 -right-2">
                  <BadgeCheck className="h-4 w-4 mr-1" /> IBM
                </Badge>
                <img 
                  src="/lovable-uploads/db3bbdbe-4e13-45f6-9d94-45a126fdc1ef.png" 
                  alt="IBM Skills Build" 
                  className="w-32 h-32 object-contain" 
                />
              </div>
              <p className="mt-2 font-medium text-center">IBM Skills Build</p>
              <p className="text-xs text-gray-600 text-center">Career readiness certification pathway</p>
            </div>
          </div>
        </div>
        
        {/* Academy Link Banner */}
        <div className="mb-10 text-center">
          <Link to="/entrepreneurship-academy" className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors">
            <GraduationCap className="mr-2 h-5 w-5" />
            Visit Entrepreneurship Academy
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-3 text-sm text-gray-600">Learn more about our advanced Entrepreneurship program at Westside High School</p>
        </div>
        
        {/* For Employers Only heading placed outside the blue section - stretched full width */}
        <h2 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-center w-full")}>
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 py-3 font-bold text-blue-800 text-center text-3xl w-full block md:text-5xl">
            For Employers Only
          </span>
        </h2>
        
        {/* Employers Section - Simplified without burst image */}
        <div className="mb-12">
          <div className="flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto text-center">
            <Card className="w-full glow-purple rounded-xl overflow-hidden border-purple-300 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-purple-500 mr-2" />
                  <h3 className="font-extrabold text-xl md:text-2xl text-zinc-800">
                    Hiring Opportunity
                  </h3>
                </div>
                
                <p className="font-medium text-lg mb-6">
                  Connect with our academy to find pre-trained students with industry-recognized credentials ready for your workforce.
                </p>
                
                <a 
                  href="mailto:ColemanP3@duvalschools.org" 
                  className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Contact Us Today
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default ProgramsSection;
