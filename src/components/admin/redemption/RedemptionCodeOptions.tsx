
import React from 'react';

interface RedemptionCodeOptionsProps {
  codeType: 'student' | 'employer';
  setCodeType: (type: 'student' | 'employer') => void;
  expireDays: number;
  setExpireDays: (days: number) => void;
}

const RedemptionCodeOptions: React.FC<RedemptionCodeOptionsProps> = ({
  codeType,
  setCodeType,
  expireDays,
  setExpireDays
}) => {
  return (
    <div className="hidden">
      {/* This component is used to store the state that's shared between generation components */}
      {/* It doesn't render anything visible */}
    </div>
  );
};

export default RedemptionCodeOptions;
