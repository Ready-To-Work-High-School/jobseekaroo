
import EmployerBenefits from './EmployerBenefits';
import StudentBenefits from './StudentBenefits';
import CredentialCard from './CredentialCard';

const BenefitsTabContent = () => {
  return (
    <div className="space-y-8">
      <EmployerBenefits />
      <StudentBenefits />
      <CredentialCard />
    </div>
  );
};

export default BenefitsTabContent;
