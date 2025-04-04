
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[50vh] flex flex-col justify-center items-center py-12">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">404</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">Page not found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go back home
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse jobs
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View resources
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
