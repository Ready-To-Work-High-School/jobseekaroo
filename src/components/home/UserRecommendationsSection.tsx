
import { useFadeIn } from '@/utils/animations';
import JobRecommendations from '@/components/JobRecommendations';
import { TriggerRecommendations } from '@/components/TriggerRecommendations';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Sparkles, UserCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const UserRecommendationsSection = () => {
  const fadeInFast = useFadeIn(200);
  const { user } = useAuth();

  return (
    <section className={`py-12 bg-gradient-to-b from-blue-50/60 to-white ${fadeInFast}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center">
            <span className="bg-amber-100 p-2 rounded-full">
              <Sparkles className="h-5 w-5 text-amber-600" />
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">Personalized Job Recommendations</h2>
          <p className="mt-1 text-gray-600 max-w-2xl mx-auto">
            {user ? "Based on your skills and preferences, we've curated these opportunities just for you." 
                  : "Sign in to get personalized job recommendations based on your skills and preferences."}
          </p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ErrorBoundary>
              <JobRecommendations limit={3} />
            </ErrorBoundary>
          </div>
          <div className="md:col-span-1">
            <ErrorBoundary>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <UserCircle className="h-6 w-6 text-blue-600" />
                  <h3 className="font-medium">Your Profile</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  View all your job recommendations and get more personalized matches by updating your profile.
                </p>
                <Button asChild className="w-full">
                  <Link to="/profile">
                    {user ? "View Full Recommendations" : "Sign In to Get Started"}
                  </Link>
                </Button>
                {user && (
                  <div className="mt-4">
                    <TriggerRecommendations />
                  </div>
                )}
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserRecommendationsSection;
