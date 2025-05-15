
import React from 'react';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { Shield } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminPanel: React.FC = () => {
  const { isAdmin, isCeo } = useAdminStatus();
  
  // Redirect non-admin users
  if (!isAdmin && !isCeo) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-6">
          <Shield className={`h-6 w-6 mr-2 ${isCeo ? 'text-amber-500' : 'text-red-600'}`} />
          <h1 className="text-2xl font-bold">
            {isCeo ? 'Executive Administration Portal' : 'Admin Panel'}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Admin dashboard cards will go here */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">User Management</h2>
            <p className="text-gray-500">Manage users and permissions</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Content Moderation</h2>
            <p className="text-gray-500">Review and moderate site content</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Analytics</h2>
            <p className="text-gray-500">View site usage statistics</p>
          </div>
        </div>
        
        {/* Show special CEO section if user is CEO */}
        {isCeo && (
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-amber-100 p-6 rounded-lg shadow-md border border-amber-200">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 bg-clip-text text-transparent">
              Executive Controls
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to the executive portal. You have access to all system controls and premium features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <button className="p-4 bg-white rounded-md shadow hover:shadow-md transition-all">
                Financial Reports
              </button>
              <button className="p-4 bg-white rounded-md shadow hover:shadow-md transition-all">
                System Configuration
              </button>
              <button className="p-4 bg-white rounded-md shadow hover:shadow-md transition-all">
                User Privileges
              </button>
              <button className="p-4 bg-white rounded-md shadow hover:shadow-md transition-all">
                Executive Dashboard
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;
