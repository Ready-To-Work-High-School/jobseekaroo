
import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import ProgramCards from './programs/ProgramCards';
import CredentialsBadges from './programs/CredentialsBadges';

const ProgramsSection = () => {
  const animation = useFadeIn(300);
  
  return (
    <section className={`py-16 bg-secondary/5 ${animation}`}>
      <div className="container-custom">
        <SectionHeading
          eyebrow="Career Readiness"
          title="Educational Programs"
          description="Discover specialized programs that prepare high school students with verified skills employers value"
        />
        
        <div className="space-y-16">
          <WestsideAcademy />
          
          <ProgramCards />
          
          <CredentialsBadges />
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
