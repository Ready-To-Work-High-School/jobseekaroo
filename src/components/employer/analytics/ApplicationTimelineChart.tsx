
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card } from '@/components/ui/card';

// Define the interface for the timeline data
interface TimelineData {
  month: string;
  applications: number;
  interviews: number;
  offers: number;
}

interface ApplicationTimelineChartProps {
  data: TimelineData[];
  title?: string;
}

export default function ApplicationTimelineChart({ 
  data, 
  title = "Applications Over Time" 
}: ApplicationTimelineChartProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="chart-grid-line" />
            <XAxis dataKey="month" className="chart-axis-label" />
            <YAxis className="chart-axis-label" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                padding: '8px' 
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="applications" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              strokeWidth={2} 
              name="Applications" 
            />
            <Line 
              type="monotone" 
              dataKey="interviews" 
              stroke="#82ca9d" 
              strokeWidth={2} 
              name="Interviews" 
            />
            <Line 
              type="monotone" 
              dataKey="offers" 
              stroke="#ffc658" 
              strokeWidth={2} 
              name="Offers" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
