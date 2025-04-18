
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BarChart2, Sparkles } from 'lucide-react';

export const DetailedMetricsFeature = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <BarChart2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Detailed Analytics</h3>
          <p className="text-sm text-muted-foreground">Track your hiring success</p>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Application funnel metrics
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            ROI tracking and benchmarking
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Demographic insights
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
