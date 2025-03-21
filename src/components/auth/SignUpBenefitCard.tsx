
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface BenefitItem {
  icon: LucideIcon;
  text: React.ReactNode;
}

interface SignUpBenefitCardProps {
  title: string;
  subtitle: string;
  titleIcon: LucideIcon;
  benefits: BenefitItem[];
  ctaText: string;
  ctaColor: "green" | "blue";
}

const SignUpBenefitCard = ({
  title,
  subtitle,
  titleIcon: TitleIcon,
  benefits,
  ctaText,
  ctaColor,
}: SignUpBenefitCardProps) => {
  const bgColorClass = ctaColor === "green" ? "bg-green-50" : "bg-blue-50";
  const borderColorClass = ctaColor === "green" ? "border-green-200" : "border-blue-200";
  const textColorClass = ctaColor === "green" ? "text-green-800" : "text-blue-800";

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        
        <div className="flex items-center gap-2 mb-4">
          <TitleIcon className="h-5 w-5 text-primary" />
          <span className="font-medium">{subtitle}</span>
        </div>
        
        <h3 className="font-medium mb-2">When you sign up, you'll get:</h3>
        
        <ul className="space-y-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <li key={index} className="flex items-start gap-2">
                <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{benefit.text}</span>
              </li>
            );
          })}
        </ul>
        
        <div className={`mt-6 ${bgColorClass} border ${borderColorClass} rounded-md p-3`}>
          <p className={`text-sm ${textColorClass}`}>
            <strong>{ctaText}</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpBenefitCard;
