
import EmployerBenefits from './EmployerBenefits';
import StudentBenefits from './StudentBenefits';
import CredentialCard from './CredentialCard';
import SecureFrameworksCard from './SecureFrameworksCard';

const BenefitsTabContent = () => {
  return (
    <div className="space-y-8">
      <EmployerBenefits />
      <StudentBenefits />
      <CredentialCard />
      <SecureFrameworksCard />
    </div>
  );
};

export default BenefitsTabContent;
