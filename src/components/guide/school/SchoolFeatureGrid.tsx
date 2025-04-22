
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface FeatureGridProps {
  title: string;
  features: {
    title: string;
    description: string;
  }[];
}

export const SchoolFeatureGrid = ({ title, features }: FeatureGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 md:col-span-2">{title}</h2>
      {features.map((feature, index) => (
        <Card key={index} className="h-full">
          <CardContent className="space-y-4 p-6">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="font-semibold">{feature.title}</span>
            </p>
            <p className="text-muted-foreground ml-7">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

