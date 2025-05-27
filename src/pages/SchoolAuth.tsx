
import Layout from '@/components/Layout';
import SchoolAuthCard from '@/components/auth/SchoolAuthCard';
import { Helmet } from 'react-helmet-async';

const SchoolAuth = () => {
  return (
    <Layout>
      <Helmet>
        <title>School Portal - Sign In</title>
        <meta name="description" content="Access your school account to connect with job opportunities and career resources" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 py-8">
        <div className="container max-w-lg mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Your School Portal</h1>
            <p className="text-gray-600">
              Connect with career opportunities and build your professional future
            </p>
          </div>
          
          <SchoolAuthCard />
          
          <div className="mt-8 text-center">
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-blue-500 font-semibold text-sm">Safe</div>
                <div className="text-xs text-gray-500">School-verified accounts</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-green-500 font-semibold text-sm">Secure</div>
                <div className="text-xs text-gray-500">Protected information</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-purple-500 font-semibold text-sm">Supported</div>
                <div className="text-xs text-gray-500">School guidance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchoolAuth;
