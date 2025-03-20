
import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import ProgramCards from './programs/ProgramCards';
import CredentialsBadges from './programs/CredentialsBadges';
import { Separator } from './ui/separator';

const ProgramsSection = () => {
  const animation = useFadeIn(300);
  return (
    <>
      <Separator className="max-w-4xl mx-auto my-8" />
      <section className={`py-16 bg-secondary/5 ${animation}`}>
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <SectionHeading 
              eyebrow="Career Readiness" 
              title="For Employers" 
              description="Learn how students in the Entrepreneurship Academy receive intensive specialized curriculum that prepares them with verified skills and credentials employers value" 
            />
            <img src="/lovable-uploads/262213b1-e3e3-45bb-b551-e52e343ed995.png" alt="Career & Technical Education Logo" className="h-24 md:h-32 w-auto object-scale-down" />
          </div>
          
          <div className="space-y-16">
            <WestsideAcademy />
            
            <ProgramCards />
            
            <CredentialsBadges />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgramsSection;
