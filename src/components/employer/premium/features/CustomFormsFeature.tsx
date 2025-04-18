
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FormInput, Sparkles } from 'lucide-react';

export const CustomFormsFeature = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <FormInput className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Custom Application Forms</h3>
          <p className="text-sm text-muted-foreground">Tailored to your hiring needs</p>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Customizable application fields
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Role-specific questionnaires
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
