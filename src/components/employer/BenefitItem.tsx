
import { LucideIcon } from 'lucide-react';

interface BenefitItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BenefitItem = ({ icon: Icon, title, description }: BenefitItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
