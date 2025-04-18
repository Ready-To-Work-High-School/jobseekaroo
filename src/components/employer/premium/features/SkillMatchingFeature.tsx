
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Target, Sparkles } from 'lucide-react';

export const SkillMatchingFeature = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Target className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Skill Requirement Matching</h3>
          <p className="text-sm text-muted-foreground">Find qualified candidates faster</p>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Detailed skill matching algorithms
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Automated candidate scoring
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
