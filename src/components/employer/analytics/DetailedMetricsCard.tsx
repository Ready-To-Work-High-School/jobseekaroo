
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Target, LineChart, Users, TrendingUp } from 'lucide-react';

interface MetricItem {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}

const DetailedMetricsCard = () => {
  const metrics: MetricItem[] = [
    {
      icon: BarChart2,
      title: "Application Pipeline",
      value: "10 applied, 3 interviewed, 2 hired",
      description: "Track your hiring funnel conversion rates"
    },
    {
      icon: Target,
      title: "Skill Match Score",
      value: "85% average match rate",
      description: "Top candidates automatically identified"
    },
    {
      icon: LineChart,
      title: "ROI Analytics",
      value: "$2.5k per successful hire",
      description: "Cost and time-to-hire tracking"
    },
    {
      icon: Users,
      title: "Candidate Demographics",
      value: "25% increase in diversity",
      description: "Monitor recruiting diversity metrics"
    },
    {
      icon: TrendingUp,
      title: "Industry Benchmarks",
      value: "15% above industry average",
      description: "Compare your performance metrics"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Detailed Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col p-4 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">{metric.title}</h3>
              </div>
              <p className="text-lg font-semibold mb-1">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedMetricsCard;
