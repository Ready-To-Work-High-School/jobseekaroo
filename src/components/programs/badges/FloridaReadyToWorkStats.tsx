
import React from 'react';

const FloridaReadyToWorkStats = () => {
  const statistics = [
    { value: '699', label: 'Learners Enrolled' },
    { value: '259', label: 'Active Learners' },
    { value: '874', label: 'Hours Logged' },
    { value: '347', label: 'eBadges Earned' },
    { value: '63', label: 'Certificates Earned' },
    { value: '50', label: 'Credentials Earned' }
  ];

  return (
    <div className="mb-8 p-4 bg-white/70 rounded-lg shadow-sm border border-blue-200">
      <h3 className="text-xl font-bold mb-3 text-center text-blue-800">Florida Ready to Work</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {statistics.map((stat, index) => (
          <div key={index} className="text-center p-2 bg-blue-50 rounded-md">
            <p className="text-blue-800 font-bold text-2xl">{stat.value}</p>
            <p className="text-sm text-blue-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloridaReadyToWorkStats;
