
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { userTypes } from './redemption/UserTypeDefinitions';
import AutomatedCodeGeneratorDialog from './redemption/AutomatedCodeGeneratorDialog';

interface AutomatedCodeGeneratorProps {
  onGenerateCodes: (userType: string, amount: number, expiresInDays: number, emailDomain: string) => Promise<void>;
  isGenerating: boolean;
}

const AutomatedCodeGenerator: React.FC<AutomatedCodeGeneratorProps> = ({
  onGenerateCodes,
  isGenerating
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [userType, setUserType] = useState('student');
  const [amount, setAmount] = useState(10);
  const [expireDays, setExpireDays] = useState(90);
  const [emailDomain, setEmailDomain] = useState('students.westsidehigh.edu');

  const handleGenerateCodes = async () => {
    await onGenerateCodes(userType, amount, expireDays, emailDomain);
    setShowDialog(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-md border border-indigo-100">
        <h3 className="text-lg font-medium mb-3 text-indigo-700">Automated Code Distribution</h3>
        <p className="text-sm text-indigo-700/80 mb-4">
          Generate and automatically email redemption codes to specific user groups.
        </p>
        <Button 
          onClick={() => setShowDialog(true)}
          variant="default"
          className="bg-indigo-600 hover:bg-indigo-700 w-full"
        >
          Set Up Code Distribution
        </Button>
      </div>

      <AutomatedCodeGeneratorDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        userType={userType}
        setUserType={setUserType}
        amount={amount}
        setAmount={setAmount}
        expireDays={expireDays}
        setExpireDays={setExpireDays}
        emailDomain={emailDomain}
        setEmailDomain={setEmailDomain}
        onSubmit={handleGenerateCodes}
        isGenerating={isGenerating}
      />
    </>
  );
};

export default AutomatedCodeGenerator;
