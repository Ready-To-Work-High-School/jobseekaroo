
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
  Cell
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

// Define the colors for the chart
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#FFBB28'];

// Define the type for the applicant data
interface ApplicantStatus {
  name: string;
  value: number;
  color: string;
}

interface ApplicantStatusChartProps {
  data: ApplicantStatus[];
  title?: string;
}

export default function ApplicantStatusChart({ 
  data, 
  title = "Application Status Distribution" 
}: ApplicantStatusChartProps) {
  const isMobile = useIsMobile();
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-xs text-muted-foreground">{`${Math.round(payload[0].payload.percent * 100)}% of total`}</p>
        </div>
      );
    }
    return null;
  };

  // Calculate percentages for the pie chart
  const totalApplications = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percent: totalApplications ? item.value / totalApplications : 0
  }));

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Tabs defaultValue="pie" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pie" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercentage}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isMobile ? 80 : 100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {dataWithPercentage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend layout={isMobile ? "horizontal" : "vertical"} verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="bar" className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="chart-grid-line" />
              <XAxis dataKey="name" className="chart-axis-label" />
              <YAxis className="chart-axis-label" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Applicants">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
