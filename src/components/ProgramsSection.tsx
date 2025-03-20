
import { useFadeIn } from '@/utils/animations';
import SectionHeading from './programs/SectionHeading';
import WestsideAcademy from './programs/WestsideAcademy';
import ProgramCards from './programs/ProgramCards';
import CredentialsBadges from './programs/CredentialsBadges';

const ProgramsSection = () => {
  const animation = useFadeIn(300);
  
  return (
    <section className={`py-16 bg-white ${animation}`}>
      <div className="container-custom bg-amber-500">
        <SectionHeading
          eyebrow="Career Readiness"
          title="Educational Programs"
          description="Discover specialized programs that help prepare high school students for their future careers"
        />
        
        <WestsideAcademy />
        
        <ProgramCards />
        
        <CredentialsBadges />
      </div>
    </section>
  );
};

export default ProgramsSection;
