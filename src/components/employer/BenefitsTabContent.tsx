
import EmployerBenefits from './EmployerBenefits';
import CredentialCard from './CredentialCard';
import SecureFrameworksCard from './SecureFrameworksCard';

const BenefitsTabContent = () => {
  return (
    <div className="space-y-8">
      <EmployerBenefits />
      <CredentialCard />
      <SecureFrameworksCard />
    </div>
  );
};

export default BenefitsTabContent;
