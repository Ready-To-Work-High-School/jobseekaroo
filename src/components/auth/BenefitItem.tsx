
import React from "react";
import { LucideIcon } from "lucide-react";

interface BenefitItemProps {
  icon: LucideIcon;
  text: React.ReactNode;
}

const BenefitItem = ({ icon: Icon, text }: BenefitItemProps) => {
  return (
    <li className="flex items-start gap-2">
      <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
};

export default BenefitItem;
