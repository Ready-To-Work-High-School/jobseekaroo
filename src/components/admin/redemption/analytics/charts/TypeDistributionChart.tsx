
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TypeDistributionChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  totalCodes: number;
}

const TypeDistributionChart: React.FC<TypeDistributionChartProps> = ({ data, totalCodes }) => {
  // Custom tooltip formatter for percentage calculations
  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const item = payload[0];
      const total = totalCodes;
      const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-medium">{item.name}</p>
          <p>
            {item.value} ({percent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Type Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={renderCustomTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TypeDistributionChart;
