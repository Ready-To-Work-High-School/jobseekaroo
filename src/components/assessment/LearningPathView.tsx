
import React from 'react';
import { getUserSkills } from '@/lib/supabase/skills';

const LearningPathView = () => {
  const handleGetSkills = async () => {
    try {
      // Get skills without parameter
      const skills = await getUserSkills();
      console.log('User skills:', skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Learning Path View</h2>
      <button onClick={handleGetSkills} className="bg-blue-500 text-white px-4 py-2 rounded">
        Load Skills
      </button>
    </div>
  );
};

export default LearningPathView;
