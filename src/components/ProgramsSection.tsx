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
const ProgramsSection = () => {
  const animation = useFadeIn(300);
  const {
    user
  } = useAuth();

  // Function to get the redirect path based on auth status
  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };
  return <section className={`py-16 bg-secondary/5 ${animation}`}>
      <div className="container-custom">
        {/* For Employers Only heading placed outside the blue section */}
        <h2 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-center")}>
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 px-6 py-3 font-bold text-blue-800 text-center text-3xl w-full md:text-5xl">
            For Employers Only
          </span>
        </h2>
        
        {/* Employers Section - Removed border and background */}
        <div className="mb-12">
          {/* Adding glowing accent to the burst image */}
          <div className="mt-4 relative">
            <div className="relative rounded-full overflow-hidden glow-primary">
              <img src="/lovable-uploads/868d46bf-1273-4a3b-831c-d14f7a7b5af9.png" alt="Burst background" className="w-full max-w-3xl mx-auto h-auto" />
              <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                <div className="max-w-xs">
                  <h3 className="font-extrabold text-xl md:text-2xl mb-1 text-zinc-800">Hiring Opportunity</h3>
                  <p className="font-medium text-zinc-800 text-sm md:text-base">
                    <a href="mailto:ColemanP3@duvalschools.org" className="hover:underline">
                      Connect with our academy to find pre-trained students with industry-recognized credentials ready for your workforce.
                    </a>
                  </p>
                </div>
              </div>
            </div>
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