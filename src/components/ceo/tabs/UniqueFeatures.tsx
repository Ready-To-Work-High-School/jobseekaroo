
import React from 'react';
import { BadgeCheck, Award, Brain } from 'lucide-react';
import CeoFeatureCard from '@/components/ceo/CeoFeatureCard';

const UniqueFeatures: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CeoFeatureCard
        icon={<BadgeCheck className="h-5 w-5 text-blue-600" />}
        title="Verified Students"
        description=""
      >
        <p>Every student is verified through official school channels and must complete mandatory compliance training before job access.</p>
      </CeoFeatureCard>
      <CeoFeatureCard
        icon={<Award className="h-5 w-5 text-purple-600" />}
        title="Academy Integration"
        description=""
      >
        <p>
          Seamless integration with Westside High School's Entrepreneurship and Nursing Academies, delivering certified and career-ready talent to employers.
        </p>
      </CeoFeatureCard>
      <CeoFeatureCard
        icon={<Brain className="h-5 w-5 text-emerald-600" />}
        title="Skill Verification"
        description=""
      >
        <p>
          Digital badges verify students' academic and industry achievements, ensuring transparency and quality for employers.
        </p>
      </CeoFeatureCard>
    </div>
  );
};

export default UniqueFeatures;
