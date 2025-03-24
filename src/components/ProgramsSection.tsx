import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import EntrepreneurshipStoreSection from './programs/EntrepreneurshipStoreSection';
import CredentialBadges from './auth/CredentialBadges';
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
        {/* For Employers Only heading placed at the top of the section */}
        <h2 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-center w-full")}>
          <span className="bg-gradient-to-r from-red-800 via-amber-600 to-red-900 py-3 font-bold text-gray-100 text-center text-3xl w-full block md:text-5xl">
            For Employers Only
          </span>
        </h2>
        
        {/* Employers Section - Simplified without burst image */}
        <div className="mb-12">
          <div className="flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto text-center">
            <Card className="w-full rounded-xl overflow-hidden border-red-300 shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-red-800 mr-2" />
                  <h3 className="font-extrabold text-xl md:text-2xl text-red-900">
                    Hiring Opportunity
                  </h3>
                </div>
                
                <p className="font-medium text-lg mb-6 text-zinc-800">
                  Connect with our academy to find pre-trained students with industry-recognized credentials ready for your workforce.
                </p>
                
                <a href="mailto:ColemanP3@duvalschools.org" className="inline-block px-6 py-3 bg-gradient-to-r from-red-800 to-red-900 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-colors">
                  Contact Us Today
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Display our updated CredentialBadges component here */}
        <CredentialBadges />
      </div>
    </section>;
};
export default ProgramsSection;