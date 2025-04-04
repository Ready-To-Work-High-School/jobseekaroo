
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateUsagePredictions } from '../utils/predictionUtils';

interface PredictionChartProps {
  historicalData: {
    date: string;
    count: number;
  }[];
  title?: string;
  daysToPredict?: number;
}

const PredictionChart: React.FC<PredictionChartProps> = ({
  historicalData,
  title = 'Usage Prediction',
  daysToPredict = 7
}) => {
  // Generate predictions based on historical data
  const combinedData = generateUsagePredictions(historicalData, daysToPredict);
  
  // Find the index where predictions start
  const predictionStartIndex = historicalData.length;
  
  // Format dates for display
  const formattedData = combinedData.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value, index) => {
                  // Show fewer x-axis labels if we have many points
                  return index % Math.ceil(formattedData.length / 7) === 0 ? value : '';
                }}
              />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border border-border rounded-md shadow-md p-2">
                        <p className="font-medium">{`${data.formattedDate}`}</p>
                        <p className="text-sm">{`${data.count} code${data.count !== 1 ? 's' : ''} used`}</p>
                        {data.isPrediction && (
                          <p className="text-xs text-muted-foreground italic">Predicted</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              {predictionStartIndex > 0 && (
                <ReferenceLine
                  x={formattedData[predictionStartIndex - 1].formattedDate}
                  stroke="#ff4081"
                  strokeDasharray="3 3"
                  label={{ 
                    value: 'Forecast Start', 
                    position: 'top',
                    fill: '#ff4081',
                    fontSize: 12
                  }}
                />
              )}
              <Line
                name="Historical Usage"
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                isAnimationActive={true}
                animationDuration={1000}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (!payload.isPrediction) {
                    return (
                      <circle cx={cx} cy={cy} r={4} fill="#8884d8" />
                    );
                  }
                  return null;
                }}
              />
              <Line
                name="Predicted Usage"
                type="monotone"
                dataKey="count"
                stroke="#82ca9d"
                strokeDasharray="5 5"
                activeDot={{ r: 8 }}
                isAnimationActive={true}
                animationDuration={1000}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (payload.isPrediction) {
                    return (
                      <circle cx={cx} cy={cy} r={4} fill="#82ca9d" />
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionChart;
