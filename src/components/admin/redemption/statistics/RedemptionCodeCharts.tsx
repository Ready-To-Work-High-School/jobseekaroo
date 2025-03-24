
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface RedemptionCodeChartsProps {
  stats: {
    totalCodes: number;
    usedCodes: number;
    studentCodes: number;
    employerCodes: number;
    expiringThisMonth: number;
  };
}

const RedemptionCodeCharts: React.FC<RedemptionCodeChartsProps> = ({ stats }) => {
  const { totalCodes, usedCodes, studentCodes, employerCodes, expiringThisMonth } = stats;
  
  // Create data for the bar chart
  const barData = [
    { name: 'Total', value: totalCodes, fill: '#3b82f6' },
    { name: 'Used', value: usedCodes, fill: '#4f46e5' },
    { name: 'Students', value: studentCodes, fill: '#6366f1' },
    { name: 'Employers', value: employerCodes, fill: '#ec4899' },
    { name: 'Expiring', value: expiringThisMonth, fill: '#ef4444' }
  ];
  
  // Create data for the pie charts
  const usageData = [
    { name: 'Used', value: usedCodes, fill: '#4f46e5' },
    { name: 'Unused', value: totalCodes - usedCodes, fill: '#94a3b8' }
  ];
  
  const typeData = [
    { name: 'Student', value: studentCodes, fill: '#6366f1' },
    { name: 'Employer', value: employerCodes, fill: '#ec4899' }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Config for the charts
  const chartConfig = {
    used: { color: '#4f46e5', label: 'Used' },
    unused: { color: '#94a3b8', label: 'Unused' },
    student: { color: '#6366f1', label: 'Student' },
    employer: { color: '#ec4899', label: 'Employer' },
    expiring: { color: '#ef4444', label: 'Expiring' },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Code Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border rounded-md shadow-md p-2">
                          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="#8884d8">
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-4 h-full">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Usage Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-36">
              <ChartContainer 
                className="h-full"
                config={chartConfig}
              >
                <PieChart>
                  <Pie
                    data={usageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {usageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => active && payload && payload.length > 0 ? (
                      <ChartTooltipContent payload={payload} />
                    ) : null}
                  />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Code Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-36">
              <ChartContainer 
                className="h-full"
                config={chartConfig}
              >
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => active && payload && payload.length > 0 ? (
                      <ChartTooltipContent payload={payload} />
                    ) : null}
                  />
                  <Legend />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RedemptionCodeCharts;
