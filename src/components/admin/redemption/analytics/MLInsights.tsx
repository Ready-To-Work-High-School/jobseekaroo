
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, TrendingUpIcon, TrendingDownIcon, CalendarIcon } from 'lucide-react';
import { RedemptionCode } from '@/types/redemption';
import { analyzeRedemptionPatterns } from './utils/predictionUtils';

interface MLInsightsProps {
  codes: RedemptionCode[];
}

const MLInsights: React.FC<MLInsightsProps> = ({ codes }) => {
  const analysis = analyzeRedemptionPatterns(codes);
  
  // Determine trend direction for redemption rate
  const redemptionTrend = analysis.redemptionRate > 50 ? 'positive' : 'neutral';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <InfoIcon className="h-5 w-5" />
          ML-Powered Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {analysis.insights.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Redemption Rate</div>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold">{analysis.redemptionRate.toFixed(1)}%</div>
                  {redemptionTrend === 'positive' ? (
                    <TrendingUpIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDownIcon className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Projected Monthly Usage</div>
                <div className="text-2xl font-bold">{analysis.projectedMonthlyUsage} codes</div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Peak Usage Days</div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-blue-500" />
                  <div className="text-md font-medium">
                    {analysis.peakUsageDays.length > 0 
                      ? analysis.peakUsageDays.join(', ') 
                      : 'No clear pattern'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Key Insights</h3>
              <div className="space-y-2">
                {analysis.insights.map((insight, index) => (
                  <Alert key={index}>
                    <AlertTitle className="text-sm font-medium">Insight {index + 1}</AlertTitle>
                    <AlertDescription>{insight}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <InfoIcon className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-center">
              Not enough historical data to generate meaningful insights.
              <br />
              Continue using the system to collect more data.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MLInsights;
