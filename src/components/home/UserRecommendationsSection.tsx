
import { useFadeIn } from '@/utils/animations';
import JobRecommendations from '@/components/JobRecommendations';
import { TriggerRecommendations } from '@/components/TriggerRecommendations';

const UserRecommendationsSection = () => {
  const fadeInFast = useFadeIn(200);

  return (
    <section className={`py-12 bg-white ${fadeInFast}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <JobRecommendations limit={3} />
          </div>
          <div className="md:col-span-1">
            <TriggerRecommendations />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRecommendationsSection;
