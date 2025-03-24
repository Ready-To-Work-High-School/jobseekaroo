
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface CodeAnalyticsDashboardProps {
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
  usageOverTime?: {
    date: string;
    count: number;
  }[];
  generationOverTime?: {
    date: string;
    count: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#4f46e5', '#ec4899'];

const CodeAnalyticsDashboard: React.FC<CodeAnalyticsDashboardProps> = ({ 
  stats,
  usageOverTime = [],
  generationOverTime = []
}) => {
  // Create default data if none provided
  const defaultUsageData = usageOverTime.length === 0 ? [
    { date: '2023-10', count: 5 },
    { date: '2023-11', count: 8 },
    { date: '2023-12', count: 12 },
    { date: '2024-01', count: 15 },
    { date: '2024-02', count: 9 },
    { date: '2024-03', count: 18 }
  ] : usageOverTime;

  const defaultGenerationData = generationOverTime.length === 0 ? [
    { date: '2023-10', count: 10 },
    { date: '2023-11', count: 15 },
    { date: '2023-12', count: 20 },
    { date: '2024-01', count: 25 },
    { date: '2024-02', count: 18 },
    { date: '2024-03', count: 30 }
  ] : generationOverTime;

  // Create data for charts
  const { totalCodes, usedCodes, studentCodes, employerCodes, expiringThisMonth } = stats;
  
  const distributionData = [
    { name: 'Used', value: usedCodes, color: '#4f46e5' },
    { name: 'Unused', value: totalCodes - usedCodes, color: '#94a3b8' }
  ];
  
  const typeData = [
    { name: 'Student', value: studentCodes, color: '#6366f1' },
    { name: 'Employer', value: employerCodes, color: '#ec4899' }
  ];

  // Common chart config
  const chartConfig = {
    used: { color: '#4f46e5' },
    unused: { color: '#94a3b8' },
    student: { color: '#6366f1' },
    employer: { color: '#ec4899' },
    total: { color: '#0ea5e9' },
    expiring: { color: '#ef4444' },
  };

  // Custom tooltip formatter for percentage calculations
  const formatPieTooltipContent = (payload: any) => {
    if (payload && payload.length > 0) {
      const total = totalCodes;
      const item = payload[0];
      const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
      return (
        <div className="recharts-tooltip-wrapper">
          <div className="recharts-default-tooltip">
            <p className="recharts-tooltip-label">{item.name}</p>
            <p className="recharts-tooltip-item">
              {item.value} ({percent}%)
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Redemption Code Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Code Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={defaultUsageData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#4f46e5"
                    activeDot={{ r: 8 }}
                    name="Codes Used"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Generation Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Code Generation Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={defaultGenerationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#0ea5e9"
                    activeDot={{ r: 8 }}
                    name="Codes Generated"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Usage Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer className="h-full" config={chartConfig}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return formatPieTooltipContent(payload);
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Code Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer className="h-full" config={chartConfig}>
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return formatPieTooltipContent(payload);
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeAnalyticsDashboard;
