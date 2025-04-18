
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, Target, LineChart, Users, TrendingUp } from 'lucide-react';
import { getEmployerMetrics } from '@/lib/supabase/analytics';
import { useAuth } from '@/contexts/AuthContext';

interface MetricItem {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}

const DetailedMetricsCard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<MetricItem[]>([
    {
      icon: BarChart2,
      title: "Application Pipeline",
      value: "Loading...",
      description: "Track your hiring funnel conversion rates"
    },
    {
      icon: Target,
      title: "Skill Match Score",
      value: "Loading...",
      description: "Top candidates automatically identified"
    },
    {
      icon: LineChart,
      title: "ROI Analytics",
      value: "Loading...",
      description: "Cost and time-to-hire tracking"
    },
    {
      icon: Users,
      title: "Candidate Demographics",
      value: "Loading...",
      description: "Monitor recruiting diversity metrics"
    },
    {
      icon: TrendingUp,
      title: "Industry Benchmarks",
      value: "Loading...",
      description: "Compare your performance metrics"
    }
  ]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const metricsData = await getEmployerMetrics(user.id);
          
          if (metricsData) {
            // Update metrics with real data
            setMetrics([
              {
                icon: BarChart2,
                title: "Application Pipeline",
                value: `${metricsData.total_applications} applied, ${metricsData.total_interviews} interviewed, ${metricsData.total_hires} hired`,
                description: "Track your hiring funnel conversion rates"
              },
              {
                icon: Target,
                title: "Skill Match Score",
                value: `${metricsData.average_skill_match.toFixed(0)}% average match rate`,
                description: "Top candidates automatically identified"
              },
              {
                icon: LineChart,
                title: "ROI Analytics",
                value: `$${metricsData.cost_per_hire.toFixed(1)}k per successful hire`,
                description: "Cost and time-to-hire tracking"
              },
              {
                icon: Users,
                title: "Candidate Demographics",
                value: `${metricsData.diversity_change_percent}% increase in diversity`,
                description: "Monitor recruiting diversity metrics"
              },
              {
                icon: TrendingUp,
                title: "Industry Benchmarks",
                value: `${metricsData.industry_benchmark_diff}% above industry average`,
                description: "Compare your performance metrics"
              }
            ]);
          }
        } catch (error) {
          console.error('Error fetching metrics:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMetrics();
  }, [user]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Detailed Analytics
          {isLoading && <span className="ml-2 text-sm text-muted-foreground">(Loading...)</span>}
        </CardTitle>
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
