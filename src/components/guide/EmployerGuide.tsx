
import EmployerQuickStart from "../employer/guide/EmployerQuickStart";
import EmployerFeatureCards from "../employer/guide/EmployerFeatureCards";
import EmployerAdditionalFeatures from "../employer/guide/EmployerAdditionalFeatures";
import EmployerFAQ from "../employer/guide/EmployerFAQ";

const EmployerGuide = () => {
  return (
    <div className="space-y-8">
      <EmployerQuickStart />
      <EmployerFeatureCards />
      <EmployerAdditionalFeatures />
      <EmployerFAQ />
    </div>
  );
};

export default EmployerGuide;
