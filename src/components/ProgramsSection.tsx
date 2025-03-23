
import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import ProgramCards from './programs/ProgramCards';
import EntrepreneurshipStoreSection from './programs/EntrepreneurshipStoreSection';
import CredentialsBadges from './programs/CredentialsBadges';
import { Alert, AlertDescription } from './ui/alert';
import { cn } from '@/lib/utils';
import SectionSeparator from './home/SectionSeparator';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useRef } from 'react';
import { protectElement } from '@/utils/textProtection';

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
        {/* For Employers Only heading placed outside the blue section */}
        <h2 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-center")}>
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-6 py-3 font-bold text-blue-800 text-center text-3xl w-full md:text-5xl">
            For Employers Only
          </span>
        </h2>
        
        {/* Employers Section - Simplified without burst image */}
        <div className="mb-12">
          <div className="flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto text-center">
            <h3 className="font-extrabold text-xl md:text-2xl text-zinc-800">
              Hiring Opportunity
            </h3>
            
            <p className="font-medium text-lg mb-4">
              Connect with our academy to find pre-trained students with industry-recognized credentials ready for your workforce.
            </p>
            
            <a 
              href="mailto:ColemanP3@duvalschools.org" 
              className="inline-block px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              Contact Us Today
            </a>
          </div>
        </div>
        
        <div className="space-y-16">
          <WestsideAcademy />
          
          <EntrepreneurshipStoreSection />
          
          <ProgramCards />
          
          <CredentialsBadges />
        </div>
      </div>
    </section>;
};
export default ProgramsSection;
