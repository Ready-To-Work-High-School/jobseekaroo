
import React from 'react';
import { Link } from 'react-router-dom';

const SupportFooter: React.FC = () => {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <p className="text-xs text-gray-500 text-center">
        For assistance, please contact support at <a href="mailto:support@jobseeker4hs.org" className="text-blue-600 hover:underline">support@jobseeker4hs.org</a> or visit our <Link to="/support" className="text-blue-600 hover:underline">Support Center</Link>
      </p>
    </div>
  );
};

export default SupportFooter;
