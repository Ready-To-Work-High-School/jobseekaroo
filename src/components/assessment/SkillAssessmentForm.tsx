
import React, { useState } from 'react';
import { createUserSkill } from '@/lib/supabase/skills';

interface SkillAssessmentFormProps {
  onComplete?: () => void;
}

const SkillAssessmentForm = ({ onComplete }: SkillAssessmentFormProps) => {
  const [skillName, setSkillName] = useState('');

  const handleCreateSkill = async () => {
    try {
      await createUserSkill('user-id', { name: skillName, level: 'beginner' });
      console.log('Skill created successfully');
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Skill Assessment Form</h2>
      <input
        type="text"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
        placeholder="Enter skill name"
        className="border rounded px-3 py-2 mr-2"
      />
      <button onClick={handleCreateSkill} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Skill
      </button>
    </div>
  );
};

export default SkillAssessmentForm;
