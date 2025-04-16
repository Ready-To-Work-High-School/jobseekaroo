
import { CheckCircle } from "lucide-react";

const PlatformBenefits = () => {
  return (
    <ul className="space-y-4">
      <li className="flex items-start gap-2">
        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <strong>Exclusive job opportunities</strong>
          <p className="text-sm text-muted-foreground">Access student-friendly, verified positions</p>
        </div>
      </li>
      <li className="flex items-start gap-2">
        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <strong>Career resources & tools</strong>
          <p className="text-sm text-muted-foreground">Resume builder, interview prep, and more</p>
        </div>
      </li>
      <li className="flex items-start gap-2">
        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <strong>Skill development</strong>
          <p className="text-sm text-muted-foreground">Build job-ready skills with our resources</p>
        </div>
      </li>
      <li className="flex items-start gap-2">
        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
        <div>
          <strong>Safe, verified employers</strong>
          <p className="text-sm text-muted-foreground">All employers are vetted for student safety</p>
        </div>
      </li>
    </ul>
  );
};

export default PlatformBenefits;
