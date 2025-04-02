
import React from 'react';

interface RedemptionBenefitsListProps {
  type: string;
}

const RedemptionBenefitsList: React.FC<RedemptionBenefitsListProps> = ({ type }) => {
  // Benefits based on account type
  const getBenefits = () => {
    switch (type) {
      case 'student':
        return [
          'Access to premium job listings',
          'Resume builder tools',
          'Interview preparation resources',
          'Skill assessment tools'
        ];
      case 'employer':
        return [
          'Post unlimited job listings',
          'Advanced candidate search',
          'Analytics and reporting tools',
          'Featured company profile'
        ];
      case 'admin':
        return [
          'Full platform administration',
          'User management capabilities',
          'Content moderation tools',
          'Analytics and reporting access'
        ];
      default:
        return ['Premium account benefits'];
    }
  };

  return (
    <div className="rounded-md bg-muted p-4">
      <h4 className="font-medium mb-2">Your new benefits include:</h4>
      <ul className="list-disc list-inside space-y-1">
        {getBenefits().map((benefit, index) => (
          <li key={index} className="text-sm">{benefit}</li>
        ))}
      </ul>
    </div>
  );
};

export default RedemptionBenefitsList;
