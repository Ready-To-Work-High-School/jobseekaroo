
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
  const { user } = useAuth();

  // Function to get the redirect path based on auth status
  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };

  return <section className={`py-16 bg-secondary/5 ${animation}`}>
      <div className="container-custom">
        {/* For Employers Only heading placed outside the blue section */}
        <h2 className={cn("text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-center")}>
          <span className="bg-gradient-to-r from-zinc-800 via-amber-700 to-zinc-900 bg-clip-text text-transparent">
            <em>For Employers Only</em>
          </span>
        </h2>
        
        {/* Employers Section */}
        <div className="border border-amber-300 rounded-lg p-6 mb-12 bg-brand-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-center font-bold text-zinc-900">
                Learn how students in the Entrepreneurship Academy receive intensive specialized curriculum that prepares them with verified skills and credentials employers value
              </p>
            </div>
            <img src="/lovable-uploads/262213b1-e3e3-45bb-b551-e52e343ed995.png" alt="Career & Technical Education Logo" className="h-12 md:h-22 w-auto object-scale-down" />
          </div>
          
          {/* Replacing the alert with an image-based burst */}
          <div className="mt-4 relative">
            <div className="relative">
              <img 
                src="/lovable-uploads/868d46bf-1273-4a3b-831c-d14f7a7b5af9.png" 
                alt="Burst background" 
                className="w-full max-w-3xl mx-auto h-auto"
              />
              <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                <div>
                  <h3 className="text-white font-extrabold text-xl mb-1">Hiring Opportunity</h3>
                  <p className="text-white font-medium">
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
