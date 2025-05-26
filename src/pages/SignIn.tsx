
import Layout from '@/components/Layout';
import SampleCandidatePipeline from '@/components/auth/SampleCandidatePipeline';
import SignInPageHeader from '@/components/auth/SignInPageHeader';
import AuthTabsContainer from '@/components/auth/AuthTabsContainer';

const SignIn = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <SignInPageHeader />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Authentication Forms */}
            <div className="space-y-6">
              <AuthTabsContainer />
            </div>

            {/* Sample Candidate Pipeline */}
            <div>
              <SampleCandidatePipeline />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
